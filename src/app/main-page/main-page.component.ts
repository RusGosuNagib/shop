import {Component, OnInit} from '@angular/core';
import {ProductService} from "../common/product.service";
import {Observable} from "rxjs";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {ProductModel} from "../models/product.model";
import {ProductComponent} from "../common/components/product/product.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, ProductComponent,],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})

export class MainPageComponent implements OnInit{

  products$: Observable<ProductModel[]>;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit(): void {
   this.products$ = this.productService.getAll()
  }


}
