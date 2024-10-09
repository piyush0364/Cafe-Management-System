import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  cData:Category = new Category()
  readonly ppApiUrl='https://localhost:44390/api/Categories';

  cList:Category[];

  constructor(private objHttp : HttpClient) { }

  getCategoryList(){
    this.objHttp.get(this.ppApiUrl).toPromise().then(res=>this.cList=res as Category[]);
    }
  

}
