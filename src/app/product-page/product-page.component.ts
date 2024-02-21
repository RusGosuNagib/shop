import {Component, OnInit} from '@angular/core';
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
import {loadProducts} from "../store/product.actions";
import {CartActions} from "../store/cart.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    NgIf,
    CKEditorModule,
    PaginatorModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    SkeletonModule,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit {

  product$: Observable<ProductModel>

  /**
   * Constructor for initializing ProductService and ActivatedRoute
   * @param productService - instance of ProductService
   * @param route - instance of ActivatedRoute
   * @param store
   */
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private store: Store<{ products: ProductModel[] }>,
  ) {
  }

  /**
   * Initialize the component
   */
  ngOnInit() {
    // Subscribe to route params and fetch product by ID
    this.product$ = this.route.params.pipe(
      switchMap(params => this.productService.getById(params['id']))
    );
  }

  /**
   * Add a product to the cart.
   *
   * @param product - The product to be added to the cart.
   */
  addToCart(product: ProductModel) {
    // this.productService.addProductToCart(product);
    this.store.dispatch(CartActions.addToCart({product}));
  }


  protected readonly Editor = Editor;
}
