import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {OrderModel} from "../models/order.model";

export const OrderActions = createActionGroup({
  source: 'Order',
  events: {
    'Load Orders':  emptyProps(),
    'Success Load Orders':  props<{ orders: OrderModel[] }>(),
    'Create Order': emptyProps(),
  }
});

OrderActions.loadOrders();
OrderActions.successLoadOrders({orders: []})
