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

  constructor(
    protected productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.products$ = this.productService.getAll()
  }


  protected readonly console = console;
}
