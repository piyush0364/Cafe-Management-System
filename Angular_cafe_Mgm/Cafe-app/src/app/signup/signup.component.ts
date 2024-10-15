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


  profileImageUrl: string | ArrayBuffer | null = null;


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
      password: ['',Validators.required],

    })
  }
  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye-slash" : this.eyeIcon = "fa-eye";
    this.isText ? this.type = "text" : this.type = "password";
  }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.profileImageUrl = reader.result; // This is the Base64 string
      console.log(  this.profileImageUrl);
    };

    if (file) {
      reader.readAsDataURL(file); // Converts to Base64
    }
  }


  onSignup(){
    if(this.signUpForm.valid){
      //perform logic for signup
      this.signUpForm.value.ImageUrl = this.profileImageUrl;
      console.log(this.signUpForm.value);
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
