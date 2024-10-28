import { Component } from '@angular/core';
import { FeedbackService } from '../../Service/feedback.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  feedbackList: any[] = [];

  constructor(private feedbackService: FeedbackService,private toastr : ToastrService) {}

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback() {
    this.feedbackService.getFeedback().subscribe({
      next: (response) => {
        this.feedbackList = response;
      },
      error: (error) => {
        console.error('Error fetching feedback:', error);
      }
    });
  }

  deleteFeedback(ContactId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this contact?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.feedbackService.deleteFeedback(ContactId).subscribe({
          next: () => {
            this.toastr.success('Record Deleted Successfully!', 'Success');
            this.loadFeedback();
          },
          error: (err) => {
            this.toastr.error('An error occurred while deleting the record.', 'Error');
            console.error('Error deleting feedback:', err);
          }
        });
      } else {
        this.toastr.info('Deletion canceled', 'Info');
      }
    });
  }
}







