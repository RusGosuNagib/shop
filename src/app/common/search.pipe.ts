import {Pipe, PipeTransform} from '@angular/core';
import {ProductModel} from "../models/product.model";

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products: ProductModel[], productName = '') {
    if (!productName.trim()) {
      return products;
    }
    return products.filter((product: ProductModel) => {
      return product.title.toLowerCase().includes(productName.toLowerCase());
    });
  }

}
