import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../common/auth.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup
  submitted = false

  constructor(public auth: AuthService,) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(' ', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }
  submit(){
    if (this.loginForm.invalid){
      return;
    }
    this.submitted = true;
    const user: object = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }
    this.auth.login(user).subscribe(res => {
      console.log(res)
    })
  }
}

