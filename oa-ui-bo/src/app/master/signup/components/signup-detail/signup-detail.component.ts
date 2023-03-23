import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';

import { Component, OnInit, HostBinding } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormControl } from '@angular/forms';
import { CommonService } from '../../../../shared/common/common.service';
import { CommonUtils } from '../../../../shared/common/common-utils';
//import { DatePickerModule } from 'angular-material-datepicker';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { TradeRelationship } from './../../../vo/trade-relationship';
import { Org } from './../../../../master/vo/org';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";


import { SignupService } from './../../services/signup.service';
import { Signup } from './../../../vo/signup';

export class AppDateAdapter extends NativeDateAdapter {
  parse(value: any): Date | null {
    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');
      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);
      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  format(date: Date, displayFormat: Object): string {
    if (displayFormat == "input") {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
    } else {
      return date.toDateString();
    }
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

export const APP_DATE_FORMATS =
  {
    parse: {
      dateInput: { month: 'short', year: 'numeric', day: 'numeric' }
    },
    display: {
      // dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
      dateInput: 'input',
      monthYearLabel: { month: 'short', year: 'numeric', day: 'numeric' },
      dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
      monthYearA11yLabel: { year: 'numeric', month: 'long' },
    }
  }


@Component({
  selector: 'signup-detail',
  templateUrl: './signup-detail.component.html',
  //styleUrls: [],
  providers: [ MatDatepickerModule, MatNativeDateModule, DatePipe, CommonUtils,
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})

export class SignupDetailComponent {

  signup: Signup;
  addScreen: boolean = true;

  // orgId = [];
  substationList = [];
  feederList = [];
  checkTradeRelationship: boolean = false;

  maxDate: Date = new Date();
  tradeRelationship: TradeRelationship = new TradeRelationship(); //TradeRelationship

  //this.signup.signupTradeRelationships: Array<TradeRelationship>= []; //TradeRelationship 
  accessUpdateFlag:boolean = false;
	accessDeleteFlag:boolean = false;
	accessCompleteFlag:boolean = false;

  
  tradeRelationshipRowIndex: number;
  genUnitRowIndex: number;

  ValidateQuantum: number;
  compCtrl: FormControl;
  buyerCompanyCode: String;
  buyerCompanyName: String;
  reactiveComp: any;
  disableControls: boolean = false;
  edc: Org;
  Purposes = [];
  mrtUserLogin: boolean = false;
  intervalTypeCodeFlag: boolean = true;
  tradeRelationshipFlag: boolean = false;
  intervalTypeCodes = []
  accuracyclass = [
    { "key": "0.2", "name": "0.2" },
    { "key": "0.5", "name": "0.5" }
  ]

  isCaptives = [
    { "key": "Y", "name": "IS-CAPTIVE" },
    { "key": "N", "name": "SELL-TO-BOARD" }
  ]

  surplusEnergys = [
    { "key": "BANKING", "name": "BANKING" },
    { "key": "SALETOBOARD", "name": "SELL-TO-BOARD" }
  ]
  acceleratedDepreciations = [
    { "key": "Y", "name": "YES" },
    { "key": "N", "name": "NO" }
  ]

  isABTMeter = [
    { "key": "Y", "name": "Y" },
    { "key": "N", "name": "N" }
  ]

  isDLMSMeter = [
    { "key": "Y", "name": "Y" },
    { "key": "N", "name": "N" }
  ]

  isRECs = [
    { "key": "Y", "name": "Y" },
    { "key": "N", "name": "N" }
  ];

  orgList = [];
  org = [];
  Voltages = [];
  State = [];
  District = [];
  Taluk = [];
  TalukList = [];
  edcPassTypes = [];
  generatorModelTypes = [];
  meterMake = [];
  fuelPlantTypes = [];
  powerPlantTypes = [];
  powerPlantClassTypes = [];
  // filteredEDCs = [];
  filteredSubstations = [];
  filterFeeder = [];
  substation = [];
  buyerTypes = ['Mere Parallel', 'Sale to Board', 'Captive Use', 'Third Party'];
  buyerCompanyServices = [];
  filteredServices = [];
  filteredEdcList = [];
  constructor(
    private commonUtils: CommonUtils,
    private route: ActivatedRoute,
    private router: Router,
    private service: SignupService,
    //private companyService: CompanyService,
    //private consentEvent: ConsentEvent
    private commonService: CommonService,
    private datePipe: DatePipe
    // public registrationDate:Date
  ) {


  }

  ngOnInit() {
  

  }


  // filterEDCs(val: string) {

  //  return val ? this.orgId.filter((s) => s.name.match(new RegExp(val, 'gi'))) : this.orgId;
  // }

}