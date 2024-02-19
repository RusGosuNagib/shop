import {Component, OnInit} from '@angular/core';
import {ProductService} from "../common/product.service";
import {ProductModel} from "../models/product.model";
import {CommonModule} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {OrderService} from "../common/order.service";
import {OrderModel} from "../models/order.model";
import {ButtonModule} from "primeng/button";
import {ImageModule} from "primeng/image";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {RouterLink} from "@angular/router";
import {CardModule} from "primeng/card";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {InputMaskModule} from "primeng/inputmask";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    ImageModule,
    SharedModule,
    TableModule,
    RouterLink,
    CardModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule
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
  paymentType: { name: string; value: string; }[];

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
   * Initializes the component and form.
   */
  ngOnInit(): void {
    // Initialize payment type options
    this.paymentType = [
      {name: 'Карта', value: 'Card'},
      {name: 'Наличные', value: 'Cash'},
    ];

    // Initialize products in cart
    this.productsInCart = this.productService.productsInCart;

    // Calculate total price of products in cart
    this.totalPrice = this.productsInCart.reduce((total, product) => total + +product.price, 0);

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

  protected readonly console = console;
}
