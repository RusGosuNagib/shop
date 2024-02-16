import {Component, forwardRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../common/product.service";
import {switchMap} from "rxjs";
import {FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductModel} from "../../models/product.model";
import {NgIf} from "@angular/common";
import {FileUpload} from "../../common/utils/fileUpload";
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
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    CardModule,
    ProgressBarModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => photo),
      multi: true,
    }
  ]
})

export class EditPageComponent implements OnInit {

  form: FormGroup;
  product: ProductModel;
  submitted: boolean;
  private prodId: string;
  uploader: FileUpload;
  uploadedFile: string;
  isLoading: boolean = false;
  typesOfProducts: { name: string; value: string; }[];

  /**
   * Constructor for initializing the class
   *
   * @param route - The route object for accessing the activated route
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

    // Get the product ID from the route parameters and fetch the product data
    this.route.params.pipe(switchMap(params => {
        this.prodId = params['id'];
        return this.productService.getById(params['id']);
      })
    ).subscribe((product: ProductModel) => {
        // Set the product and uploadedFile properties
        this.product = product;
        this.uploadedFile = product.photo;
        // Set up the form with the fetched product data
        this.form = new FormGroup({
          photo: new FormControl(''),
          type: new FormControl(this.product.type, Validators.required),
          title: new FormControl(this.product.title, Validators.required),
          info: new FormControl(this.product.info, Validators.required),
          price: new FormControl(this.product.price, Validators.required),
        });
      }
    );
  }

  /**
   * Handle the selected files
   * @param $event - The event containing the selected files
   */
  handleFiles($event: FileSelectEvent) {
    // Set isLoading to true while the file is being uploaded
    this.isLoading = true;

    // Create a new FileUpload instance
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

    // Update the product using the product service
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
  }

  protected readonly console = console;
  protected readonly Editor = Editor;
}
