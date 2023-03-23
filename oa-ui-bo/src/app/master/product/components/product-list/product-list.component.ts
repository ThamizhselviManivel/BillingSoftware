import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from '../../../../shared/common/common.service';
import { CommonUtils } from '../../../../shared/common/common-utils';
import { Signup } from '../../../vo/signup';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {

rows:any=[];
base64Data: any;
dbImage='';
data:any=[];
postResponse: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private httpClient: HttpClient,
    private service: ProductService
  ) {
  }

  ngOnInit() {
    this.getProduct();
  }

  getProduct(){
    this.service.getAllProduct().subscribe(x=>{
         this.rows=x;
         console.log(this.rows);
         
         for(let i=0;i<this.rows.length;i++){
     
          if(this.rows[i].imageModel!=''){
          this.httpClient.get(environment.serviceApiUrl+'/product/get/' + this.rows[i].imageModel[0].name)
          .subscribe(
            res => {
              this.postResponse = res;
              this.base64Data = this.postResponse.picByte;
              this.dbImage = 'data:image/jpeg;base64,' + this.base64Data  
              this.rows[i].imageModel= this.dbImage;                             
            }
          );

         }
         else{
          this.rows[i].imageModel="No image found"
         }
        }
         
    })
  }
  addProduct(){
    console.log("productadd");
    this.router.navigateByUrl('/product/product-add');
  }

  viewImage() {
    this.httpClient.get(environment.serviceApiUrl+'/product/get/' + this)
      .subscribe(
        res => {
          this.postResponse = res;
          this.base64Data = this.postResponse.picByte;
          this.dbImage = 'data:image/jpeg;base64,' + this.base64Data  
                  
        }
      );
  }

  delProdid(prodid){
    this.service.deleteProduct(prodid).subscribe(x=>{
      alert("Succefully Deleted")
    })
  }

}
