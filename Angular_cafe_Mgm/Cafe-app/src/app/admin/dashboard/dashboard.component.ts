import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { CategoriesService } from '../../Service/categories.service';
import { ProductService } from '../../Service/product.service';
import { OrderService } from '../../Service/order.service';
import { UserService } from '../../Service/user.service';
import { FeedbackService } from '../../Service/feedback.service';

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
  tp = 0;
  oList : any;
  pList : any;

  constructor(private c : CategoriesService, private p : ProductService, private o : OrderService,private u : UserService,private f : FeedbackService){
       this.onLoad();
  }


  onLoad(){



    this.c.getcategoryList1().subscribe((res)=>(
      this.cl = res.length
    ),(err)=>
    console.log(err));

   
    this.p.getProducts().subscribe(
      (res1) => {
        this.pl = res1.length;
        this.pList = res1;
    
        this.o.getOrders().subscribe(
          (res2) => {
            this.ol = res2.length;
            this.oList = res2;
    
            const productMap = res1.reduce((acc, product) => {
              acc[product.ProductId] = product.Price;
              return acc;
            }, {} as { [key: number]: number });
    
            // Calculate total price
            this.tp = res2.reduce((total, order) => {
              const productPrice = productMap[order.ProductId] || 0;
              return total  + productPrice * order.Quantity;
            }, 0);
          },
          (err) => console.log(err) // Error handling for getOrders
        );
      },
      (err) => console.log(err) // Error handling for getProducts
    );
    

 
    
    this.u.getUserList1().subscribe((res)=>(
      this.ul = res.length
    ),(err)=>
    console.log(err));

    this.f.getFeedback().subscribe((res)=>(
      this.fl = res.length
    ),(err)=>
    console.log(err));


  
  }
    

 


 

  toggle = false;
  toggleSidebar() {
    this.toggle = !this.toggle;
  }

}
