import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Product} from '../Shared/Product.model'
import { getLocaleDateFormat } from '@angular/common';
import { MatDialog,MatDialogRef, MatDialogConfig,MatDialogModule } from '@angular/material';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
//import {ProductService} from './product.service';
import {productapiservice} from './product-api.service';
import { Observable, Subscription } from 'rxjs';
import { RowClassArgs, RowArgs } from '@progress/kendo-angular-grid';
import { retry } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { timer } from 'rxjs/observable/timer';
import { ConfirmationboxComponent } from '../shared/confirmationbox/confirmationbox.component';
import 'rxjs/Rx';
import { IsServerSync} from '../Shared/enum'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  productlist : any[];
  private subscription: Subscription; 
  private timerSubscription: AnonymousSubscription;
  private postsSubscription: AnonymousSubscription;

 constructor(public dialog: MatDialog,private productservice:productapiservice,private toastr: ToastrService) { }

  ngOnInit() {    
   if(IsServerSync.serversync==1){
    this.refreshData();}
    else
    {  this.getProductlist();
    }
  
  }

  private subscribeToData(): void {
  
    //  let timer$ = timer(2000,1000);

      this.timerSubscription = Observable.timer(10000)
        .subscribe(() => this.refreshData());
    }

    private refreshData(): void {
      this.UpdateSyncProducts();        
      this.getProductlist();
     this.subscribeToData();
    }

    public UpdateSyncProducts()
    {
      this.productservice.updateProductQty()
      .subscribe();
    }

  showSuccess(message,title) {
    this.toastr.success(message,title);
  }
  public rowCallback(context: RowClassArgs) {  
    let data = context.dataItem;   
    if(data.disabled)
    {
      return 'disable' 
    }
    else if(data.quantity >= 25)
    {
      return 'green' 
    }
    else if(data.quantity > 10 && data.quantity < 25)
    {
      return 'blue' 
    }
    else if(data.quantity <= 10 && data.quantity > 0)
    {
      return 'red' 
    }
    else if(data.quantity <= 0 )
    {
      return 'grey' 
    }
}

deleteProduct(id): void {
  const dialogRef = this.dialog.open(ConfirmationboxComponent, {
    width: '350px',
    data: "Do you confirm the deletion of this data?"
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      console.log('Yes clicked');
      this.productservice.delteProduct(id).subscribe();      
      
    }
    this.getProductlist();  
  });
 
}



  private editProduct(id) {  
    const dialogConfig = new MatDialogConfig();    
    dialogConfig.data = {id:id};
    dialogConfig.width="50%";
   var dia= this.dialog.open(EditProductComponent, dialogConfig); 
    //this.closePopup("Product updated successfully!","success");
    dia.afterClosed().subscribe(result => {      
        this.showSuccess('Product update successfully!','success');   
        this.getProductlist();        
    });
    
  }
  private AddProduct()
  {
    const dialogConfig = new MatDialogConfig();        
    dialogConfig.width="50%";
    var dia= this.dialog.open(AddProductComponent, dialogConfig);
    //this.closePopup(,);
   // this.showSuccess('Product added successfully!','success');
   dia.afterClosed().subscribe(result => {      
    this.showSuccess('Product added successfully!','success');   
    this.getProductlist();        
});
    }

   private closePopup(message,titile)
    {
      this.dialog.afterAllClosed
      .subscribe(() => {
      this.getProductlist(); 
      })      
    }

    private getProductlist(): void{   
    this.productservice.getProducts()
    .subscribe(productlist=>this.productlist=productlist);
  }
  
}
