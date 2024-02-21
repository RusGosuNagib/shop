import {createSelector} from '@ngrx/store';
import {ProductModel} from "../models/product.model";

export interface AppState {
  cart: ProductModel[];
}

export const selectCart = (state: AppState) => state.cart;

export const selectTotalPrice = createSelector(
  selectCart,
  (state: ProductModel[]) => {
    return state.reduce((total, product) => total + +product.price, 0);
  }
);
// this.totalPrice = this.productsInCart.reduce((total, product) => total + +product.price, 0);
