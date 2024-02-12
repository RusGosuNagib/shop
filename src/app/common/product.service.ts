import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductModel, ProductRespModel} from "../models/product.model";
import {environment} from "../../environments/environment.development";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }
  createProduct(product: ProductModel){
    return this.http.post<ProductModel>(`${environment.fbBDUrl}`,product)
      .pipe(
        map(result => {
          return {
            ...product,
            id: result.name,
            date: new Date(product.date),
          }
        }),
      )
  }

  getAll(){
    return this.http.get<ProductRespModel>(`${environment.fbBDUrl}`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key=>({
            ...res[key],
            id: key,
          }))
      }))
  }
}
