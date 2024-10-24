import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

 
  constructor(private auth : AuthService, private router : Router) {
    
    
  }

  canActivate(): boolean {
    if(this.auth.isLoggedIn()){
      return true;
    }
    else{
      alert("Please login first");
      this.router.navigate['/login']
      return false;
    }
  }

}
