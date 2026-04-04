import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

/** Backend auth endpoints return variable fields; callers narrow as needed. */
export interface AuthApiResponse {
  Message?: string;
  Token?: string;
  id?: string | number;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = `${environment.apiBaseUrl}/Auth/`;

  constructor(public http : HttpClient, private router : Router) { }

  signUp(userObj: Record<string, unknown>) {
    return this.http.post<AuthApiResponse>(`${this.baseUrl}register`, userObj);
  }

  login(loginObj: Record<string, unknown>): Observable<AuthApiResponse> {
    return this.http.post<AuthApiResponse>(`${this.baseUrl}authenticate`, loginObj);
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tvalue: AuthApiResponse) {
    if (tvalue.Token == null || tvalue.id == null) {
      return;
    }
    localStorage.setItem('token', tvalue.Token);
    localStorage.setItem('id', String(tvalue.id));
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn() : boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(): Record<string, unknown> | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token) as Record<string, unknown>;
  }

  isAdmin(): boolean {
    const userpayload = this.decodedToken();
    const role = userpayload?.['role'];
    return Array.isArray(role)
      ? role.includes('Admin1256')
      : typeof role === 'string' && role.includes('Admin1256');
  }

}
