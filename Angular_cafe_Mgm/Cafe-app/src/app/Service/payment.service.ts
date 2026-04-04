import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartService } from './cart.service';
import { environment } from '../../environments/environment';

export interface PaymentProcessResult {
  PaymentId: number;
}

export interface OrderCreateResult {
  OrderId: number;
}

export interface Payment {
 
    name: string;
    CardNo: string;
    CvvNo: string;
    ExpiryDate: string;
    address: string;
    paymentMode: string;
}

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private readonly apiUrl = `${environment.apiBaseUrl}/Payments`;
    private readonly orderItemsUrl = `${environment.apiBaseUrl}/OrderItems`;
    private readonly ordersUrl = `${environment.apiBaseUrl}/Orders`;

    constructor(private http: HttpClient,private crt : CartService) { }

    submitPayment(payment: Payment): Observable<Payment> {
        return this.http.post<Payment>(this.apiUrl, payment).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse) {
        // Customize the error message based on the error response
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred.
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // return throwError(errorMessage);
        return throwError(() => new Error(errorMessage));
    }



    processPayment(paymentData: Record<string, unknown>): Observable<PaymentProcessResult> {
        return this.http.post<PaymentProcessResult>(this.apiUrl, { ...paymentData });
      }

    
  createOrder(orderData: Record<string, unknown>): Observable<OrderCreateResult> {
    return this.http.post<OrderCreateResult>(this.ordersUrl, orderData);
  }

  createOrderItems(itemData: Record<string, unknown>): Observable<unknown> {
    return this.http.post(this.orderItemsUrl, itemData);
  }


  getPayments(): Observable<any> {
    

    return this.http.get(this.apiUrl);
  }

 




}