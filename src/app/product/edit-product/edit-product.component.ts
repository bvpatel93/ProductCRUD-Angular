  import { Component, OnInit,Inject  } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA,MatDialog} from '@angular/material';
import { Product} from '../../Shared/Product.model'
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';
//import {ProductService} from '../product.service';
import {productapiservice} from '../product-api.service';
import { Router } from '@angular/router';
import { ProductComponent } from '../product.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  
  // productlist:Product[]=[
  //   new Product(1,'Lux','lux','Soap',25,true,new Date()),
  //   new Product(2,'Nirma','nirma','Soap-2',26,true,new Date())
  // ];
  id:number;
  productdata:Product
 constructor(@Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<ProductComponent>,private productService:productapiservice,private router: Router, private formBuilder: FormBuilder,private dialog: MatDialog) { 
   this.id=data.id
 }
  submitted=false;
  productForm:FormGroup;
  product_EnglishName:string='';
  product_ArabicName:string='';
  product_description:string='';
  product_quantity:number;
  product_disable:boolean;

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'product_EnglishName': [null, Validators.required],
      'product_ArabicName':  [null, Validators.required],
      'product_description':  [null, Validators.required],
      'product_quantity': [null, Validators.required],
      'product_disable':[null]
    });
    this.getProduct(this.id);
    
  }
  
  getProduct(id) {
    this.productService.getProduct(id)
    .subscribe(data=> {
      this.productForm.setValue({
        product_EnglishName: data.productEnglishName,
        product_ArabicName: data.productArabicName,
        product_description: data.description,
        product_quantity: data.quantity,
        product_disable: data.disabled,       
      });
    })
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
      productId:this.id,
      createdDate:new Date()
    };  
    this.productService.updateProduct(this.id,this.productdata).subscribe(res => {           
      console.log('Product Updated'); 
      this.dialog.closeAll();
      this.router.navigate(['/products']);
    }, (err) => {
      console.log(err);     
    });
    
    //this.router.navigate(['/']);
}

}
