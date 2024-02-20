import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, EMPTY, exhaustMap, map} from "rxjs";
import {OrderService} from "../common/order.service";
import {OrderActions} from "./order.actions";
import {OrderModel} from "../models/order.model";



@Injectable()
export class OrderEffects {

  loadOrders$ = createEffect(() => this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      exhaustMap(() => this.orderService.getAll()
        .pipe(
          map(orders => OrderActions.successLoadOrders({orders})),
          catchError(() => EMPTY)
        ))
    )
  );


  constructor(
    private actions$: Actions,
    private orderService: OrderService) {}
}
