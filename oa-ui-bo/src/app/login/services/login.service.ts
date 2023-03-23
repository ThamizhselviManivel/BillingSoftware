import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import { LocalStorageService } from 'angular-2-local-storage';
import { Observable } from 'rxjs/Rx'

import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {
  baseUrl: string = environment.authApiUrl;
  clientId: string = environment.clientId;

  constructor(private http: Http) { }

}
