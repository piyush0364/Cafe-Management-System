import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'https://localhost:44344/api/Carts';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Get all carts
  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }

  // Get a cart by id
  getCart(id: number): Observable<Cart> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cart>(url);
  }

  // Add a new cart
  addCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, cart);
  }

  // Update an existing cart
  updateCart(id: number, cart: Cart): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, cart);
  }

  // Delete a cart
  deleteCart(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
