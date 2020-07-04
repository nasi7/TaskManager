import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  private username: string;
  private password: string;
  constructor() {}

  ngOnInit(): void {}

  handleSubmit(loginForm: NgForm) {
    this.username = loginForm.controls.username.value;
    this.password = loginForm.controls.password.value;
    this.validateUser();
  }

  //TODO
  validateUser() {}
}
