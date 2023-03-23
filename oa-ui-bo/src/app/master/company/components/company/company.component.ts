import { id } from '@swimlane/ngx-datatable/release/utils';

import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from '../../../../shared/common/common.service';
import { CommonUtils } from '../../../../shared/common/common-utils';
import { Signup } from '../../../vo/signup';
import { CompanyService } from '../../services/companys.service';
import { Company } from '../../../vo/company';


@Component({
  selector: 'app-comapany',
  templateUrl: './company.component.html',
  //styleUrls: ['./signup-list.component.scss'],
  providers: [CompanyService]
})
export class CompanyComponent implements OnInit {

rows:any=[];
rowss:any=[];
company:Company;
id:string="1";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,

    private service: CompanyService
  ) {
  }

  ngOnInit() {
  this.getDetail();
  this.getId();
  }
 
  getDetail(){
    this.service.getName().subscribe(x=>{
  this.rows=x;
  const data=this.rows[0];
  this.company=data;
  console.log(this.company);
  
    })
  }

  getId(){
  this.service.getbyId(this.id).subscribe(x=>{
    this.rowss=x;
    console.log(this.rowss);
    
  })
  }

  save(businessname:string,businessdesc:string,email:string,phnumber:string,gstno:string,address:string,businesstype:string,businesscategory:string){
    console.log(this.id,businessname,businessdesc,email,phnumber,gstno,address,businesstype,businesscategory);
  
          this.company.id=this.id,
         this.company.businessname= businessname,
         this.company.businessdesc =businessdesc,
          this.company.email= email,
          this.company.phnumber= phnumber,
          this.company.gstno= gstno,
          this.company.address= address,
          this.company.businesstype= businesstype,
         this.company.businesscategory= businesscategory
  
  this.service.savedata(this.id,this.company).subscribe(
      res => {
          console.log(res);      
              alert("Company detail updated sucessfully")
      }
  )

  }
}
