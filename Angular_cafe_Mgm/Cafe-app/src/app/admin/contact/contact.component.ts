import { Component } from '@angular/core';
import { FeedbackService } from '../../Service/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  feedbackList: any[] = [];

  constructor(private feedbackService: FeedbackService) {}

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
  deleteFeedback(ContactId)
  {
   if(confirm("Are you sure? you wanna delete this Contact?"))
   {
     this.feedbackService.deleteFeedback(ContactId).subscribe(
       res=>{this.feedbackService.getFeedback()
         alert("Record Deleted!!!")
       },
      err=>{alert("Error!!!"+err);})
   }
  }
}



