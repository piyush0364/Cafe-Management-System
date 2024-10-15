import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye";
  signUpForm!: FormGroup;
  constructor(private fb : FormBuilder, private auth: AuthService,private router: Router){

  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['',Validators.required],
      username: ['',Validators.required],
      mobile: ['',Validators.required],
      email: ['',Validators.required],
      address: ['',Validators.required],
      postcode: ['',Validators.required],
      password: ['',Validators.required]

    })
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye-slash" : this.eyeIcon = "fa-eye";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSignup(){
    if(this.signUpForm.valid){
      //perform logic for signup
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          alert(res.Message)
          this.signUpForm.reset();
          this.router.navigate(['login']);
        })
        ,error:(err=>{
          alert(err?.error.Message)
        })
      })

    }else{
      this.validateAllFormFields(this.signUpForm)
      //logic for throwing error
    }
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl) {
        control.markAsDirty({onlySelf: true});
      }
      else if(control instanceof FormGroup) {
        this.validateAllFormFields(control)
      }
    });

  }

}
