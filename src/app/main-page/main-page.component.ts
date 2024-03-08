import {Component, OnInit} from '@angular/core';
import {ProductService} from "../common/product.service";
import {map, Observable} from "rxjs";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {ProductModel} from "../models/product.model";
import {ProductComponent} from "../common/components/product/product.component";
import {SortingPipe} from "../common/sorting.pipe";
import {GuardsCheckEnd, Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, ProductComponent, SortingPipe,],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {

  products$: Observable<ProductModel[]>;
  firstProductsLine$: Observable<ProductModel[]>;
  secondProductsLine$: Observable<ProductModel[]>;
  limitFirstLine = 4;
  limitSecondLine = 8;
  type: number = 1

  /**
   * Constructs a new instance of the class.
   * @param productService - The product service to be injected.
   * @param router
   */
  constructor(
    protected productService: ProductService,
    private router: Router
  ) {
    router.events.subscribe((event) => {

      if (event instanceof GuardsCheckEnd) {
        this.type = Number(event.url.replace(/^\D+/g, ''))
        this.productService.setType(this.type)
        this.updateProducts();
      }
    })
  }

  /**
   * Initializes the component
   */
  ngOnInit(): void {
    // Retrieves all products and assigns the result to the products$ variable
    this.products$ = this.productService.getAll();

    this.updateFirstProductsLine();
    this.updateSecondProductsLine();
  }

  /**
   * Fetches the first line of products
   */
  updateFirstProductsLine() {
    this.firstProductsLine$ = this.productService.getPaginateProducts(this.limitFirstLine, 0);
  }

  /**
   * Fetches the second line of products
   */
  updateSecondProductsLine() {
    this.secondProductsLine$ = this.productService.getPaginateProducts(this.limitSecondLine, this.limitFirstLine);
    console.log(this.secondProductsLine$.pipe( map(data => data.length)))
  }

  /**
   * Updates the products by fetching the first and second lines of products.
   */
  updateProducts() {
    this.updateFirstProductsLine();
    this.updateSecondProductsLine();
  }

  protected readonly console = console;
}
