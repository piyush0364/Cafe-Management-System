// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { MenuComponent } from './menu/menu.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { DashboardComponent } from './admin/dashboard/dashboard.component';
// import { CategoriesComponent } from './admin/categories/categories.component';
// import { ProductsComponent } from './admin/products/products.component';
// import { OrdersComponent } from './admin/orders/orders.component';
// import { Contact } from './Models/contact.model';
// import { ContactComponent } from './admin/contact/contact.component';

// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
// import { CustomersComponent } from './admin/customers/customers.component';
// import { HomeComponent } from './home/home.component';
// import { NavComponent } from './nav/nav.component';
// import { FeedbackComponent } from './feedback/feedback.component';
// import { DisplayComponent } from './display/display.component';
// import { CartComponent } from './cart/cart.component';
// import { HomoComponent } from './homo/homo.component';
// import { AboutComponent } from './about/about.component';
// import { PaymentComponent } from './payment/payment.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     MenuComponent,
//     DashboardComponent,
//     CategoriesComponent,
//     ProductsComponent,
//     OrdersComponent,
//     CustomersComponent,
//     ContactComponent,
//     LoginComponent,
//     SignupComponent,
//     HomeComponent,
//     NavComponent,
//     FeedbackComponent,
//     DisplayComponent,
//     CartComponent,
//     HomoComponent,
//     AboutComponent,
//     PaymentComponent,
   
//   ],
  
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     FormsModule,
//     HttpClientModule,
//     ReactiveFormsModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent,DashboardComponent,CategoriesComponent,ProductsComponent,OrdersComponent,CustomersComponent,ContactComponent]
// })
// export class AppModule { }

// ----------------------------------------------------------------------















// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { MenuComponent } from './menu/menu.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { DashboardComponent } from './admin/dashboard/dashboard.component';
// import { CategoriesComponent } from './admin/categories/categories.component';
// import { ProductsComponent } from './admin/products/products.component';
// import { OrdersComponent } from './admin/orders/orders.component';
// import { Contact } from './Models/contact.model';
// import { ContactComponent } from './admin/contact/contact.component';

// import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';
// import { CustomersComponent } from './admin/customers/customers.component';
// import { HomeComponent } from './home/home.component';
// import { NavComponent } from './nav/nav.component';
// import { FeedbackComponent } from './feedback/feedback.component';
// import { CartComponent } from './cart/cart.component';
// import { HomoComponent } from './homo/homo.component';
// import { AboutComponent } from './about/about.component';
// import { PaymentComponent } from './payment/payment.component';
// import { RouterModule, ROUTES } from '@angular/router';
// import { FeedbackAdminComponent } from './admin/feedback/feedback.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     MenuComponent,
//     DashboardComponent,
//     CategoriesComponent,
//     ProductsComponent,
//     OrdersComponent,
//     CustomersComponent,
//     ContactComponent,
//     LoginComponent,
//     SignupComponent,
//     HomeComponent,
//     NavComponent,
//     FeedbackComponent,
//     CartComponent,
//     HomoComponent,
//     AboutComponent,
//     PaymentComponent,
//     FeedbackAdminComponent
//   ],
  
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     FormsModule,
//     HttpClientModule,
//     ReactiveFormsModule,
//     RouterModule
  
//   ],
//   providers: [],
//   bootstrap: [AppComponent,DashboardComponent,CategoriesComponent,ProductsComponent,OrdersComponent,CustomersComponent,ContactComponent]
// })
// export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ProductsComponent } from './admin/products/products.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { Contact } from './Models/contact.model';
import { ContactComponent } from './admin/contact/contact.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CustomersComponent } from './admin/customers/customers.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { CartComponent } from './cart/cart.component';
import { HomoComponent } from './homo/homo.component';
import { AboutComponent } from './about/about.component';
import { PaymentComponent } from './payment/payment.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DashboardComponent,
    CategoriesComponent,
    ProductsComponent,
    OrdersComponent,
    CustomersComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavComponent,
    FeedbackComponent,
    CartComponent,
    HomoComponent,
    AboutComponent,
    PaymentComponent,
    FooterComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,DashboardComponent,CategoriesComponent,ProductsComponent,OrdersComponent,CustomersComponent,ContactComponent]
})
export class AppModule { }