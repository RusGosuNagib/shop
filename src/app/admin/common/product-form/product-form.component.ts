import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../common/product.service";
import {switchMap} from "rxjs";
import {FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductModel} from "../../../models/product.model";
import {NgIf} from "@angular/common";
import {FileUpload} from "../../../common/utils/fileUpload";
import Editor from "@ckeditor/ckeditor5-build-classic";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {CardModule} from "primeng/card";
import {ProgressBarModule} from "primeng/progressbar";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {FileSelectEvent, FileUploadEvent, FileUploadModule} from "primeng/fileupload";

let photo: any;

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CKEditorModule,
    CardModule,
    DropdownModule,
    FileUploadModule,
    FormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    NgIf,
    ProgressBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => photo),
      multi: true,
    }
  ]
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  product: ProductModel;
  submitted: boolean;
  private prodId: string;
  uploader: FileUpload;
  uploadedFile: string;
  isLoading: boolean = false;
  typesOfProducts: { name: string; value: string; }[];
  protected readonly console = console;
  protected readonly Editor = Editor;
  @Input() isEdit!: boolean;

  /**
   * Initializes the class with dependencies.
   *
   * @param route - The activated route object for accessing route information
   * @param productService - The service for product-related operations
   * @param router - The router object for navigation
   */
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
  }



  /**
   * Initializes the component and sets up the form and product data.
   */
  ngOnInit(): void {
    // Define the types of products
    this.typesOfProducts = [
      {name: 'Футболки', value: 'Tshirts'},
      {name: 'Обувь', value: 'Shoes'},
      {name: 'Аксессуары', value: 'Accessories'},
    ];

    if (this.isEdit) {
      // Fetch the product data for editing
      this.route.params.pipe(switchMap(params => {
          this.prodId = params['id'];
          return this.productService.getById(params['id']);
        })
      ).subscribe((product: ProductModel) => {
          // Set the product and uploadedFile properties
          this.product = product;
          this.uploadedFile = product.photo;
          // Set up the form with the fetched product data
          this.setupForm(this.product);
        }
      );
    } else {
      // Set up a new form for adding a product
      this.setupForm();
    }
  }

  /**
   * Sets up the form with product data for editing, or creates a new form for adding a product.
   * @param product - The product data to pre-fill the form with (optional, for editing mode).
   */
  setupForm(product?: ProductModel): void {
    this.form = new FormGroup({
      photo: new FormControl(product ? product.photo : ''),
      type: new FormControl(product ? product.type : null, Validators.required),
      title: new FormControl(product ? product.title : null, Validators.required),
      info: new FormControl(product ? product.info : null, Validators.required),
      price: new FormControl(product ? product.price : null, Validators.required),
    });
  }

  /**
   * Handle the selected files and upload them
   * @param $event - The event containing the selected files
   */
  handleFiles($event: FileSelectEvent) {
    // Set isLoading to true while the file is being uploaded
    this.isLoading = true;

    // Create a new instance of FileUpload class
    this.uploader = new FileUpload();

    // Upload the selected file as base64 and subscribe to the result
    this.uploader.uploadBase64($event).subscribe((file: string) => {
      // Set the uploaded file to the result
      this.uploadedFile = file;
      // Set isLoading to false after the file is uploaded
      this.isLoading = false;
    });
  }

  /**
   * Submits the form data after validation
   */
  submit() {
    // Check if the form is invalid
    if (this.form.invalid) {
      return;
    }

    // Set the submitted flag to true
    this.submitted = true;

    if (this.isEdit) {
      // Update the existing product
      this.productService.updateProduct({
        ...this.product,
        id: this.prodId,
        type: this.form.value.type,
        title: this.form.value.title,
        photo: this.uploadedFile,
        info: this.form.value.info,
        price: this.form.value.price,
        date: new Date().toString()
      }).subscribe(product => {
        // Set the submitted flag to false after update
        this.submitted = false;
        // Navigate to the admin dashboard after successful update
        this.router.navigate(['/admin', 'dashboard']);
      });
    } else {
      // Create a new product
      const product: ProductModel = {
        type: this.form.value.type,
        title: this.form.value.title,
        photo: this.uploadedFile,
        info: this.form.value.info,
        price: this.form.value.price,
        date: new Date().toString()
      };
      this.productService.createProduct(product).subscribe(res => {
          // Reset the form and mark it as not submitted
          // this.form.reset()
          // this.submitted = false
          // // Navigate to the home page
          // this.router.navigate(['/'])
        }
      )
    }
  }

}