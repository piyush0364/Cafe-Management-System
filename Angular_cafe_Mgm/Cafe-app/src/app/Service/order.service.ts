import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../Models/orders.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = "https://localhost:44344/api/Orders";
  constructor(private http:HttpClient) { }
  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.apiUrl);
  }

  // Update order status
  // updateOrderStatus(id: number, status: string): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.put(`${this.apiUrl}/${id}`, { status }, { headers });
  // }
  updateOrderStatus(order:Orders): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${order.OrderDetailsId}`,order, { headers });
  }
}
