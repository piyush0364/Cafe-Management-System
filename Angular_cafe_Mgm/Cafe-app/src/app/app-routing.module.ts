import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './guards/auth.guard';
import { CartComponent } from './cart/cart.component';
import { HomoComponent } from './homo/homo.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AboutComponent } from './about/about.component';
import { PaymentComponent } from './payment/payment.component';
import { UserComponent } from './user/user.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { OrderitemComponent } from './orderitem/orderitem.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'homo', component: HomoComponent },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard] },
  { path: '', component: HomoComponent },
  { path: 'orderitem/:id', component: OrderitemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
