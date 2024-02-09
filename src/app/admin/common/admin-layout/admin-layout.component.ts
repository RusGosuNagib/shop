import { Component } from '@angular/core';
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

  constructor(
    public auth: AuthService,
    private router: Router,
  ){}

  logout(event: MouseEvent){
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
