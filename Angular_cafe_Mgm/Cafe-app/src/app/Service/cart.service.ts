import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Cart } from '../model/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'https://localhost:44344/api/Carts';  // Replace with your actual API URL
  id:number;

  constructor(private http: HttpClient) {
    this.id = JSON.parse(localStorage.getItem('id'));
  }


  getCartItems(userId: number): Observable<any[]> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
        map(cartItems => cartItems.filter(item => item.UserId === userId))
    );
  }

  

  addToCart(cartData: { ProductId: number; Quantity: number; UserId: number }): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, cartData);
  }

  // Update an existing cart
  updateCart(cartId: number, quantity: number,productId : number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const payload = {
      CartId: cartId,
      ProductId: productId,
      UserId: this.id,
      Quantity: quantity
  };
    return this.http.put(`${this.apiUrl}/${cartId}`, payload, { headers });
  }

  // Delete a cart
  deleteCart(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
