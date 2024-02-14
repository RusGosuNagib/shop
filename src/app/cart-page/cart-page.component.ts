import { Component } from '@angular/core';
import {ProductService} from "../common/product.service";
import {Router} from "@angular/router";
import {ProductModel} from "../models/product.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {

  productsInCart: ProductModel[] = [];
  totalPrice = 0;

  constructor(
    private productService: ProductService
  ) {

  }
  ngOnInit(): void {
    console.log(this.productService.productsInCart)
    this.productsInCart = this.productService.productsInCart
    for (let index = 0; index < this.productsInCart.length; index++) {
      this.totalPrice += +this.productsInCart[index].price;
    }
  }
}
