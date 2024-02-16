import {Component, OnInit} from '@angular/core';
import {ProductService} from "../common/product.service";
import {ProductModel} from "../models/product.model";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {OrderService} from "../common/order.service";
import {OrderModel} from "../models/order.model";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {

  productsInCart: ProductModel[] = [];
  totalPrice = 0;
  form: FormGroup;
  submitted = false;
  added = '';

  /**
   * Constructor for creating an instance of the class.
   * @param productService - The product service for managing products.
   * @param orderService - The order service for managing orders.
   */
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
  ) {
  }

  /**
   * Initialize the component and form
   */
  ngOnInit(): void {
    // Initialize products in cart
    this.productsInCart = this.productService.productsInCart;

    // Calculate total price of products in cart
    for (let index = 0; index < this.productsInCart.length; index++) {
      this.totalPrice += +this.productsInCart[index].price;
    }

    // Initialize form with default values and validators
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    });
  }

  /**
   * Submits the form data to create an order
   */
  submit() {
    // Check if the form is invalid
    if (this.form.invalid) {
      return;
    }
    // Set submitted flag to true
    this.submitted = true;
    // Create an order object using form data
    const order: OrderModel = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      price: this.totalPrice,
      date: new Date().toString(),
      products: this.productsInCart
    };

    // Call the order service to create the order
    this.orderService.createOrder(order).subscribe(res => {
        // Reset the form and update the added status
        this.form.reset();
        this.added = 'Заказ сделан';
        // Set submitted flag to false
        this.submitted = false;

      }
    );

  }

  /**
   * Remove a product from the cart and update the total price
   * @param product - The product to be removed from the cart
   */
  deleteFromCart(product: ProductModel) {
    // Update the total price by subtracting the price of the removed product
    this.totalPrice -= +product.price;

    // Remove the product from the products in the cart
    this.productsInCart.splice(this.productsInCart.indexOf(product), 1);
  }

}
