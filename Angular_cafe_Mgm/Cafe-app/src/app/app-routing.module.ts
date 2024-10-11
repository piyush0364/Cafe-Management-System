import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './admin/contact/contact.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'payment',component:PaymentComponent},
  {path:'contact',component:ContactComponent},
  {path:'menu',component:MenuComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
