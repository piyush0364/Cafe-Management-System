// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-feedback',
//   templateUrl: './feedback.component.html',
//   styleUrl: './feedback.component.css'
// })
// export class FeedbackComponent {

// }
import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../Service/feedback.service';

@Component({

  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackAdminComponent implements OnInit {
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
   if(confirm("Are you sure? you wanna delete this passport?"))
   {
     this.feedbackService.deleteFeedback(ContactId).subscribe(
       res=>{this.feedbackService.getFeedback()
         alert("Record Deleted!!!")
       },
      err=>{alert("Error!!!"+err);})
   }
  }
}

