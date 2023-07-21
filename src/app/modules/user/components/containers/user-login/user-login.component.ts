import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NavigationService } from 'src/app/services/navigation.service';
import { Observable, catchError, throwError } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Messages } from 'src/app/modules/shared/types/messages.const';
import { HttpErrorResponse } from '@angular/common/http';

@UntilDestroy()
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: []
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private userService: AuthService,
    private navigationService: NavigationService,
    private fb: FormBuilder,
    private snackBarService: SnackbarService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required,]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login(this.loginForm.value)
      .pipe(untilDestroyed(this))
      .pipe(catchError((error: HttpErrorResponse) => this.catchAuthError(error)))
      .subscribe(() => {
        this.navigationService.navigateToProductsPage()
      });

  }

  catchAuthError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    if (error && error.error && error.error.message) {
      this.snackBarService.openErrorMessageBar(Messages.login.wrongCredentials)
    } else {
      this.snackBarService.openErrorMessageBar(Messages.login.serverError);
    }

    return throwError(() => error);
  }
}

