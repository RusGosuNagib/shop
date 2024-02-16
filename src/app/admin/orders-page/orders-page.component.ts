import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../common/order.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ProductService} from "../../common/product.service";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent implements OnInit, OnDestroy {

  orders: any[] = []
  pSub: Subscription;
  rSub: Subscription;

  protected readonly console = console;

  /**
   * Constructor for initializing OrderService
   * @param orderService - the OrderService instance
   */
  constructor(
    private orderService: OrderService,
  ) {
  }

  /**
   * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {
    /**
     * Subscribe to the order service to get all orders and update the component's orders property.
     */
    this.pSub = this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
    })
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
