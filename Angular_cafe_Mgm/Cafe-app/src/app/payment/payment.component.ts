import { Component } from '@angular/core';
import { PaymentService, Payment } from '../payment.service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
    model: any = {};

    submissionMessage: string | null = null; // To display submission messages
    errorMessage: string | null = null; // To display error messages

    constructor(private paymentService: PaymentService) {}
 
    onSubmit(form: any) {
        if (form.valid) {
          this.paymentService.processPayment(form.value).subscribe(
            (response) => {
              this.submissionMessage = "Payment submitted successfully!";
              this.errorMessage = null;
              console.log(response);
            },
            (error) => {
              this.errorMessage = "Error processing payment. Please try again.";
              this.submissionMessage = null;
              console.error(error);
            }
          );
        } else {
          this.errorMessage = "Please fill in all required fields.";
          this.submissionMessage = null;
        }
      }
}
