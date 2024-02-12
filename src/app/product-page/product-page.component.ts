import { Component } from '@angular/core';
import {ProductService} from "../common/product.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {ProductModel} from "../models/product.model";
import {QuillViewHTMLComponent} from "ngx-quill";
import {CommonModule, NgIf} from "@angular/common";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    QuillViewHTMLComponent,
    RouterLink, CommonModule, NgIf
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

  product$: Observable<ProductModel>
  loading: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
    this.product$ = this.route.params
      .pipe( switchMap (params => {
        return this.productService.getById(params['id']);
      }))
  }
}
