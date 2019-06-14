import { Injectable } from '@angular/core';
import { Product} from '../Shared/Product.model'
import { PRODUCTS} from '../Shared/productdata';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(PRODUCTS);
  }

  updateProduct (id, product): Observable<any> {  
    product.date=new Date()  ;
    product.id=id ;
     PRODUCTS[id-1] = product;
     return of(PRODUCTS);
  }
}
