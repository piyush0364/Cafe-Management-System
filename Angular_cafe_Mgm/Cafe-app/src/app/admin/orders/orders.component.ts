import { Component } from '@angular/core';
import { OrderService } from '../../Service/order.service';
<<<<<<< HEAD
import { AuthService } from '../../Service/auth.service';
=======
import { Orders } from '../../Models/orders.model';
>>>>>>> 479b0e4ffb23e19f64110193d493555b30a9fd70

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: Orders[] = [];

<<<<<<< HEAD

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

=======
  constructor(private ordersService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  // Fetch orders from the service
  fetchOrders(): void {
    this.ordersService.getOrders().subscribe(
      (data) => (this.orders = data),
      (error) => console.error('Failed to load orders:', error)
    );
  }

  // Handle order status update
  updateStatus(order: Orders, status: string): void {
    const updatedOrder={...order,status};
    this.ordersService.updateOrderStatus(updatedOrder).subscribe(
      () => {
        order.Status = status; // Update status locally for UI
        alert(`Order ${order.OrderNo} status updated to ${status}`);
      },
      (error) => console.error('Failed to update status:', error)
    );
  }
>>>>>>> 479b0e4ffb23e19f64110193d493555b30a9fd70
}

