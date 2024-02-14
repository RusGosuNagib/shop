import {Component} from '@angular/core';
import {ProductService} from "../common/product.service";
import {Router} from "@angular/router";
import {ProductModel} from "../models/product.model";
import {CommonModule} from "@angular/common";
import {QuillEditorComponent} from "ngx-quill";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {OrderService} from "../common/order.service";
import {OrderModel} from "../models/order.model";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    CommonModule,
    QuillEditorComponent,
    ReactiveFormsModule
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent {

  productsInCart: ProductModel[] = [];
  totalPrice = 0;
  form: FormGroup;
  submitted = false;
  added='';

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
  ) {
  }

  ngOnInit(): void {
    this.productsInCart = this.productService.productsInCart
    for (let index = 0; index < this.productsInCart.length; index++) {
      this.totalPrice += +this.productsInCart[index].price;
    }
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      payment: new FormControl('Cash'),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;
    const order: OrderModel = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      price: this.totalPrice,
      date: new Date().toString(),
      products: this.productsInCart
    }

    this.orderService.createOrder(order).subscribe(res => {
        this.form.reset();
        this.added = 'Заказ сделан'
        this.submitted = false;

      }
    )

  }

  deleteFromCart(product: ProductModel) {
    this.totalPrice -= +product.price;
    this.productsInCart.splice(this.productsInCart.indexOf(product), 1);
  }

}
