import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../common/order.service";
import {Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {ImageModule} from "primeng/image";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {OrderModel} from "../../models/order.model";
import {Store} from "@ngrx/store";
import {OrderActions} from "../../store/order.actions";


@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, ImageModule, SharedModule, TableModule, CardModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent implements OnInit {

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

  ngOnInit(): void {
    this.store.dispatch(OrderActions.loadOrders());
  }

  remove(id: number) {

    this.store.dispatch(OrderActions.removeOrder({id}));

  }

}
