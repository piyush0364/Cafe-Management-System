import { Injectable } from '@angular/core';
import { Categories } from '../Models/categories.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  cData: Categories = new Categories();
  readonly ApiUrl='https://localhost:44344/api/Categories';

  cList:Categories[];
  // cList: Categories[] = []; // Initialize as an empty array



  constructor(private objHttp:HttpClient)
  {

   }


   getCategoriesList() {
     this.objHttp.get<Categories[]>(this.ApiUrl).toPromise().then(res => {
       this.cList = res; // Assign response to cList
     }).catch(err => {
       console.error('Error fetching passport list:', err); // Handle errors
     });
   }



   createCategories()
   {
     return this.objHttp.post(this.ApiUrl,this.cData);
   }


   updateCategories(){
     return this.objHttp.put(this.ApiUrl+"/"+this.cData.CategoryId,this.cData);
   }

   

   deleteCategories(CategoryId: number) {
     console.log(`Deleting passport with ID: ${CategoryId}`); // Log the ID
     return this.objHttp.delete(`${this.ApiUrl}/${CategoryId}`);
 }
 

 
}
