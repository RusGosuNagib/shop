import {Component, Input} from '@angular/core';
import {ProductModel} from "../../../models/product.model";
import {RouterLink} from "@angular/router";
import {ProductService} from "../../product.service";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RouterLink,
    CardModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {
  @Input()
  product: ProductModel;

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
  }

  addToCart(product: ProductModel) {
    this.productService.addProductsToCart(product)
  }
}
