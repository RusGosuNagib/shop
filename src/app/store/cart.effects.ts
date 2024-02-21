import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, exhaustMap, map} from "rxjs";
import {ProductService} from "../common/product.service";
import {CartActions} from "./cart.actions";
import {ProductModel} from "../models/product.model";
import {OrderActions} from "./order.actions";

@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {}
}
