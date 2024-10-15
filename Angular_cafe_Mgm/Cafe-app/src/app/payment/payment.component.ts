import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../Service/payment.service';
import { CartService } from '../Service/cart.service';
import { Router } from '@angular/router';

export interface CartItem {
  ProductId : number,
  CartId : number,
  ProductName: string;
  Price: number;
  ImageUrl: string;
  Quantity: number;
}


@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})



export class PaymentComponent implements OnInit {
    model: any = {};
    cartItems: CartItem[] = [];
    id : number; 
    orderData : any;

    submissionMessage: string | null = null; // To display submission messages
    errorMessage: string | null = null; // To display error messages

    constructor(private paymentService: PaymentService, private crt : CartService,private router : Router) {}

    ngOnInit(): void {
      this.id = JSON.parse(localStorage.getItem('id'));
      this.loadItems();
    }
 

    loadItems():void{

      this.crt.getCartItems(this.id).subscribe(
        (items) => {
          this.cartItems = items;
        },
        (error) => {
          console.error('Error loading cart items', error);
        }
      );

    }


    onSubmit(form: any) {
        if (form.valid) {
          this.paymentService.processPayment(form.value).subscribe(
            (response) => {
              
              console.log("Order about to be created", response);
              this.createOrder(response.PaymentId);
              alert("Order Placed Successfully")
              this.router.navigate(['homo'])
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
console.log("failed");
        }
      }



      createOrder(id : number) :void{

        for(let t of this.cartItems){

        this.orderData = {
        ProductId : t.ProductId,
        Quantity : t.Quantity,
        UserId : this.id,
        Status : "pending",
        PaymentId : id,
        OrderDate : new Date()
      }

        this.paymentService.createOrder(this.orderData,t.CartId).subscribe(
          (response) => {
            console.log(this.orderData);
            console.log('Order created successfully:', response);
            // Handle successful response (e.g., display a success message)
          },
          (error) => {
            console.error('Error creating order:', error);
            // Handle error response (e.g., display an error message)
          }
        );
      }
      }

}