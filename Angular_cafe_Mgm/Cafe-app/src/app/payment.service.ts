// // payment.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface Payment {
//     username: string;
//     cardNumber: string;
//     ccv: string;
//     expiry: string;
//     address: string;
//     paymentMode: string;
// }

// @Injectable({
//     providedIn: 'root'
// })
// export class PaymentService {
//     private apiUrl = 'https://localhost:44344/api/Payments'; // Adjust URL as needed

//     constructor(private http: HttpClient) { }

//     submitPayment(payment: Payment): Observable<Payment> {
//         return this.http.post<Payment>(this.apiUrl, payment);
//     }
// }




import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    private apiUrl = 'https://localhost:44344/api/Payments'; // Adjust URL as needed

    constructor(private http: HttpClient) { }

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
        return throwError(errorMessage);
    }
}













// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
 


// @Injectable({
//   providedIn: 'root'
// })
// export class PaymentService {
//   private apiUrl = 'https://localhost:5001/api/payment'; // Adjust URL as needed

//   constructor(private http: HttpClient) { }

//   submitPayment(payment: Payment): Observable<Payment> {
//       return this.http.post<Payment>(this.apiUrl, payment);
//   }
// }