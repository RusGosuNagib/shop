import {Component, Input} from '@angular/core';
import {ProductModel} from "../../../models/product.model";
import {QuillViewHTMLComponent} from "ngx-quill";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    QuillViewHTMLComponent,
    RouterLink
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})

export class ProductComponent {
  @Input()
  product: ProductModel;
}
