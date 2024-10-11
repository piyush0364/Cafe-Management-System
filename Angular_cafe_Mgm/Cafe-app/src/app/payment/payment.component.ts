import { Component } from '@angular/core';
import { PaymentService, Payment } from '../payment.service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
    model: Payment = {
        name: '',
        address: '',
        CardNo: null,
        CvvNo: null,
        ExpiryDate : null,
        paymentMode: ''
    };

    mode: string;
     
    submissionMessage: string | null = null; // To display submission messages
    errorMessage: string | null = null; // To display error messages

    constructor(private paymentService: PaymentService) {}
 
    onPaymentModeChange() {

        this.mode = ononline;
        // Reset card details when payment mode changes
        // if (this.model.paymentMode !== 'online') {
        //     this.model.CardNo = null;
        //     this.model.CvvNo = null;
        //     this.model.ExpiryDate = null;
        // }
    }

    onSubmit(form:any) {
        this.paymentService.submitPayment(form.value).subscribe(
            response => {
                this.submissionMessage = 'Payment submitted successfully!';
                this.model = { name: '', address: '', CardNo: '', CvvNo: '', ExpiryDate: '', paymentMode: '' }; // Reset form
           
            },
            error => {
                this.errorMessage = 'Error submitting payment. Please try again.';
                console.error('Error submitting payment', error);
            }
        );
    }
}