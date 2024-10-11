import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly ppApiUrl='https://localhost:44344/api/Products';

  constructor(private objHttp : HttpClient) { }


    getProducts(): Observable<Product[]> {
      return this.objHttp.get<Product[]>(this.ppApiUrl);
    }

}
