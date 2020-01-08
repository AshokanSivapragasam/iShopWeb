import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/product.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiRootUri: string = 'https://localhost:44362/api/products';
  constructor(private httpClient: HttpClient) { }
  
  getAllProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.apiRootUri + '?$top=50&$orderby=title desc');
  }

  getProductsByFilter(filterCondition: string): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.apiRootUri + filterCondition);
  }

  getProductById(productId: string): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(this.apiRootUri + '/' + productId);
  }
}
