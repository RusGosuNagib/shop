 import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
 import {AuthService} from "../auth.service";
 import {ProductService} from "../product.service";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  type = 'Tshirts'
  constructor(
    private router: Router,
    private productService: ProductService,
  ){}
  ngOnInit(){}

  setType(type: string){
    this.type = type;
    if(this.type !== 'Cart'){
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type
        }
      });
      this.productService.setType(this.type);
    }
  }




}
