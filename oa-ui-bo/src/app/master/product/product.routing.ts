import { Routes } from '@angular/router';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
{ path: '', 
  children: [
    
	  { path: 'product-list', component: ProductListComponent,  pathMatch: 'full' },
    { path: 'product-add', component: ProductAddComponent,  pathMatch: 'full' },
    { path: '**', redirectTo: 'product-list' }
  ]
}
];