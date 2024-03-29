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

  /**
   * Constructor for the MyClass
   * @param http - The HttpClient instance for making HTTP requests
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Create an order
   * @param order - The order to be created
   * @returns Observable of the created order
   */
  createOrder(order: OrderModel){
    return this.http.post<OrderModel>(`${environment.backendUrl +environment.backendPort + environment.backendUrlOrder }`, order)
      .pipe(
        map(result => {
          return {
            ...order,
            date: new Date(order.date),
          }
        }),
      )
  }

  /**
   * Retrieve all orders from the database.
   * @returns {Observable<OrderModel[]>} An observable of order models.
   */
  getAll(): Observable<OrderModel[]> {
    return this.http.get<OrderRespModel>(`${environment.backendUrl +environment.backendPort + environment.backendUrlOrder }`)
      .pipe(
        map(res => {
          // Transform the response object into an array of order models
          return res ? Object.keys(res)
            .map(key => ({
              ...res[key],
            })) : []
        })
      )
  }

  /**
   * Removes an order by its ID
   * @param id - The ID of the order to be removed
   * @returns An observable of the removed product model
   */
  removeOrder(id: number): Observable<ProductModel> {
    return this.http.delete<ProductModel>(`${environment.backendUrl +environment.backendPort + environment.backendUrlOrder }/${id}`)
  }

}
