import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  cData:Category = new Category()
  readonly ApiUrl = `${environment.apiBaseUrl}/Categories`;

  cList:Category[];

  constructor(private objHttp : HttpClient) { }

  getCategoryList(): Observable<Category[]> {
    return this.objHttp.get<Category[]>(this.ApiUrl).pipe(
      tap((res) => {
        this.cList = res;
      })
    );
  }
  
    createCategory(c:any,f : any)
    {
      return this.objHttp.post(this.ApiUrl,{ImageUrl : c , ...f.value});
    }
    updateCategory(img : any)
    {
      return this.objHttp.put(this.ApiUrl+"/"+this.cData.CategoryId,{...this.cData,ImageUrl : img});
    }
    deleteCategory(id)
    {
      return this.objHttp.delete(this.ApiUrl + '/'+id);
    }
  
    //for fk purpose
    getcategoryList1():Observable<Category[]>{
      
        return this.objHttp.get<Category[]>(this.ApiUrl);
      
    }

}
