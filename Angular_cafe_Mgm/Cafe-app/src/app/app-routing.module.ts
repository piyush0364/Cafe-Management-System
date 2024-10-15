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
import { CartComponent } from './cart/cart.component';
import { HomoComponent } from './homo/homo.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminGuard } from './admin.guard';


const routes: Routes = [
  {path:'',component:HomoComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AdminGuard]},
  {path:'menu',component:MenuComponent,canActivate:[AuthGuard]},
  {path:'categories',component:CategoriesComponent,canActivate:[AdminGuard]},
  {path:'products',component:ProductsComponent,canActivate:[AdminGuard]},
  {path:'orders',component:OrdersComponent,canActivate:[AdminGuard]},
  {path:'contact',component:ContactComponent,canActivate:[AdminGuard]},
  {path:'customers',component:CustomersComponent,canActivate:[AdminGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'homo',component:HomoComponent},
  {path:'feedback',component:FeedbackComponent,canActivate:[AuthGuard]},
  {path:'about',component:AboutComponent},
  {path:'payment',component:PaymentComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
