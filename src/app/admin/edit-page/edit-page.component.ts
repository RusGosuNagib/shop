import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../common/product.service";
import {switchMap} from "rxjs";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProductModel} from "../../models/product.model";
import {NgIf} from "@angular/common";
import {QuillEditorComponent} from "ngx-quill";
import {FileUpload} from "../../common/utils/fileUpload";
import Editor from "@ckeditor/ckeditor5-build-classic";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

@Component({
  selector: 'app-edit-page',
  standalone: true,
  imports: [
    NgIf,
    QuillEditorComponent,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule
  ],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.scss'
})

export class EditPageComponent implements OnInit {

  form: FormGroup;
  product: ProductModel;
  submitted: boolean;
  private prodId: string;
  uploader: FileUpload;
  uploadedFile: string;
  isLoading: boolean = false;

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
    ).subscribe((product: ProductModel) => {
        this.product = product
        this.uploadedFile = product.photo;
        this.form = new FormGroup({
          photo: new FormControl(''),
          type: new FormControl(this.product.type, Validators.required),
          title: new FormControl(this.product.title, Validators.required),
          info: new FormControl(this.product.info, Validators.required),
          price: new FormControl(this.product.price, Validators.required),
        })
      }
    )
  }

  handleFiles($event: Event) {
    this.isLoading = true
    this.uploader = new FileUpload();
     this.uploader.uploadBase64($event).subscribe((file: string) =>{
       this.uploadedFile = file;
       this.isLoading = false
    })

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
        photo: this.uploadedFile,
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
    protected readonly Editor = Editor;
}
