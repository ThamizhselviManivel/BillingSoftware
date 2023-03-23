import { Routes } from '@angular/router';
import { CompanyComponent } from './components/company/company.component';

export const routes: Routes = [
{ path: '', 
  children: [
    
	  { path: 'company', component: CompanyComponent,  pathMatch: 'full' },
    { path: '**', redirectTo: 'company' }
  ]
}
];