import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {QuillModule} from "ngx-quill";
import {ProductService} from "../../common/product.service";

@Component({
  selector: 'app-add-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './add-page.component.html',
  styleUrl: './add-page.component.scss'
})
export class AddPageComponent {

  form: FormGroup;
  submitted = false;
  constructor(
    public productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    })


  }
    submit(){
      if (this.form.invalid){
        return
      }
      // this.submitted = true;
      const product = {
        type: this.form.value.type,
        title: this.form.value.title,
        photo: this.form.value.photo,
        info: this.form.value.info,
        price: this.form.value.price,
        data: new Date()
      }


  this.productService.createProduct(product).subscribe(res=>console.log(res))

    }
}
