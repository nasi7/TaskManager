import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerDataService } from '../server-data.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  private username: string;
  private password: string;
  constructor(
    private DataService: ServerDataService,
    private myRouter: Router
  ) {}

  ngOnInit(): void {}

  handleSubmit(loginForm: NgForm) {
    this.username = loginForm.controls.username.value;
    this.password = loginForm.controls.password.value;
    this.DataService.verifyUser(this.username, this.password).subscribe(
      (data) => console.log(data),
      (error) => console.log(error),
      () => this.myRouter.navigateByUrl('/tasks')
    );
  }
}
