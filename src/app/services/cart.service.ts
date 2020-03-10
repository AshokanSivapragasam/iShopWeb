import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartModel } from '../models/cart.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiRootUri: string = 'https://localhost:44362/api/carts';
  constructor(private httpClient: HttpClient) { }
  
  getAllCarts(): Observable<CartModel[]> {
    return this.httpClient.get<CartModel[]>(this.apiRootUri + '?$top=5&$orderby=id desc');
  }

  getCartsByFilter(filterCondition: string): Observable<CartModel[]> {
    return this.httpClient.get<CartModel[]>(this.apiRootUri + filterCondition);
  }

  getCartById(cartId: string): Observable<CartModel> {
    return this.httpClient.get<CartModel>(this.apiRootUri + '/' + cartId);
  }
}
