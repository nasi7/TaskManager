import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerDataService } from '../server-data.service';
import { Route, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private myRouter: Router,
    public _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  openSnackBar() {
    this._snackBar.openFromComponent(invalidUserComponent, {
      duration: 2500,
    });
  }

  handleSubmit(loginForm: NgForm) {
    this.username = loginForm.controls.username.value;
    this.password = loginForm.controls.password.value;
    this.DataService.verifyUser(this.username, this.password).subscribe(
      (data) => {
        sessionStorage.setItem('userToken', data['access_token']);
      },
      (error) => this.openSnackBar(),
      () => this.myRouter.navigateByUrl('/tasks')
    );
  }
}

@Component({
  selector: 'invalidUser',
  template: ` <p class="mat-title">Incorrect Username or Password</p> `,
  styles: [
    `
      .mat-title {
        text-align: center;
        font-family: 'Montserrat', sans-serif;
      }
    `,
  ],
})
export class invalidUserComponent {}
