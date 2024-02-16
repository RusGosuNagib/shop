import {Component} from '@angular/core';
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

  /**
   * Constructor for creating an instance of the class
   * @param router - the router for navigating between views
   * @param productService - the service for managing product data
   */
  constructor(
    private router: Router,
    private productService: ProductService,
  ) {
  }


  /**
   * Set the type of the product
   * @param type - The type of the product
   */
  setType(type: string) {
    this.type = type;
    // Redirect to the homepage with query param if the type is not 'Cart'
    if (this.type !== 'Cart') {
      this.router.navigate(['/'], {
        queryParams: {
          type: this.type
        }
      });
      // Set the type in the productService
      this.productService.setType(this.type);
    }
  }


}
