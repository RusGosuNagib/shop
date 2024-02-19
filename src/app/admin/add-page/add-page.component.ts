import {Component} from '@angular/core';
import {ProductFormComponent} from "../common/product-form/product-form.component";

@Component({
  selector: 'app-add-page',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.scss'
})
export class AddPageComponent {}
