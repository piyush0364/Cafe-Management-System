import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Orders } from '../Models/orders.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
=======
import { Observable } from 'rxjs';
import { Orders } from '../Models/orders.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
>>>>>>> 479b0e4ffb23e19f64110193d493555b30a9fd70

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = "https://localhost:44344/api/Orders";
  constructor(private http:HttpClient) { }
  getOrders(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.apiUrl);
  }

<<<<<<< HEAD
  oData: Orders = new Orders();
  readonly ApiUrl='https://localhost:44344/api/Orders';

  oList:Orders[];

  constructor(private objHttp:HttpClient) {}

  
  getOrdersList()
  {
    this.objHttp.get(this.ApiUrl).toPromise()
    .then(res=>this.oList=res as Orders[]);
  }

  updateOrder()
  {
    return this.objHttp.put(this.ApiUrl+"/"+this.oData.OrderDetailsId,this.oData);
  }

  deleteOrder(id)
  {
    return this.objHttp.delete(this.ApiUrl + '/'+id);
  }


=======
  // Update order status
  // updateOrderStatus(id: number, status: string): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   return this.http.put(`${this.apiUrl}/${id}`, { status }, { headers });
  // }
  updateOrderStatus(order:Orders): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/${order.OrderDetailsId}`,order, { headers });
  }
>>>>>>> 479b0e4ffb23e19f64110193d493555b30a9fd70
}
