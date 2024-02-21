import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {ProductModel} from "../models/product.model";

export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    // 'Load Cart': emptyProps(),
    // 'Load Cart Success': props<{ data: unknown }>(),
    'Add to cart': props<{product: ProductModel}>(),
    'Delete From Cart': props<{product: ProductModel}>(),
  }
});

CartActions.addToCart({product: {}});
CartActions.deleteFromCart({product: {}});
