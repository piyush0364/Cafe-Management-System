import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { CategoryService } from '../../Service/category.service';
import { ProductService } from '../../Service/product.service';
import { OrderService } from '../../Service/order.service';
import { UserService } from '../../Service/user.service';
import { FeedbackService } from '../../Service/feedback.service';
import { OrderitemService } from '../../Service/orderitem.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  cl = 1;
  pl = 1;
  ol = 1;
  ul = 1;
  fl = 1;
  tp = 0; // Total price
  oList: any;
  pList: any;
  pi = 0; // Pending orders
  ci = 0; // Completed orders
  
  constructor(
    private c: CategoryService,
    private p: ProductService,
    private o: OrderService,
    private u: UserService,
    private f: FeedbackService,
    private oo: OrderitemService
  ) {
    this.onLoad();
  }
  
  onLoad() {
    forkJoin({
      categories: this.c.getcategoryList1(),
      products: this.p.getProducts(),
      orders: this.o.getOrders(),
      orderItems: this.oo.getOrderItems(),
      users: this.u.getUserList1(),
      feedback: this.f.getFeedback()
    }).subscribe({
      next: ({ categories, products, orders, orderItems, users, feedback }) => {
        this.cl = categories.length;
        this.pl = products.length;
        this.pList = products;

        this.ol = orders.length;

        const productMap = orderItems.reduce((acc, item) => {
          acc[item.ProductId] = item.Price;
          return acc;
        }, {} as { [key: number]: number });

        this.tp = orderItems.reduce((total, item) => {
          const productPrice = productMap[item.ProductId] || 0;
          return total + productPrice * item.Quantity;
        }, 0);

        this.pi = orders.filter((order: any) => order.Status === 'pending').length;
        this.ci = orders.length - this.pi;

        this.ul = users.length;
        this.fl = feedback.length;
      },
      error: (err) => {
        // Ideally show a toast here; keeping console output for now.
        console.error('Dashboard load failed', err);
      }
    });
  }
  
  toggle = false;
  toggleSidebar() {
    this.toggle = !this.toggle;
  }
  
}
