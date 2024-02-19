import {Component, OnInit} from '@angular/core';
import {ProductService} from "../common/product.service";
import {Observable} from "rxjs";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {ProductModel} from "../models/product.model";
import {ProductComponent} from "../common/components/product/product.component";
import {SortingPipe} from "../common/sorting.pipe";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, ProductComponent, SortingPipe,],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {

  products$: Observable<ProductModel[]>;

  /**
   * Constructs a new instance of the class.
   * @param productService - The product service to be injected.
   */
  constructor(
    protected productService: ProductService
  ) {
  }

  /**
   * Initializes the component
   */
  ngOnInit(): void {
    // Retrieves all products and assigns the result to the products$ variable
    this.products$ = this.productService.getAll();
  }

  protected readonly console = console;
}
