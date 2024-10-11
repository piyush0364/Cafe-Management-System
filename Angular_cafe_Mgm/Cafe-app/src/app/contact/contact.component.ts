import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  readonly ppApiUrl='https://localhost:44390/api/Contacts';

  constructor(private http: HttpClient) {}

  onSubmit(form: any) {
    const requestBody = {
      ...form.value, 
      CreatedDate: new Date().toISOString() 
    };

    this.http.post(this.ppApiUrl, requestBody)
      .subscribe({
        next: response => {
          console.log('Success!', response);
          form.reset(); 
        },
        error: error => {
          console.error('Error occurred:', error);
        }
      });
  }

}
