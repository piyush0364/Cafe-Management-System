import { Component,OnInit,ApplicationModule } from '@angular/core';
import { ProductService } from '../service/product.service';
import { CategoryService } from '../service/category.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})


export class MenuComponent {
 
  title = 'productinfo-app';
  activeItem: string;
  
  items: Product[] = [];
  fItems: Product[] = [];

  constructor(public psrv:ProductService, public csrv:CategoryService)
  {  
    this.activeItem= 'all';
  }

   ngOnInit(): void {

    this.csrv.getCategoryList();

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
  

 
}
