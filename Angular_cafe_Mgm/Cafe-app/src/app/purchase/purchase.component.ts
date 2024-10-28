import { Component } from '@angular/core';
import { OrderService } from '../Service/order.service';
import { Orders } from '../Models/orders.model';
import { ProductService } from '../Service/product.service';
import { OrderitemService } from '../Service/orderitem.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {
  orders: Orders[];
  productNames: { [key: string]: string } = {};

  constructor(private orderService : OrderService,private productService:ProductService,private ot : OrderitemService,private route : Router){}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {

    this.orderService.getOrderHistory().subscribe(orders => {
      console.log(orders);
      this.orders = orders;
    });
  }

  getOrderbyNo(orderId: number): void {
   
    this.route.navigate(['/orderitem', orderId]);
  }


  }
