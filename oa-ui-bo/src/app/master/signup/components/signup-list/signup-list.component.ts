import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from './../../../../shared/common/common.service';
import { CommonUtils } from '../../../../shared/common/common-utils';


import { SignupService } from './../../services/signup.service';
import { Signup } from './../../../vo/signup';

@Component({
  selector: 'app-signup-list',
  templateUrl: './signup-list.component.html',
  //styleUrls: ['./signup-list.component.scss'],
  providers: [SignupService]
})
export class SignupListComponent implements OnInit {
  signup: Signup;

  rows: Array<Signup>;
  tempResults: Array<Signup>;
  edcList = [];
  filteredEDCs = [];

  /*
  columns = [
              { prop: 'ssId', name: 'Ss Id'  },
              { prop: 'ssName', name: 'Ss Name' }
            ];
*/
  count = 0;
  offset = 0;
  limit = 55;
  filterNCES = [];
  searchCompanyName: string = "";
  searchOrgid: string = "";
  searchHtscNumber: string;
  searchHtscNumberOld: string;
  disableEdc: boolean = false;

  searchIsCaptive: string;
  searchIsComplete: string;
  searchMeterNumber: string;
  completeList = [
    { "key": "Y", "name": "Y" },
    { "key": "N", "name": "N" }
  ]
  isCaptives = [
    { "key": "Y", "name": "Y" },
    { "key": "N", "name": "N" }
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,

    private service: SignupService
  ) {


  }

  ngOnInit() {
    
 
  }

  


}
