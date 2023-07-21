import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private snackbarService: SnackbarService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        this.snackbarService.openErrorMessageBar(error.message);
        return throwError(() => error);
      })
    );
  }

}
