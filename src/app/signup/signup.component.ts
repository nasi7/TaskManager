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
  message: string;
  isLoading = false;
  public signupForm: FormGroup = this.fb.group(
    {
      email: [
        null,
        Validators.compose([Validators.email, Validators.required]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ]),
      ],
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

  onSuccessSnackBar() {
    this._snackBar.openFromComponent(confirmationComponent, {
      duration: 2200,
    });
  }

  onFailSnackBar() {
    this._snackBar.openFromComponent(signupFailedComponent, {
      duration: 2200,
    });
  }

  handleSubmit() {
    this.isLoading = true;
    var email = this.signupForm.controls.email.value;
    var password = this.signupForm.controls.password.value;
    var confirmPass = this.signupForm.controls.confirmPassword.value;
    this.DataService.addUser(email, password, confirmPass).subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.onFailSnackBar();
      },
      () => {
        this.isLoading = false;
        this.onSuccessSnackBar();
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
  template: ` <p class="mat-title">Sign Up Successful</p> `,
  styles: [
    `
      .mat-title {
        text-align: center;
        font-family: 'Montserrat', sans-serif;
      }
    `,
  ],
})
export class confirmationComponent {
  message;
  constructor() {}
}

@Component({
  selector: 'failedSignup',
  template: ` <p class="mat-title">Sign Up Failed. Try Again</p> `,
  styles: [
    `
      .mat-title {
        text-align: center;
        font-family: 'Montserrat', sans-serif;
      }
    `,
  ],
})
export class signupFailedComponent {
  message;
  constructor() {}
}
