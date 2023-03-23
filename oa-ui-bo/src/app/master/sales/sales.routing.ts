import { Routes } from '@angular/router';
import { SalesListComponent } from './components/sales-list/sales-list.component';



export const routes: Routes = [
{ path: '', 
  children: [
    
	  { path: 'sales-list', component: SalesListComponent,  pathMatch: 'full' },
    { path: '**', redirectTo: 'sales-list' }
  ]
}
];