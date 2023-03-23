import { Products } from './../../../vo/product';
import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonService } from '../../../../shared/common/common.service';
import { CommonUtils } from '../../../../shared/common/common-utils';
import { Signup } from '../../../vo/signup';
import { ProductService } from '../../services/product.service';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'product-add',
  templateUrl: './product-add.component.html',
  //styleUrls: ['./signup-list.component.scss'],
  providers: [ProductService]
})
export class ProductAddComponent implements OnInit {

 products: Products;
rows:any;
uploadedImage: File;
dbImage='';
postResponse: any;
successResponse: string;
image: any;
base64Data: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private httpClient: HttpClient,
    private service: ProductService
  ) {
  }

  ngOnInit() {
    this.products=new Products();
  }
  public onImageUpload(event) {
    this.uploadedImage = event.target.files[0];
  }


  imageUploadAction() {
    const imageFormData = new FormData();
    imageFormData.append('imageFile', this.uploadedImage, this.uploadedImage.name);
    this.viewImage();

    this.httpClient.post(environment.serviceApiUrl+'/product/upload', imageFormData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          alert("Image uploaded sucessfully")
          this.postResponse = response;
          this.successResponse = this.postResponse.body.message;

        } else {
          alert("Image not uploaded due to some error!")
          this.successResponse = 'Image not uploaded due to some error!';
        }
      }
      );

    // else{
    //   alert("image already exists");
    // }
    }

    viewImage() {
      this.httpClient.get(environment.serviceApiUrl+'/product/get/' + this.uploadedImage.name)
        .subscribe(
          res => {
            this.postResponse = res;
            this.base64Data = this.postResponse.picByte;
            this.dbImage = 'data:image/jpeg;base64,' + this.base64Data

          }
        );
    }
  // getProduct(){
  //   this.service.getAllProduct().subscribe(x=>{
  //        this.rows=x;
  //        console.log(this.rows);

  //   })
  // }
  save(){
    this.service.saveProduct(this.products).subscribe(x=>{
      alert("Product detail updated sucessfully")
      setTimeout(() => {
        this.ngOnInit();
       }, 1000);
      })
  }

}
