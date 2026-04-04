import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductService } from '../Service/product.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../Service/user.service';
import { CartService, CartItem } from '../Service/cart.service';
import { CheckoutService } from '../Service/checkout.service';


@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})



export class PaymentComponent implements OnInit {
  // private apiUrl = 'https://localhost:44331/api/OrderItems';  
    cartItems: CartItem[] = [];
  id: number = 0;
  priceByProductId: Record<number, number> = {};
  savedAddress: string = '';


    submissionMessage: string | null = null; // To display submission messages
    errorMessage: string | null = null; // To display error messages

  constructor(
    private checkout: CheckoutService,
    private crt: CartService,
    private router: Router,
    private psrv: ProductService,
    private toastr: ToastrService,
    private u: UserService
  ) {}

    ngOnInit(): void {
    const rawId = localStorage.getItem('id');
    this.id = rawId ? Number(rawId) : 0;

    if (!this.id) {
      this.errorMessage = 'User id not found. Please login again.';
      return;
    }

    this.loadItems();
    }
 

  loadItems(): void {
    forkJoin({
      cartItems: this.crt.getCartItems(this.id),
      products: this.psrv.getProducts()
    }).subscribe({
      next: ({ cartItems, products }) => {
        this.cartItems = cartItems;
        this.priceByProductId = products.reduce((acc, product) => {
          acc[product.ProductId] = product.Price;
          return acc;
        }, {} as Record<number, number>);
      },
      error: () => {
        this.errorMessage = 'Failed to load cart items.';
      }
    });
  }

    get subtotal(): number {
      return this.cartItems.reduce((total, item) => total + item.Price * item.Quantity, 0);
    }
  
    get shipping(): number {
      return 5.00;
    }


  onSubmit(form: any) {
    this.submissionMessage = null;
    this.errorMessage = null;

    if (!form?.valid) {
      this.errorMessage = 'Invalid form. Please check the inputs.';
      return;
    }

    this.checkout
      .placeOrder(this.id, form.value, this.cartItems, this.priceByProductId)
      .subscribe({
        next: () => {
          this.submissionMessage = 'Order Placed Successfully';
          this.toastr.success('Success', 'Order Placed Successfully');
          this.router.navigate(['homo']);
        },
        error: () => {
          this.errorMessage = 'Payment/order failed. Please try again.';
          this.toastr.error('Error', 'Could not place order');
        }
      });
  }



      useSavedAddress() {
    this.u.getUserListById().subscribe({
      next: (res) => {
        this.savedAddress = res?.Address ?? '';
      },
      error: () => {
        this.errorMessage = 'Failed to load registered address.';
      }
    });
  }

}