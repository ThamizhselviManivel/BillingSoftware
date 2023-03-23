import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Signup } from './../../vo/signup';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx'
import { environment } from '../../../../environments/environment';
import {CustomRequestOptions} from '../../../shared/common/common.service';
// import { Options } from 'selenium-webdriver';


@Injectable()
export class SignupService {
    cachedBuyerServices: any;

    constructor(private http: Http) {
       
    }

}
