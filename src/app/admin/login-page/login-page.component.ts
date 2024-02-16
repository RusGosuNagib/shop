import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../common/auth.service";
import {Router} from "@angular/router";
import {UserModel} from "../../models/user.model";
import {CardModule} from 'primeng/card';
import {ButtonModule} from "primeng/button";
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {ImageModule} from "primeng/image";
import {StyleClassModule} from 'primeng/styleclass';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ImageModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup
  submitted = false

  /**
   * Constructor for creating a new instance of the MyClass.
   * @param auth - The authentication service.
   * @param router - The router service.
   */
  constructor(
    public auth: AuthService,
    private router: Router
  ) {
  }

  /**
   * Initialize the login form with email and password fields
   */
  ngOnInit() {
    this.loginForm = new FormGroup({
      /** Email input with required and email validators */
      email: new FormControl(' ', [Validators.required, Validators.email]),
      /** Password input with required and min length validators */
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  /**
   * Submits the login form if it is valid
   */
  submit() {
    // Check if the login form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // Set submitted flag to true
    this.submitted = true;
    // Create user object with form values
    const user: UserModel = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      returnSecureToken: true,
    }
    // Call the login method and subscribe to the result
    this.auth.login(user).subscribe(res => {
      // Reset the login form
      this.loginForm.reset()
      // Navigate to the admin dashboard
      this.router.navigate(['/admin', 'dashboard'])
      // Set submitted flag to false
      this.submitted = false
    }), () => {
      // Set submitted flag to false in case of error
      this.submitted = false
    }
  }
}

