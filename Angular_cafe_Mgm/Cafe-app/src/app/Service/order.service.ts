import { Injectable } from '@angular/core';
import { Orders } from '../Models/orders.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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


}
