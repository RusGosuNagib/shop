import {Component} from '@angular/core';
import {ProductService} from "../common/product.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {ProductModel} from "../models/product.model";
import {CommonModule, NgIf} from "@angular/common";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import Editor from "@ckeditor/ckeditor5-build-classic";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    RouterLink, CommonModule, NgIf, CKEditorModule, PaginatorModule, ReactiveFormsModule, CardModule, ButtonModule, SkeletonModule
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

  product$: Observable<ProductModel>

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.product$ = this.route.params
      .pipe(switchMap(params => {
        return this.productService.getById(params['id']);
      }))
  }

  addToCart(product: ProductModel) {
    this.productService.addProductsToCart(product)
  }


  protected readonly Editor = Editor;
}
