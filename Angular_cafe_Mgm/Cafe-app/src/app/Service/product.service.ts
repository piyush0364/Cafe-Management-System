import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';
import { environment } from '../../environment';  

@Injectable({
  providedIn: 'root'
})
 

export class ProductService {

  pData: Product = new  Product();
  readonly ppApiUrl=`${environment.apiUrl}/Products`;

  pList:Product[];


  constructor(private objHttp:HttpClient) { }

      getProducts(): Observable<Product[]> {
      return this.objHttp.get<Product[]>(this.ppApiUrl);
    }

  getProductList()
  {
    this.objHttp.get(this.ppApiUrl).toPromise()
    .then(res=>this.pList=res as Product[]);
  }
  createProduct(p:any)
  {
    this.pData.ImageUrl = p;
    return this.objHttp.post(this.ppApiUrl,this.pData);
  }

  updateProduct(img : any)
  {
    return this.objHttp.put(this.ppApiUrl+"/"+this.pData.ProductId,{...this.pData,ImageUrl : img});
  }

  deleteProduct(Product)
  {
    return this.objHttp.delete(this.ppApiUrl + '/'+Product);
  }

  getProductById(productId:any): Observable<Product> {
    return this.objHttp.get<Product>(`${this.ppApiUrl}/${productId}`);
  }
}

