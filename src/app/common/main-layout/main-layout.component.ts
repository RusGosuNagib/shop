import {Component, HostListener, Inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../auth.service";
import {ProductService} from "../product.service";
import {DOCUMENT} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  animations: [
    trigger('fade',
      [
        state('void', style({opacity: 0})),
        transition(':enter', [animate(300)]),
        transition(':leave', [animate(500)]),
      ]
    )]
})
export class MainLayoutComponent {

  type: number = 1

  /**
   * Constructor for creating an instance of the class
   * @param document
   * @param router - the router for navigating between views
   * @param productService - the service for managing product data
   */
  constructor(
    @Inject(DOCUMENT) document: Document,
    private router: Router,
    private productService: ProductService,
  ) {
  }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: Event) {
    if (window.pageYOffset > 99) {
      let element = document.getElementById('header');
      element.classList.add('sticky');
    } else {
      let element = document.getElementById('header');
      element.classList.remove('sticky');
    }
  }


  /**
   * Set the type of the product
   * @param type - The type of the product
   */
  setType(type: number) {
    this.type = type;
    // Redirect to the homepage with query param if the type is not 'Cart'
    if (this.type !== 99) {
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
