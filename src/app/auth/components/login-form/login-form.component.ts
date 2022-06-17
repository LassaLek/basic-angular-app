import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { first, switchMap } from 'rxjs';
import { FormValuesEnum } from '../../models/form-values.enum';
import { AuthTextsEnum } from '../../models/auth-texts.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../../../users/services/users.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  // Useful STRINGS
  formValuesEnum = FormValuesEnum;
  authTextsEnum = AuthTextsEnum;

  // Local STATE
  errorMsg: string = '';
  hide = true;
  loading = false;

  // Form
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.pattern]],
    password: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.usersService.currentUserTokenValue) {
      this.router.navigate(['/']);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  getErrorMessage() {
    if (this.f[this.formValuesEnum.EMAIL].hasError('required')) {
      return this.authTextsEnum.REQUIRED;
    }

    return this.f[this.formValuesEnum.EMAIL].hasError('pattern') ? this.authTextsEnum.INVALID_EMAIL : '';
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f[this.formValuesEnum.EMAIL].value, this.f[this.formValuesEnum.PASSWORD].value)
       .subscribe(
        (res) => {
          this.loading = false;
          this.usersService.currentUserTokenSubject.next(res.token);
        },
        (error: string) => {
          this.loading = false;
          this.errorMsg = error;
        },() => {
           this.router.navigate(['/']);
         });
  }
}
