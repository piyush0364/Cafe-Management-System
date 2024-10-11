
import { Component, OnInit } from '@angular/core';
import { CartService } from '../Service/cart.service';
import { Cart } from '../model/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCartItems();
  }

  // Fetch cart items from the API
  getCartItems() {
    this.cartService.getCarts().subscribe(
      (items: Cart[]) => {
        this.cartItems = items;
        console.log(items);
        this.calculateTotal();
      },
      error => {
        console.error('Error fetching cart items', error);
      }
    );
  }

  // Method to increase quantity
  increaseQuantity(item: Cart): void {
    item.Quantity = item.Quantity ? item.Quantity + 1 : 1;  // Ensure quantity is not null
    this.updateCartItem(item);
  }

  // Method to decrease quantity
  decreaseQuantity(item: Cart): void {
    if (item.Quantity && item.Quantity > 1) {  // Ensure quantity is not null
      item.Quantity -= 1;
      this.updateCartItem(item);
    }
  }

  // Update cart item through CartService
  updateCartItem(item: Cart) {
    this.cartService.updateCart(item.cartId, item).subscribe(
      response => {
        this.calculateTotal();
      },
      error => {
        console.error('Error updating cart item', error);
      }
    );
  }

  // Calculate the total price
  calculateTotal(): number {
    if (!this.cartItems || this.cartItems.length === 0) {
      return 0;
    }

    return this.cartItems.reduce((sum, item) => {
      const itemTotal = (item.product?.Price || 0) * (item.Quantity || 0);
      return sum + itemTotal;
    }, 0);
  }
  
  removeItem(item: Cart) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1); // Remove the item locally
      this.cartService.deleteCart(item.productId).subscribe(() => {
        console.log('Item removed');
        this.calculateTotal();  // Recalculate total after removal
      });
    }
  }
}

