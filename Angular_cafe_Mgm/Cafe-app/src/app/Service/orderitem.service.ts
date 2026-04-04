import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderitemService {
  readonly apiUrl = `${environment.apiBaseUrl}/OrderItems`;

  constructor(private http : HttpClient) { }

  getOrderItems(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getOrderItemsbyNo(OrderId:any): Observable<any> {
    // return this.http.get<any>(this.apiUrl);
    return this.http.get(`${this.apiUrl}/orderdetail/${OrderId}`);
  }
  
}
