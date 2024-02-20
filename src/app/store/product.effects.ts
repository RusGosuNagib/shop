import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductService} from "../common/product.service";
import {catchError, EMPTY, exhaustMap, map} from "rxjs";
import {
  createProduct,
  getProductById,
  loadProducts,
  removeProduct,
  successCreateProduct,
  successGetProductById,
  successLoadProducts,
  successRemoveProduct,
  successUpdateProduct, updateProduct
} from "./product.actions";

@Injectable()
export class ProductEffects {

  loadProduct$ = createEffect(() => this.actions$.pipe(
      ofType(loadProducts),
      exhaustMap(() => this.productService.getAll()
        .pipe(
          map(products => successLoadProducts({products})),
          catchError(() => EMPTY)
        ))
    )
  );

  removeProduct$ = createEffect(() => this.actions$.pipe(
      ofType(removeProduct),
      map((action) => action.id),
      exhaustMap((id) => this.productService.removeProduct(id)
        .pipe(
          map(products => successRemoveProduct({id})),
          catchError(() => EMPTY)
        ))
    )
  );

  getProductById$ = createEffect(() => this.actions$.pipe(
      ofType(getProductById),
      map((action) => action.id),
      exhaustMap((id) => this.productService.getById(id)
        .pipe(
          map(products => successGetProductById({product: products})),
          catchError(() => EMPTY)
        ))
    )
  );

  addProduct$ = createEffect(() => this.actions$.pipe(
      ofType(createProduct),
      map((action) => action.product),
      exhaustMap((product) => this.productService.createProduct(product)
        .pipe(
          map(products => successCreateProduct({product: product})),
          catchError(() => EMPTY)
        ))
    )
  );

  updateProduct$ = createEffect(() => this.actions$.pipe(
      ofType(updateProduct),
      map((action) => action.product),
      exhaustMap((product) => this.productService.updateProduct(product)
        .pipe(
          map(products => successUpdateProduct({product: product})),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {
  }
}
