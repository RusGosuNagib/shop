import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../common/order.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ProductService} from "../../common/product.service";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ImageModule} from "primeng/image";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {ProductModel} from "../../models/product.model";
import {OrderModel} from "../../models/order.model";
import {Store} from "@ngrx/store";
import {loadProducts} from "../../store/product.actions";
import {OrderActions} from "../../store/order.actions";


@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, ImageModule, SharedModule, TableModule, CardModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent implements OnInit, OnDestroy {

  orders: any[] = []
  pSub: Subscription;
  rSub: Subscription;
  orders$: Observable<OrderModel[]> = this.store.select(state => state.orders);


  protected readonly console = console;

  /**
   * Constructor for initializing OrderService
   * @param orderService - the OrderService instance
   * @param store
   */
  constructor(
    private orderService: OrderService,
    private store: Store<{ orders: OrderModel[] }>,
  ) {
  }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {
    this.store.dispatch(OrderActions.loadOrders());
  }

  /**
   * Unsubscribe from observables to prevent memory leaks when the component is destroyed.
   */
  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  /**
   * Remove an order by its ID
   * @param id - The ID of the order to be removed
   */
  remove(id: string) {
    // Unsubscribe to previous subscriptions
    if (this.rSub) {
      this.rSub.unsubscribe();
    }

    // Call the order service to remove the order
    this.rSub = this.orderService.removeOrder(id).subscribe(() => {
      // Update the orders list after removing the order
      this.orders = this.orders.filter(order => order.id !== id);
    });
  }

}
