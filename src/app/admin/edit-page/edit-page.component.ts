import {Component} from '@angular/core';
import {ProductFormComponent} from "../common/product-form/product-form.component";

@Component({
    selector: 'edit-page',
    standalone: true,
    imports: [
      ProductFormComponent
    ],
    templateUrl: './edit-page.component.html',
    styleUrl: './edit-page.component.scss'
  })
  export class EditPageComponent {}
