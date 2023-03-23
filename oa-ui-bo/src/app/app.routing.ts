import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
export const AppRoutes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	}, {
		path: '',
		component: AdminLayoutComponent,
		children: [{
			path: 'home',
			loadChildren: './dashboard/dashboard.module#DashboardModule',
		},
		{
			path: 'signup',
			loadChildren: './master/signup/signup.module#SignupModule'
		},
		{
			path: 'product',
			loadChildren: './master/product/product.module#ProductModule'
		},
		{
			path: 'company',
			loadChildren: './master/company/company.module#CompanyModule'
		},
		{
			path: 'sales',
			loadChildren: './master/sales/sales.module#SalesModule'
		}

		]
	}, {
		path: '',
		component: AuthLayoutComponent,
		children: [{
			path: 'login',
			loadChildren: './login/login.module#LoginModule'
		}]
	}, {
		path: '**',
		redirectTo: 'session/404'
	}
];

