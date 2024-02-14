import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../common/product.service";
import {map, switchMap} from "rxjs";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductModel} from "../../models/product.model";
import {NgIf} from "@angular/common";
import {QuillEditorComponent} from "ngx-quill";
import {FileUpload} from "../../common/utils/fileUpload";

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    NgIf,
    QuillEditorComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss'
})

export class EditPageComponent {

  form: FormGroup;
  product: ProductModel;
  submitted: boolean;
  private prodId: string;
  uploader: FileUpload;
  uploadStatus: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
  }


  ngOnInit(): void {
    this.route.params.pipe(switchMap(params => {
        this.prodId = params['id'];
        return this.productService.getById(params['id']);
      })
    ).subscribe(product => {
        this.product = product
        this.form = new FormGroup({
          // photo: new FormControl(this.product.photo, Validators.required),
          photo: new FormControl('', Validators.required),
          type: new FormControl(this.product.type, Validators.required),
          title: new FormControl(this.product.title, Validators.required),
          info: new FormControl(this.product.info, Validators.required),
          price: new FormControl(this.product.price, Validators.required),
        })
      }
    )
  }

  handleFiles($event: Event) {
    this.uploadStatus = false;
    this.uploader = new FileUpload();
    this.uploader.uploadBase64($event, this.uploadStatus)
    let file
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;


    this.productService.updateProduct(
      {
        ...this.product,
        id: this.prodId,
        type: this.form.value.type,
        title: this.form.value.title,
        photo: this.form.value.photo,
        info: this.form.value.info,
        price: this.form.value.price,
        date: new Date().toString()
      }
    ).subscribe(product => {
      this.submitted = false;
      this.router.navigate(['/admin', 'dashboard'])
    })
  }

  protected readonly console = console;
}
