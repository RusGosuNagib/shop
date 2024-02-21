import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {OrderModel} from "../models/order.model";

export const OrderActions = createActionGroup({
  source: 'Order',
  events: {
    'Load Orders':  emptyProps(),
    'Success Load Orders':  props<{ orders: OrderModel[] }>(),
    'Create Order': emptyProps(),
    'Remove Order': props<{ id: string }>(),
    'Success Remove Order':  props<{ id: string }>(),
  }
});

OrderActions.loadOrders();
OrderActions.successLoadOrders({orders: []})
OrderActions.removeOrder({id: ''})
OrderActions.successRemoveOrder({id: ''})


