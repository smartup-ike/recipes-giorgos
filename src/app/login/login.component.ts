import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}

  email: FormControl = new FormControl();
  password: FormControl = new FormControl();

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  async login() {
    try {
      await this.auth.signIn(this.loginForm.value);
    } catch (error) {
      console.log(error);
    }

    this.router.navigateByUrl('/');
  }
}
