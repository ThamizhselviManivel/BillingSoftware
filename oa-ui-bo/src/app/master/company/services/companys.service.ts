import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Signup } from '../../vo/signup';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx'
import { environment } from '../../../../environments/environment';
import {CustomRequestOptions} from '../../../shared/common/common.service';
// import { Options } from 'selenium-webdriver';


@Injectable()
export class CompanyService {
    cachedBuyerServices: any;

    constructor(private http: Http) {
       
    }
    
    getName(){
      return this.http.get(environment.serviceApiUrl+'/company/all',new CustomRequestOptions()).map(res => res.json()); 
  }
  getbyId(id:string){
   return this.http.get(environment.serviceApiUrl+'/company/'+id,new CustomRequestOptions()).map(res => res.json());
  }
  savedata(id:string,company){
   return this.http.post(environment.serviceApiUrl+'/company/update/'+id,company,new CustomRequestOptions()).map(res => res.json());
  }

}
