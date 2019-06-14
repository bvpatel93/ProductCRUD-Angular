import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import {ProductService} from './product.service';
import { Product} from '../Shared/Product.model'
import { config } from '../Common/config';

@Injectable({
    providedIn: 'root'
})

export class productapiservice {
// Define API
//config: config

//apiURL = 'https://local-poc.najm.sa/api/v1';
apiURL = 'https://demo.poc.com/api';
constructor(private http: HttpClient) { }
// Http Options
httpOptions = {
headers: new HttpHeaders({
'Content-Type': 'application/json'
})
}

createProduct(Product): Observable<Product> {    
    return this.http.post<Product>(this.apiURL + '/Product', JSON.stringify(Product),this.httpOptions)
    .pipe(
        retry(1),
        catchError(this.handleError)
        )
    }  

    
    // HttpClient API put() method => Update product
updateProduct(id, Product): Observable<Product> {
   
    return this.http.put<Product>(this.apiURL + '/Product/' + id, JSON.stringify(Product), this.httpOptions)
    .pipe(
    retry(1),
    catchError(this.handleError)
    )
    }

// HttpClient API get() method => Fetch product list
getProducts(): Observable<Product[]> {
   
    return this.http.get<Product[]>(this.apiURL + '/Product')
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
    }

    updateProductQty(): Observable<any> {
   
        return this.http.post<any>(this.apiURL + '/Values',this.httpOptions)
        .pipe(
        retry(1),
        catchError(this.handleError)
        );
        }

    // HttpClient API get() method => Fetch product list
getProduct(id): Observable<Product> {
    return this.http.get<Product>(this.apiURL + '/Product/'+id)
    .pipe(
    retry(1),
    catchError(this.handleError)
    );
    }

    delteProduct(id): Observable<any> {
        return  this.http.delete<any>(this.apiURL + '/Product/' + id, this.httpOptions).pipe(
            retry(1),
            catchError(this.handleError)
            );
        }
   

    // Error handling 
handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
    } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
    }
    
}