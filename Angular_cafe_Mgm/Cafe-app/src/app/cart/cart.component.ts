import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface CartItem {
  ProductName: string;
  Price: number;
  ImageUrl: string;
  Quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  id : number; // Replace with actual logged-in user ID

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('id'));
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.getCartItems(this.id).subscribe(
      (items) => {
        this.cartItems = items;
        console.log(this.cartItems);
      },
      (error) => {
        console.error('Error loading cart items', error);
      }
    );
  }

  getCartItems(userId: number): Observable<CartItem[]> {
    const apiUrl = `https://localhost:44344/api/cartitem/${userId}`;
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
}
