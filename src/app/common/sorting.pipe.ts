import {Pipe, PipeTransform} from '@angular/core';
import {ProductModel} from "../models/product.model";

@Pipe({
  name: 'sorting',
  standalone: true
})
export class SortingPipe implements PipeTransform {

  /**
   * Filters products by type.
   * @param {ProductModel[]} products - The array of products to filter.
   * @param {string} type - The type to filter by.
   * @returns {ProductModel[]} - The filtered array of products.
   */
  transform(products: ProductModel[], type: number = 0): ProductModel[] {
    return products.filter((product: ProductModel) => {
      return product.type === type;
    });
  }

}
