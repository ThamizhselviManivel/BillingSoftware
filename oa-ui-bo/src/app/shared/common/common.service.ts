import { Injectable } from '@angular/core';
import { Http, BaseRequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Rx'
import { Response, Headers, RequestOptions } from '@angular/http';

import { environment } from '../../../environments/environment';
import { ContentType } from '@angular/http/src/enums';

@Injectable()
export class CommonService {

  cachedCodesData: any;
  cachedSubstations: any;
  cachedDistrict:any;
  cachedFeeders: any;
  cachedEdcs: any;
  cachedMenuItems: any;
  cachedFuels: any;
  cachedDeleteReasons: any;

  constructor(private http: Http) {
    //this.http._defaultOptions.headers.set('Authorization', 'token');


  }

  displayMonth(month: string) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return months[parseInt(month) - 1];
  }

  fetchYearList(){
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');  
    var currentYear : number = +(utc.substr(0,4));  
    var yearList = [];

    
   // let currentYear: number = new Date().getFullYear();
for(let i = 2018; i < 2040; i++) {
  yearList.push(i);
}
    // yearList.push('2019');
    // yearList.push(currentYear-3);
    // yearList.push(currentYear-2);
    // yearList.push(currentYear-1);
    // yearList.push(currentYear);
    // yearList.push(currentYear+1);
    return yearList;
  }

  fetchMonths() {
    return [
      { "value": "01", "name": "January" },
      { "value": "02", "name": "February" },
      { "value": "03", "name": "March" },
      { "value": "04", "name": "April" },
      { "value": "05", "name": "May" },
      { "value": "06", "name": "June" },
      { "value": "07", "name": "July" },
      { "value": "08", "name": "August" },
      { "value": "09", "name": "September" },
      { "value": "10", "name": "October" },
      { "value": "11", "name": "November" },
      { "value": "12", "name": "December" }
    ];
  }
  // Fetch States 
  fetchStates() {
    return this.http.get(environment.assetsApiUrl + '/assets/data/states.json')
      .map(res => res.json());

  }


  // Fetch Currencies 
  fetchCountries() {
    return this.http.get(environment.assetsApiUrl + '/assets/data/countries.json')
      .map(res => res.json());

  }

  // Fetch Currencies 
  fetchCurrencies() {
    return this.http.get(environment.assetsApiUrl + '/assets/data/currencies.json')
      .map(res => res.json());

  }

  // Fetch Menu Items 
  fetchMenuItems() {


    if (this.cachedMenuItems) {
      return Observable.of(this.cachedMenuItems);
    } else {
      return this.http.get(environment.assetsApiUrl + "/assets/data/menu-items.json")
        .map(res => res.json())
        .do((data) => {
          this.cachedMenuItems = data;
        });
    }
    // return this.http.get(environment.assetsApiUrl+'/assets/data/menu-items.json')
    //         .map(res => res.json());    

  }

  

  //Fetch common codes

  fetchCodes(listCode?: string) {
    // if (listCode) {
    //   if (this.cachedCodesData) {
    //     return Observable.of(this.cachedCodesData.json().filter(function (value) { return value.listCode == listCode; }));
    //   } else {
        return this.http.get(environment.assetsApiUrl + '/assets/data/codes.json').map(res => res.json().filter(function (value) { return value.listCode == listCode; }));
    //   }
    // }
    // else {
    //   if (this.cachedCodesData) {
    //     return Observable.of(this.cachedCodesData);
    //   } else {
    //     return this.http.get(environment.assetsApiUrl + "/assets/data/codes.json")
    //       .map(res => res.json())
    //       .do((data) => {
    //         this.cachedCodesData = data;
    //       });
    //   }
    // }
  }
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  numberOnly(event): boolean {
    let value = event.target.value;
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'v' || event.key === 'a'|| event.key === 'x')) {
      return;
    }
     let current: string = value;
      const position = event.target.selectionStart;
      const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
      if (next && !String(next).match(this.regex)) {
       event.preventDefault();
      }
   
  }
 

}


/**
 * Extending BaseRequestOptions to inject common headers to all requests.
 */
export class CustomRequestOptions extends BaseRequestOptions {
  constructor() {
    super();
    var token = sessionStorage.getItem('token');
    this.headers.append('Authorization', token);
    this.headers.append('Content-Type', 'application/json');
  }
  setParams(params?: any) {
    this.params = params;
  }
  setBody(body?: any) {
    this.body = body;
  }
  setHeaders(obj?: any) {
    obj.forEach(x => {
      Object.keys(x).forEach(key => {
        this.headers.append(key, x[key]);
      });
    });
  }
 
}
