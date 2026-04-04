import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CartComponent } from './cart/cart.component';
import { HomoComponent } from './homo/homo.component';
import { AboutComponent } from './about/about.component';
import { PaymentComponent } from './payment/payment.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { OrderitemComponent } from './orderitem/orderitem.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavComponent,
    FeedbackComponent,
    CartComponent,
    HomoComponent,
    AboutComponent,
    PaymentComponent,
    FooterComponent,
    UserComponent,
    PurchaseComponent,
    OrderitemComponent
  ],

  imports: [
    BrowserModule,
    CoreModule,
    AdminModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
