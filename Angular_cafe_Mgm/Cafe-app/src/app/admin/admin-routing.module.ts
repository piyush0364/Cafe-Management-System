import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { ContactComponent } from './contact/contact.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [AdminGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AdminGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AdminGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AdminGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
