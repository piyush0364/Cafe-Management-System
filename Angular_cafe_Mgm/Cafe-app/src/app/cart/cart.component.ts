import { Component, OnInit, Input } from '@angular/core';
import { CartService, CartItem } from '../Service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  id: number = 0;

  @Input() items: any[] = [];
 

  constructor(public crt: CartService) {}

  ngOnInit(): void {
    const rawId = localStorage.getItem('id');
    this.id = rawId ? Number(rawId) : 0;
    this.loadCartItems();
  }


  loadCartItems(): void {
    this.crt.getCartItems(this.id).subscribe(
      (items) => {
        this.cartItems = items;
      },
      (error) => {
        // Optionally show a toast/message here
      }
    );
  }



  get totalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.Quantity, 0);
  }

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.Price * item.Quantity, 0);
  }

  get shipping(): number {
    return 5.00;
  }

  removeItem(item: CartItem): void {
    if(item.Quantity == 1){
      this.crt.deleteCart(item.CartId).subscribe(
        (response) => {
          this.loadCartItems();
  
        },
        (error) => {
          // Optionally show a toast/message here
        }
      );

    }
    else{
    this.crt.updateCart(item.CartId,item.Quantity-1,item.ProductId).subscribe(
      (response) => {
        this.loadCartItems();

      },
      (error) => {
        // Optionally show a toast/message here
      }
    );
  }

  }

  addItem(item: CartItem): void {
     this.crt.updateCart(item.CartId,item.Quantity+1,item.ProductId).subscribe(
      (response) => {
        this.loadCartItems();

      },
      (error) => {
        // Optionally show a toast/message here
      }
    );
  }




}
