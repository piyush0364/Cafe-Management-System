import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{


  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye";

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void { }

  hideShowPass() {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye-slash" : "fa-eye";
    this.type = this.isText ? "text" : "password";
  }

  onLogin(form: any) {
    if (form.valid) {
      console.log(form.value); // Log form data
      this.auth.login(form.value).subscribe({
        next: (res) => {
          console.log('Response:', res); // Log the full response object
          if (res?.Message) {
            alert(res.Message);
            form.reset(); // Reset the form

            this.auth.storeToken(res);
            const tokenPayload = this.auth.decodedToken();

            if (tokenPayload.role === "Admin1256") {
              this.router.navigate(['dashboard']);
            } else {
              this.router.navigate(['homo']);
            }
          } else {
            alert("No message found in the response");
          }
        },
        error: (err) => {
          console.log('Error:', err); // Log the error response
          alert(err?.error?.message || "Something went wrong");
        }
      });
    } else {
      alert("Your form is invalid");
    }
  }

}
