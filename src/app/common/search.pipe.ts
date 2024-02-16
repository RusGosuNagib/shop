import {Pipe, PipeTransform} from '@angular/core';
import {ProductModel} from "../models/product.model";

@Pipe({
  name: 'search',
  standalone: true
})

export class SearchPipe implements PipeTransform {

  /**
   * Filters products based on the provided product name.
   * If no product name is provided, returns all products.
   *
   * @param products - The array of ProductModel to filter
   * @param productName - The name of the product to filter by
   * @returns The filtered array of ProductModel
   */
  transform(products: ProductModel[], productName = ''): ProductModel[] {
    if (!productName.trim()) {
      return products;
    }
    return products.filter((product: ProductModel) => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });
  }

}
