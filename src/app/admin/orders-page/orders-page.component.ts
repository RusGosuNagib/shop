import { Component } from '@angular/core';
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
export class OrdersPageComponent {

  orders: any[] = []
  pSub: Subscription;
  rSub: Subscription;

  protected readonly console = console;

  constructor(
    private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    this.pSub = this.orderService.getAll().subscribe( orders =>{
      this.orders = orders;
    })
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  remove(id: string) {
    this.rSub = this.orderService.removeOrder(id).subscribe(()=>{
      this.orders = this.orders.filter( order => order.id !== id)
    })
  }


}
