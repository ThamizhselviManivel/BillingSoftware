import { ProductAddComponent } from './components/product-add/product-add.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'; 
import { ProductListComponent } from './components/product-list/product-list.component';
import { routes } from './product.routing';
//import { ConsentEvent } from './services/consent.event';
import { ProductService } from './services/product.service';
import { CommonService } from '../../shared/common/common.service';
import { HttpClientModule } from '@angular/common/http';
//import { CustomDirective } from '../../shared/services/custom.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule,
    NgxDatatableModule,
    FormsModule,ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule
    
  ],
  declarations: [
      ProductListComponent,
      ProductAddComponent
  ],
  providers: [CommonService,ProductService] 

})

export class ProductModule {
  public static routes = routes;
}
