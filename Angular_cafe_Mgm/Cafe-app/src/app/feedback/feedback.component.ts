import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FeedbackService } from '../Service/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {

  constructor(
    private feedback: FeedbackService,
    private toastr: ToastrService
  ) {}

  onSubmit(form: NgForm) {
    const requestBody = {
      ...(form.value as Record<string, unknown>),
      CreatedDate: new Date().toISOString()
    };
    this.feedback.sendFeedback(requestBody).subscribe({
      next: () => {
        this.toastr.success('Success', 'Form Submitted Successfully');
        form.reset();
      },
      error: () => {
        this.toastr.error('Error', 'Could not submit feedback');
      }
    });
  }
}
