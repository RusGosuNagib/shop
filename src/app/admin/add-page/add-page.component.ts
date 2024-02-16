import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ProductService} from "../../common/product.service";
import {Router} from "@angular/router";
import {ProductModel} from "../../models/product.model";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Editor from "@ckeditor/ckeditor5-build-classic";
import {CardModule} from "primeng/card";

@Component({
  selector: 'app-add-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CKEditorModule, CardModule],
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.scss'
})

export class AddPageComponent {

  form: FormGroup;
  submitted = false;
  public Editor = ClassicEditor;

  /**
   * Constructor for initializing ProductService and Router
   * @param productService - instance of ProductService
   * @param router - instance of Router
   */
  constructor(
    public productService: ProductService,
    private router: Router,
  ) {
  }

  /**
   * Initializes the form with required form controls.
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      // Type of the item
      type: new FormControl(null, Validators.required),
      // Title of the item
      title: new FormControl(null, Validators.required),
      // Photo of the item
      photo: new FormControl(null, Validators.required),
      // Information about the item
      info: new FormControl(null, Validators.required),
      // Price of the item
      price: new FormControl(null, Validators.required),
    })
  }

  /**
   * Submits the form data to create a new product
   */
  submit() {
    // Check if the form is invalid
    if (this.form.invalid) {
      return
    }
    // Mark the form as submitted
    this.submitted = true;
    // Create a new product object
    const product: ProductModel = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date().toString()
    }

    // Call the productService to create the product
    this.productService.createProduct(product).subscribe(res => {
        // Reset the form and mark it as not submitted
        this.form.reset()
        this.submitted = false
        // Navigate to the home page
        this.router.navigate(['/'])
      }
    )

  }
}
