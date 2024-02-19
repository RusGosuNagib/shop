import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ProductService} from "../../common/product.service";
import {ProductModel} from "../../models/product.model";
import {Subscription} from "rxjs";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SearchPipe} from "../../common/search.pipe";
import {TableModule} from 'primeng/table';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {ImageModule} from 'primeng/image';
import {CardModule} from "primeng/card";

export class OpenCloseComponent {
  isOpen = true;

  /**
   * Toggles the isOpen property
   */
  toggle() {
    this.isOpen = !this.isOpen;
  }
}

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
export class DashboardComponent implements OnInit, OnDestroy {

  products: ProductModel[] = []
  pSub: Subscription;
  rSub: Subscription;
  productName: string;

  /**
   * Constructor for initializing the router and productService
   * @param router - The router for navigating between routes
   * @param productService - The service for managing product data
   */
  constructor(
    private router: Router,
    private productService: ProductService,
  ) {
  }

  /**
   * Initialize the component
   */
  ngOnInit(): void {
    // Subscribe to the product service to get all products
    this.pSub = this.productService.getAll().subscribe(products => {
      // Update the products property with the retrieved products
      this.products = products;
    })
  }

  /**
   * Lifecycle hook that is called when the component is destroyed
   */
  ngOnDestroy(): void {
    // Unsubscribe from the 'pSub' subscription if it exists
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    // Unsubscribe from the 'rSub' subscription if it exists
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  /**
   * Removes a product by ID
   * @param id - The ID of the product to remove
   */
  remove(id: string) {
    // Unsubscribe from previous subscription to prevent memory leaks
    this.rSub = this.productService.removeProduct(id).subscribe(() => {
      // Filter out the product with the matching ID
      this.products = this.products.filter(product => product.id !== id)
    })
  }

  protected readonly console = console;
}
