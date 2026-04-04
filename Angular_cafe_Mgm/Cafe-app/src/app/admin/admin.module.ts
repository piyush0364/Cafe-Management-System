import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { ContactComponent } from './contact/contact.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { AdminnavComponent } from '../adminnav/adminnav.component';

/**
 * Admin feature: routes registered via RouterModule.forChild merge at app root
 * (same URLs as before: /dashboard, /products, …).
 */
@NgModule({
  declarations: [
    DashboardComponent,
    CategoriesComponent,
    OrdersComponent,
    ContactComponent,
    CustomersComponent,
    ProductsComponent,
    AdminnavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  exports: [AdminnavComponent]
})
export class AdminModule {}
