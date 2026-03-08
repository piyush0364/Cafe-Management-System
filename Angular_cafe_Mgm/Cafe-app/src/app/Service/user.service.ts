import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uData: User = new User();
  readonly ApiUrl=`${environment.apiUrl}/Users`;

  uList:User[];

  constructor(private http : HttpClient) { }
  getUserList()
  {
    this.http.get(this.ApiUrl).toPromise()
    .then(res=>this.uList=res as User[]);
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
