import { Component,OnInit,ApplicationModule } from '@angular/core';
import { ProductService } from '../Service/product.service';
import { CategoryService } from '../Service/category.service';
import { Product } from '../model/product.model';
import { catchError, of, switchMap } from 'rxjs';
import { CartService } from '../Service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})


export class MenuComponent {
 
  title = 'productinfo-app';
  activeItem: string;
  id:number;
  
  items: Product[] = [];
  fItems: Product[] = [];

  constructor(public psrv:ProductService, public csrv:CategoryService, public crt:CartService,private toastr:ToastrService)
  {
    const rawId = localStorage.getItem('id');
    this.id = rawId ? Number(rawId) : 0;

    this.activeItem= 'all';
  }

   ngOnInit(): void {
    const id = localStorage.getItem('id');
    this.id = id ? Number(id) : this.id;

    this.csrv.getCategoryList().subscribe({
      error: () => {
        // Optionally show a toast/message here
      }
    });

    this.psrv.getProducts().subscribe((data: Product[]) => {
      this.items = data;
      this.fItems = [...this.items];
    });

  }



 
  filteredItems(categoryType: number,categoryname: string) {
    if (categoryType === 0) {
      this.fItems = this.items;
    }

    else{
      this.fItems= this.items.filter(item => 
        item.CategoryId == categoryType);
    }
    this.activeItem=categoryname;

  }


  addItemToCart(productId: number) {
    this.crt.getCartItems(this.id).pipe(
      switchMap((cartItems) => {
        const existingItem = cartItems.find(item => item.ProductId === productId);

        if (existingItem) {
          return this.crt.updateCart(existingItem.CartId, existingItem.Quantity + 1,productId);
        } else {
          return this.crt.addToCart({ ProductId : productId, Quantity : 1,UserId:  this.id });
        }
      }),
      catchError((err) => {
        console.error('Error processing cart item:', err);
        return of(null); 
      })
    ).subscribe({
      next: (response) => {
        // alert("Product added to Cart")
        this.toastr.success('Success','Products Added To Cart')
      },
      error: (err) => {
        console.error('Error updating cart:', err);
      }
    });
  }
  

 
}
