import { Component } from '@angular/core';
import { OrderService } from '../../Service/order.service';
import { Orders } from '../../Models/orders.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: Orders[] = [];

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
  onDelete(OrderId)
  {
   if(confirm("Are you sure? you wanna delete this Product?"))
   {
     this.ordersService.deleteOrder(OrderId).subscribe(
       res=>{this.ordersService.getOrders()
         alert("Record Deleted!!!")
         this.fetchOrders();
       },
      err=>{alert("Error!!!"+err);})
   }
  }
}

