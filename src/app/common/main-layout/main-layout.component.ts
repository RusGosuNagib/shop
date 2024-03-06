import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../auth.service";
import {ProductService} from "../product.service";
import {DOCUMENT, NgOptimizedImage} from "@angular/common";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonModule, NgOptimizedImage],
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
export class MainLayoutComponent implements OnInit {

  type: number = 1
  mobileActive: boolean = false
  menuButton: HTMLElement;
  header: HTMLElement;
  menuItems: HTMLElement;

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
    this.menuButton = document.getElementById('menu-button');
    this.header = document.getElementById('header');
    this.menuItems = document.getElementById('menu-items');
    this.menuButton.addEventListener('click', () => {
      this.showMenu();
    });
    this.resizeHandler()
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

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.resizeHandler()
  }

  resizeHandler() {
    if (window.innerWidth < 1025) {
      this.mobileActive = true;
      this.header.classList.add('mobile-active');
      this.menuButton.classList.remove('hidden');

    } else {
      this.mobileActive = false;
      this.header.classList.remove('mobile-active');
      this.menuButton.classList.add('hidden');
      this.menuItems.classList.remove('hidden');
    }
  }

  showMenu() {
    console.log('click')
    if (this.mobileActive) {
      this.header.classList.add('menu_active');
    }else {
      this.header.classList.remove('menu_active');
    }
    this.mobileActive = !this.mobileActive;

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
