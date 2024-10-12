import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ProductsComponent } from './admin/products/products.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ContactComponent } from './admin/contact/contact.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'menu',component:MenuComponent, canActivate:[AuthGuard]},
  {path:'categories',component:CategoriesComponent},
  {path:'products',component:ProductsComponent},
  {path:'orders',component:OrdersComponent},
  {path:'contact',component:ContactComponent},
  {path:'customers',component:CustomersComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
