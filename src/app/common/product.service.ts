import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../models/user.model";
import {ProductModel} from "../models/product.model";
import {environment} from "../../environments/environment.development";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }
  createProduct(product: ProductModel){
    return this.http.post<ProductModel>(`${environment.fbBDUrl}/products.json`,product)
      // .pipe(
      //   map(result => {
      //     return {
      //       product,
      //       id: result.name,
      //       date: new Date(product.date),
      //     }
      //   }),
      // )
  }
}
