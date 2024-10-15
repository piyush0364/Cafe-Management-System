import { Component } from '@angular/core';
import { OrderService } from '../../Service/order.service';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {


constructor(public objs:OrderService,private auth : AuthService) {}

ngOnInit(): void {
  this.objs.getOrdersList();

}
fillData(selectedOL)
{
 this.objs.oData=Object.assign({},selectedOL);
}
onDelete(orderID)
{
 if(confirm("Are you sure? you wanna delete this Category?"))
 {
   this.objs.deleteOrder(orderID).subscribe(
     res=>{this.objs.getOrdersList()
       alert("Record Deleted!!!")
     },
    err=>{alert("Error!!!"+err);})
 }
}

logout()
{
  this.auth.signOut();
}

}
