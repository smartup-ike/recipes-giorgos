import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: FormControl = new FormControl();
  password: FormControl = new FormControl();

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
  });

  login() {
    console.log(1);
  }
}
