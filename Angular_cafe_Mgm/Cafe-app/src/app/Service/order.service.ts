import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Orders } from '../Models/orders.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiUrl = `${environment.apiBaseUrl}/Orders`;
  constructor(private http:HttpClient) { }
  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.apiUrl);
  }

  updateOrderStatus(order:Orders): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${order.OrderId}`,order, { headers });
  }

  //purchase history
  getOrderHistory(): Observable<any> {
    // Retrieve UserId from localStorage
    const UserId = localStorage.getItem('id');
    if (!UserId) {
      return throwError(() => new Error('UserId not found in local storage'));
    }
    return this.http.get(`${this.apiUrl}/history/${UserId}`);
  }
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getOrderByNo(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


}
