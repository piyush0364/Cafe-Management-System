import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,catchError } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CartItem {
  ProductId : number,
  CartId : number,
  ProductName: string;
  Price: number;
  ImageUrl: string;
  Quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly apiUrl = `${environment.apiBaseUrl}/Carts`;
  id: number;

  constructor(private http: HttpClient) {
    const raw = localStorage.getItem('id');
    this.id = raw ? Number(raw) : 0;
  }


  

  getCartItems(userId: number): Observable<CartItem[]> {
    const apiUrl = `${environment.apiBaseUrl}/cartitem/${userId}`;
    return this.http.get<CartItem[]>(apiUrl).pipe(
      catchError(this.handleError<CartItem[]>('getCartItems', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return new Observable<T>((observer) => {
        observer.next(result as T);
        observer.complete();
      });
    };
  }


  

  addToCart(cartData: { ProductId: number; Quantity: number; UserId: number }): Observable<unknown> {
    return this.http.post(this.apiUrl, cartData);
  }

  updateCart(cartId: number, quantity: number, productId: number): Observable<unknown> {
    const payload = {
      CartId: cartId,
      ProductId: productId,
      UserId: this.id,
      Quantity: quantity
    };
    return this.http.put(`${this.apiUrl}/${cartId}`, payload);
  }

  deleteCart(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }



  


}
