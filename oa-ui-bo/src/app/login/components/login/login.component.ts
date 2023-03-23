import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {  LoginService } from './../../services/login.service';
import * as CryptoJS from 'crypto-js'; 
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  message: string;
  logging:boolean = false;
  browserObject: String =  navigator.userAgent;
	isChrome:boolean= false;
  constructor(private router: Router, private route: ActivatedRoute, private service: LoginService) {
  
  }

  ngOnInit() {
    // this.isChrome = (this.browserObject.search('Chrome') >0 ) 
    // // console.log("this.isChrome-"+this.isChrome );
    
    // if(!this.isChrome){
    //     alert("Please use Google Chrome browser!!!");
    // }
    this.route.queryParams.subscribe(params => {
        if(params['reason']) this.message = params['reason'];
      });
  }


  login() {
          this.openDash();     
      }
  

  openDash() {
    //this.router.navigate ( [ '/dashboard' ] );
     this.router.navigateByUrl('/home');
  }
}
