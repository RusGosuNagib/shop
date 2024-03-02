import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductModel, ProductRespModel} from "../models/product.model";
import {environment} from "../../environments/environment.development";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private prodId: number;
  type: number = 1;
  productsInCart: ProductModel[] = [];

  /**
   * Constructor for creating an instance of the class
   * @param {HttpClient} http - The HttpClient instance for making HTTP requests
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Create a new product
   * @param product - The product to be created
   * @returns An observable of the created product
   */
  createProduct(product: ProductModel) {
    return this.http.post<ProductModel>(`${environment.fbBDUrl}/products.json`, product)
      .pipe(
        map(result => {
          return {
            ...product,
            id: result.title,
            date: new Date(product.date),
          }
        }),
      )
  }

  /**
   * Fetches all products from the database.
   * @returns An observable of ProductModel array
   */
  getAll(): Observable<ProductModel[]> {
    // Make an HTTP GET request to retrieve products from the database
    return this.http.get<ProductRespModel>(`${environment.backendUrl + environment.backendPort + environment.backendUrlProduct}`)
      .pipe(map(res => {
        // Map the response object to an array of ProductModel with ids
        return Object.keys(res)
          .map(key => ({
            ...res[key]
          }))
      }))
  }

  /**
   * Retrieves a product by its ID
   * @param id - The ID of the product to retrieve
   * @returns An observable of the product model
   */
  getById(id: number): Observable<ProductModel> {
    // Set the product ID
    this.prodId = id;

    // Make an HTTP request to retrieve the product by ID
    return this.http.get<ProductModel>(`${environment.backendUrl + environment.backendPort + environment.backendUrlProduct}/${id}`)
      .pipe(
        // Map the response and include the product ID
        map(res => {
          return {...res};
        })
      );
  }

  /**
   * Removes a product from the database by its ID.
   * @param id - The ID of the product to be removed
   * @returns An observable that emits the removed product
   */
  removeProduct(id: number): Observable<ProductModel> {
    const url = `${environment.fbBDUrl}/products/${id}.json`;
    return this.http.delete<ProductModel>(url);
  }

  /**
   * Updates a product in the database
   * @param product - The product to be updated
   * @returns An observable of the updated product
   */
  updateProduct(product: ProductModel): Observable<ProductModel> {
    const url = `${environment.fbBDUrl}/products/${product.id}.json`;
    return this.http.patch<ProductModel>(url, product);
  }

  /**
   * Set the type of the object.
   * @param {string} type - The type to be set.
   */
  setType(type: number) {
    this.type = type;
  }

  /**
   * Add a product to the cart.
   * @param product - The product to be added to the cart.
   */
  addProductToCart(product: ProductModel) {
    this.productsInCart.push(product);
  }

}
