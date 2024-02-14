import { Pipe, PipeTransform } from '@angular/core';
import {ProductModel} from "../models/product.model";

@Pipe({
  name: 'sorting',
  standalone: true
})
export class SortingPipe implements PipeTransform {

  transform(products: ProductModel[], type = '') {
    return products.filter((product: ProductModel) => {
      return product.type === type;
    });
  }

}
