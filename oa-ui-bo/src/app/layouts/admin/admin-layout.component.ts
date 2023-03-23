import { Company } from './../../master/vo/company';
import { Component, OnInit, OnDestroy, ViewChild, HostListener, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Menu } from '../../shared/menu-items/menu-items';
import { Subscription } from 'rxjs/Subscription';
import { CommonUtils } from '../../shared/common/common-utils'
import 'rxjs/Rx';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AuthenticationService } from '../authentication.service';

import * as Ps from 'perfect-scrollbar';
import { CommonService } from '../../shared/common/common.service';
import { id } from '@swimlane/ngx-datatable/release/utils';

@Component({
  selector: 'app-layout',
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
    private _router: Subscription;
    menuItems: Menu[] = [];
    today: number = Date.now();
    url: string;
    showSettings = false;
    dark: boolean;
    boxed: boolean;
    collapseSidebar: boolean;
    compactSidebar: boolean;
    currentLang = 'en';
    root = 'ltr';
    userDetail: string;
    userTypeName: string;
    currentDate: any;
    profileToggle: boolean = false;
   id:string="1";
   company:Company;
   rows:any;
   bus:any;

    @ViewChild('sidemenu') sidemenu;

    constructor(private router: Router, public commonService: CommonService, public dialog: MatDialog, public authService: AuthenticationService) {
    }
    ngOnDestroy(): void {
    }

    ngOnInit(): void {
        const elemSidebar = < HTMLElement > document.querySelector('.sidebar-panel .mat-sidenav-focus-trap .cdk-focus-trap-content');
        const elemContent = < HTMLElement > document.querySelector('.mat-sidenav-content');

        this.getMenus();
        this.companyName();

        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            this.url = event['url'];
        });

    }

    companyName(){
        
        this.authService.getName().subscribe(x=>{
            this.rows=x;
            const name=this.rows.map(t=>t.businessname)
            this.bus=name;
            console.log(name);
            
        })
    }

    logout(){
        this.router.navigateByUrl('/login');
    }
    editName(){
        this.router.navigateByUrl('/company')
    }

    isOver(): boolean {
        if (this.url === '/apps/messages' || this.url === '/apps/calendar' || this.url === '/apps/media' || this.url === '/maps/leaflet') {
            return true;
        } else {
            return window.matchMedia(`(max-width: 960px)`).matches;
        }
    }

    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }

    menuMouseOver(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
            this.sidemenu.mode = 'over';
        }
    }

    menuMouseOut(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
            this.sidemenu.mode = 'side';
        }
    }

    
    

    getMenus() {
        let tempUserAccess: Array < String > = ["SIGNUP", "METER-READING-IMPORT", "METER-READING", "GENERATOR-STATEMENT", "ENERGY-SALE", "ENERGY-LEDGER", "DEFAULT", "GENERATOR-WISE-CONSUMER-REPORT"];
        let tempPPPAccess: Array < String > = ["SELLER-SETUP", "GRID-CONNECTIVITY-APPLICATION", "ENERGY-SALE-INTENT", "NOC", "CONSENT", "EWA", "OAA", "IPAA", "NOC-GENERATOR", "STANDING-CLEARENCE"];
        let authUser = JSON.parse(sessionStorage.getItem('user'));

        this.commonService.fetchMenuItems().subscribe(
            result => {

                this.menuItems = result;
            },
            error => {
                console.error('Error loading menu items!');
                console.error(error);
            }
        );
    }
    

}

@Component({
  selector: 'session-dialog-handler',
  template: `
	<div mat-dialog-content>
		Session About to expire<br>Click Extend to Continue OR Logout
	</div>
	<div mat-dialog-actions>
		<button type="button" color="primary" mat-raised-button (click)="sessOK()">Extend Session</button>
		<button type="button" color="amber" mat-raised-button (click)="sessClose()">Logout</button>
	</div>
 `,
})
export class SessionDialogHandlerComponent {

	constructor(public dialogRef: MatDialogRef<SessionDialogHandlerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

	sessClose(): void {	
		this.dialogRef.close(false);
	}

	sessOK(): void {	
		this.dialogRef.close(true);
	}
}
