import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ProductService} from "../../common/product.service";
import {ProductModel} from "../../models/product.model";
import {Subscription} from "rxjs";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {SearchPipe} from "../../common/search.pipe";
import { TableModule } from 'primeng/table';
import {ButtonModule} from "primeng/button";
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import {InputTextModule} from "primeng/inputtext";
import { ImageModule } from 'primeng/image';
import {CardModule} from "primeng/card";



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink, CommonModule, FormsModule, SearchPipe, TableModule, ButtonModule, RatingModule, TagModule, InputTextModule, ImageModule, CardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  products: ProductModel[] = []
  pSub: Subscription;
  rSub: Subscription;
  productName: string;

  constructor(
    private router: Router,
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.pSub = this.productService.getAll().subscribe(products => {
      this.products = products;
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
    this.rSub = this.productService.removeProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id)
    })
  }

  protected readonly console = console;
}
