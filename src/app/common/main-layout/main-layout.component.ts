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
  mobileMenuActive: boolean = false
  menuButton: HTMLElement;
  header: HTMLElement;
  menuItems: HTMLElement;

  /**
   * Constructor for creating an instance of the class
   * @param document - the Document object
   * @param router - the Router object for navigating between views
   * @param productService - the ProductService object for managing product data
   */
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private productService: ProductService,
  ) {
  }

  // Initialize the component
  ngOnInit() {
    // Get the menu button, header, and menu items elements
    this.menuButton = document.getElementById('menu-button');
    this.header = document.getElementById('header');
    this.menuItems = document.getElementById('menu-items');

    // Add click event listener to the menu button to toggle the mobile menu
    this.menuButton.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
    // Call the resize handler functionv
    this.resizeHandler()
  }

  /**
   * Handles the window scroll event to add or remove the 'sticky' class from the header element.
   * @param $event - The scroll event object
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: Event) {
    if (window.scrollY > 99) {
      let element = document.getElementById('header');
      element.classList.add('sticky'); // Add 'sticky' class when scroll position is greater than 99
    } else {
      let element = document.getElementById('header');
      element.classList.remove('sticky'); // Remove 'sticky' class when scroll position is less than or equal to 99
    }
  }

  /**
   * Handles the window resize event
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.resizeHandler()
  }

  /**
   * Handle the resizing of the window to adjust the mobile menu and header elements
   */
  resizeHandler() {
    if (window.innerWidth < 1025) {
      // Activate mobile menu
      this.mobileMenuActive = true;
      this.header.classList.add('mobile_active');
      this.menuButton.classList.remove('hidden');
      this.menuItems.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    } else {
      // Deactivate mobile menu
      this.mobileMenuActive = false;
      this.header.classList.remove('mobile_active');
      this.menuButton.classList.add('hidden');
      this.menuItems.classList.remove('hidden');
    }
  }

  /**
   * Toggles the mobile menu and updates the header class accordingly
   */
  toggleMobileMenu() {
    if (this.mobileMenuActive) {
      this.header.classList.add('menu_active');
    } else {
      this.header.classList.remove('menu_active');
    }
    this.mobileMenuActive = !this.mobileMenuActive;
  }
  closeMobileMenu() {
      this.header.classList.remove('menu_active');
    this.mobileMenuActive = true
  }

  /**
   * Set the type of the product
   * @param type - The type of the product
   */
  setType(type: number) {
    // Set the type of the product
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
