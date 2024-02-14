import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductModel, ProductRespModel} from "../models/product.model";
import {environment} from "../../environments/environment.development";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private prodId: string;
  type: string = 'Tshirts';
  productsInCart: ProductModel[] = [];

  constructor(private http: HttpClient) {
  }

  createProduct(product: ProductModel) {
    return this.http.post<ProductModel>(`${environment.fbBDUrl}/products.json`, product)
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

  getAll(): Observable<ProductModel[]> {
    return this.http.get<ProductRespModel>(`${environment.fbBDUrl}/products.json`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
          }))
      }))
  }

  getById(id: string): Observable<ProductModel> {
    this.prodId = id;
    return this.http.get<ProductModel>(`${environment.fbBDUrl}/products/${id}.json`)
      .pipe(map(res => {
        return {...res, id: this.prodId};
      }))
  }

  removeProduct(id: string): Observable<ProductModel> {
    return this.http.delete<ProductModel>(`${environment.fbBDUrl}/products/${id}.json`)
  }

  updateProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.patch<ProductModel>(`${environment.fbBDUrl}/products/${product.id}.json`, product)
  }

  setType(type: string) {
    this.type = type;
  }

  addProductsToCart(product: ProductModel) {
    this.productsInCart.push(product)
  }

}
