import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from './models/product.models';
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

  getProductsByFilter(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.apiRootUri + '?$filter=brand%20eq%20%27Encore%20Software%27');
  }
}
