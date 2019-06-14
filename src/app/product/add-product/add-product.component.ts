import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {productapiservice} from '../product-api.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { Product } from 'src/app/Shared/Product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private router: Router, private productapiService: productapiservice, private formBuilder: FormBuilder,private dialog: MatDialog) { }
  
  submitted=false;
  productForm:FormGroup;
  product_EnglishName:string='';
  product_ArabicName:string='';
  product_description:string='';
  product_quantity:number;
  product_disable:boolean;
  productdata:Product
  
  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'product_EnglishName': [null, Validators.required],
      'product_ArabicName':  [null, Validators.required],
      'product_description':  [null, Validators.required],
      'product_quantity': [null, Validators.required],
      'product_disable':[false]
    });
    //this.openDialog();
  }

  get productFormControl(){
    return this.productForm.controls;
  }
  onSubmit() {   
    this.submitted = true;
    // stop here if form is invalid
    if (this.productForm.invalid) {
        return;
    }
    
    this.productdata={
      productEnglishName:this.productForm.value['product_EnglishName'],
      productArabicName:this.productForm.value['product_ArabicName'],
      description:this.productForm.value['product_description'],
      quantity:this.productForm.value['product_quantity'],
      disabled:this.productForm.value['product_disable'], 
      createdDate:new Date(),
      productId:1
    };    
    this.productapiService.createProduct(this.productdata).subscribe(res => {           
      console.log('Product added'); 
      this.dialog.closeAll();
      this.router.navigate(['/products']);
    }, (err) => {
      console.log(err);     
    });
    
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(AddProductComponent);
  }

}
