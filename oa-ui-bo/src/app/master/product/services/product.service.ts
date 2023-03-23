import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Signup } from '../../vo/signup';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx'
import { environment } from '../../../../environments/environment';
import {CustomRequestOptions} from '../../../shared/common/common.service';
// import { Options } from 'selenium-webdriver';


@Injectable()
export class ProductService {
    cachedBuyerServices: any;

    constructor(private http: Http) {
       
    }

     getAllProduct(){
        return this.http.get(environment.serviceApiUrl+'/product/all',new CustomRequestOptions()).map(res => res.json()); 
     }

     saveProduct(products){
      return this.http.post(environment.serviceApiUrl+'/product/addproduct',products,new CustomRequestOptions()).map(res => res.json());
     }

     deleteProduct(prodid){
      return this.http.delete(environment.serviceApiUrl+'/product/deleteproduct/'+prodid,new CustomRequestOptions());
     }

}
