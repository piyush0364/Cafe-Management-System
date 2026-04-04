import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
 

export class ProductService {

  pData: Product = new  Product();
  readonly ppApiUrl = `${environment.apiBaseUrl}/Products`;

  pList:Product[];


  constructor(private objHttp:HttpClient) { }

      getProducts(): Observable<Product[]> {
      return this.objHttp.get<Product[]>(this.ppApiUrl);
    }

  getProductList(): Observable<Product[]> {
    return this.objHttp.get<Product[]>(this.ppApiUrl).pipe(
      tap((res) => {
        this.pList = res;
      })
    );
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

