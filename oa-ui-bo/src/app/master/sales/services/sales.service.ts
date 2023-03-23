import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Signup } from '../../vo/signup';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx'
import { environment } from '../../../../environments/environment';
import {CustomRequestOptions} from '../../../shared/common/common.service';
// import { Options } from 'selenium-webdriver';


@Injectable()
export class SalesService {
    cachedBuyerServices: any;

    constructor(private http: Http) {
       
    }

    saveCustomerDetail(customer:any){
       return this.http.post(environment.serviceApiUrl+'/productsales/cusdetail',customer,new CustomRequestOptions()).map(res => res.json());
    }

    saveSalesProduct(data:any){
   return this.http.post(environment.serviceApiUrl+'/productsales/saleproduct',data,new CustomRequestOptions()).map(res => res.json());
    }

    getCustomerByName(customerName,mobileNo){
        return this.http.get(environment.serviceApiUrl+'/productsales/customerdetail/'+customerName+'/'+mobileNo,new CustomRequestOptions()).map(res => res.json());
    }

}
