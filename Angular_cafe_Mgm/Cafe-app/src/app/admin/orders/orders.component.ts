import { Component } from '@angular/core';
import { OrderService } from '../../Service/order.service';
import { Orders } from '../../Models/orders.model';
import { ProductService } from '../../Service/product.service';
import { Product } from '../../model/product.model';
import { UserService } from '../../Service/user.service';
import { PaymentService } from '../../Service/payment.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders: Orders[] = [];
  p: any;
  u : any;

  constructor(private ordersService: OrderService, private psrv : PaymentService,private usrv : UserService,
    private toastr : ToastrService,private route : Router
  ) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  // Fetch orders from the service
  fetchOrders(): void {

    this.psrv.getPayments().subscribe((res)=>{
      console.log(res);

      const productMap = res.reduce((acc, pmt) => {
        acc[pmt.PaymentId] = pmt.PaymentMode;
        return acc;
      }, {} as { [key: number]: string });

      this.p = productMap;

      console.log(this.p);

    },(err)=>{
      console.log(err);
    });

      this.usrv.getUserList1().subscribe((res)=>{

        const userMap = res.reduce((acc, user) => {
          acc[user.UserId] = user.Name;
          return acc;
        }, {} as { [key: number]: string });

        this.u = userMap;
        console.log(this.u);

      },(err)=>{
        console.log(err);
      })

    this.ordersService.getOrders().subscribe(
      (data) => (this.orders = data),
      (error) => console.error('Failed to load orders:', error)
    );

  
    
    

  }





  toggleStatus(order: Orders): void {
    const newStatus = order.Status === 'delivered' ? 'pending' : 'delivered';
    this.updateStatus(order, newStatus);
  }
  
  updateStatus(order: Orders, status: string): void {
    const updatedOrder = { ...order, status };
    this.ordersService.updateOrderStatus(updatedOrder).subscribe(
      () => {
        order.Status = status; // Update status locally for UI
        
        this.toastr.success('Success',`Order ${order.OrderId} status updated to ${status}`)
        
      },
      (error) => console.error('Failed to update status:', error)
    );
  }

  onDelete(OrderId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordersService.deleteOrder(OrderId).subscribe({
          next: () => {
            this.toastr.success('Record Deleted Successfully!', 'Success');
            this.fetchOrders(); // Refresh the orders list
          },
          error: (err) => {
            this.toastr.error('An error occurred while deleting the record.', 'Error');
            console.error('Error deleting order:', err);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.info('Deletion canceled', 'Info');
      }
    });
  }

  getOrderbyNo(orderId: number): void {
   
    this.route.navigate(['/orderitem', orderId]);
  }


}

