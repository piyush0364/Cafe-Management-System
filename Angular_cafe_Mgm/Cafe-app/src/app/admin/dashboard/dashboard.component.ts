import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { CategoriesService } from '../../Service/categories.service';
import { ProductService } from '../../Service/product.service';
import { OrderService } from '../../Service/order.service';
import { UserService } from '../../Service/user.service';

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

  constructor(private c : CategoriesService, private p : ProductService, private o : OrderService,private u : UserService){
       this.onLoad();
  }


  onLoad(){


    this.c.getcategoryList1().subscribe((res)=>(
      this.cl = res.length
    ),(err)=>
    console.log(err));

    this.p.getProducts().subscribe((res)=>(
      this.pl = res.length
    ),(err)=>
    console.log(err));


    this.o.getOrders().subscribe((res)=>(
      this.ol = res.length
    ),(err)=>
    console.log(err));
    
    this.u.getUserList1().subscribe((res)=>(
      this.ul = res.length
    ),(err)=>
    console.log(err));
    



    


  }

  toggle = false;
  toggleSidebar() {
    this.toggle = !this.toggle;
  }

}
