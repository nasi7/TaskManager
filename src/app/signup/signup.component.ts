import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  Validators,
  Form,
  NgForm,
  AbstractControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ServerDataService } from '../server-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup = this.fb.group(
    {
      email: [
        null,
        Validators.compose([Validators.email, Validators.required]),
      ],
      password: [],
      confirmPassword: [null, Validators.required],
    },
    {
      // check whether our password and confirm password match
      validator: this.passwordMatchValidator,
    }
  );
  constructor(
    public fb: FormBuilder,
    private DataService: ServerDataService,
    private _snackBar: MatSnackBar,
    public myRoute: Router
  ) {}

  ngOnInit(): void {}

  openSnackBar() {
    this._snackBar.openFromComponent(confirmationComponent, {
      duration: 2200,
    });
  }

  handleSubmit() {
    var email = this.signupForm.controls.email.value;
    var password = this.signupForm.controls.password.value;
    var confirmPass = this.signupForm.controls.confirmPassword.value;
    this.DataService.addUser(email, password, confirmPass).subscribe(
      (data) => console.log(data),
      (error) => console.log(error),
      () => {
        this.openSnackBar();
        this.myRoute.navigateByUrl('/');
      }
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }
}

@Component({
  selector: 'confirmUserSignup',
  template: ` <p class="mat-title">Sign up successful!</p> `,
  styles: [
    `
      .mat-title {
        text-align: center;
        font-family: 'Montserrat', sans-serif;
      }
    `,
  ],
})
export class confirmationComponent {}
