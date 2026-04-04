import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uData: User = new User();
  readonly ApiUrl = `${environment.apiBaseUrl}/Users`;

  uList:User[];

  constructor(private http : HttpClient) { }
  getUserList(): Observable<User[]> {
    return this.http.get<User[]>(this.ApiUrl).pipe(
      tap((res) => {
        this.uList = res;
      })
    );
  }

  deleteUser(id)
  {
    return this.http.delete(this.ApiUrl + '/'+id);
  }

    getUserListById(): Observable<any> {
      return this.http.get<any>(`${this.ApiUrl}/${localStorage.getItem('id')}`);
    }

    
    getUserList1(): Observable<any> {
      return this.http.get<any>(this.ApiUrl);
    }
    
  

}
