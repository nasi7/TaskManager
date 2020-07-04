import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  hide = true;
  constructor() {}

  ngOnInit(): void {}

  handleSubmit(signUpForm: NgForm) {
    console.log(signUpForm);
  }
}
