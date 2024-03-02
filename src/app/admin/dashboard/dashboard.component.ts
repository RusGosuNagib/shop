import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ProductModel} from "../../models/product.model";
import {Observable} from "rxjs";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SearchPipe} from "../../common/search.pipe";
import {TableModule} from 'primeng/table';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ImageModule} from 'primeng/image';
import {CardModule} from "primeng/card";
import {Store} from "@ngrx/store";
import {loadProducts, removeProduct} from "../../store/product.actions";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    SearchPipe,
    TableModule,
    ButtonModule,
    InputTextModule,
    ImageModule,
    CardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {

  products: ProductModel[] = []
  productName: string;
  products$: Observable<ProductModel[]> = this.store.select(state => state.products);

  /**
   * Constructor for initializing the router and productService
   * @param router - The router for navigating between routes
   * @param store - The service for hz
   */
  constructor(
    private router: Router,
    private store: Store<{ products: ProductModel[] }>,
  ) {
  }

  /**
   * Initialize the component
   */
  ngOnInit(): void {
    // Dispatch an action to load products
    this.store.dispatch(loadProducts());
  }

  /**
   * Removes a product by ID
   * @param id - The ID of the product to remove
   */
  remove(id: number): void {
    this.store.dispatch(removeProduct({id: id}));
  }

}
