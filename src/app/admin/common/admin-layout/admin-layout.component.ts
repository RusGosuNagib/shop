import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../../../common/auth.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  /**
   * Constructor for initializing the AuthService and Router
   * @param auth - The authentication service
   * @param router - The router for navigation
   */
  constructor(
    public auth: AuthService,
    private router: Router,
  ) {
  }

  /**
   * Handles the logout event.
   * @param {MouseEvent} event - The mouse event triggering the logout.
   */
  logout(event: MouseEvent): void {
    // Prevent the default action of the event
    event.preventDefault();

    // Logout the user
    this.auth.logout();

    // Navigate to the admin login page
    this.router.navigate(['/admin', 'login']);
  }
}
