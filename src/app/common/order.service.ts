import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductModel, ProductRespModel} from "../models/product.model";
import {environment} from "../../environments/environment.development";
import {map, Observable} from "rxjs";
import {OrderModel, OrderRespModel} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {
  }

  createOrder(order: OrderModel) {
    return this.http.post<OrderModel>(`${environment.fbBDUrl}/orders.json`, order)
      .pipe(
        map(result => {
          return {
            ...order,
            id: result.name,
            date: new Date(order.date),
          }
        }),
      )
  }

  getAll(): Observable<OrderModel[]> {
    return this.http.get<OrderRespModel>(`${environment.fbBDUrl}/orders.json`)
      .pipe(map(res => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
          }))
      }))
  }

  removeOrder(id: string): Observable<ProductModel> {
    return this.http.delete<ProductModel>(`${environment.fbBDUrl}/orders/${id}.json`)
  }

}
