import { Customer } from './../../../vo/customer';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from '../../../../shared/common/common.service';
import { CommonUtils } from '../../../../shared/common/common-utils';
import { Signup } from '../../../vo/signup';
import { SalesService } from '../../services/sales.service';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DateAdapter } from '@angular/material';
import { DatePipe } from '@angular/common';
import Quagga from 'quagga';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss'],
  providers: [SalesService,DatePipe]
})
export class SalesListComponent implements OnInit {

  dynamicArray = [];
  customer: Customer;
  data = [];
  details:string;
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private router: Router,private datepipe: DatePipe,
    private commonService: CommonService,
    private service: SalesService
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.dynamicArray.push({ productName: '', unit: '', price: '',gst:'',tax:'' });
    this.customer=new Customer();


      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#barcode-scanner')    // Your HTML video element ID
        },
        decoder : {
          readers : ["ean_reader"]
        }
      }, (err) => {
          if (err) {
              console.log(err);
              return
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
      });

      Quagga.onDetected((result) => {
          console.log(result.codeResult.code);
          // Do something with the scanned barcode
      });
    }


  addRow() {
    this.dynamicArray.push({ productName: '', unit: '', price: '',gst:'',tax:'' });
  }

  deleteRow(index) {
    this.dynamicArray.splice(index, 1);
  }


  saveAll(){
    if (this.customer.salesDate) {
      this.customer.salesDate = this.datepipe.transform(this.customer.salesDate, 'dd/MM/yyyy');
    }
    this.service.saveCustomerDetail(this.customer).subscribe(x=>{
      console.log("customer details added successfully");

    })
   this.data=[];

  if (this.dynamicArray[this.dynamicArray.length - 1].productName && this.dynamicArray[this.dynamicArray.length - 1].tax) {

      for (let i = 0; i < this.dynamicArray.length; i++) {
        this.data.push({
          productName:this.dynamicArray[i].productName, unit:this.dynamicArray[i].unit, price:this.dynamicArray[i].price, gst:this.dynamicArray[i].gst,
          tax:this.dynamicArray[i].tax, customerName: this.customer.customerName, salesDate: this.customer.salesDate
        });
      }
      console.log(this.data);
      this.service.saveSalesProduct(this.data).subscribe(
        result => {
          console.log(result)
          const currentRoute = this.router.url;

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentRoute]);  //  refresh the current page
          });
           this.addRow();
        });

    } else {
      alert("Table cannot be saved with empty row data ");
    }

  }

getCustomer(){
  this.service.getCustomerByName(this.customer.customerName,this.customer.mobileNo).subscribe(x=>{
        this.details=x;
        console.log(this.details);

  }
    )
}

}
