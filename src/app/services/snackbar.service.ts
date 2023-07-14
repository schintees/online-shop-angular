import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matSnackBar: MatSnackBar) { }

  openSuccessMessageBar(message: string, action?: string): void {
    this.matSnackBar.open(message, action ? action : "Dismiss", {
      duration: 5000,
      panelClass: 'app-notification-success',
    });
  }


  openErrorMessageBar(message: string, action?: string): void {
    this.matSnackBar.open(message, action ? action : "Dismiss", {
      duration: 5000,
      panelClass: 'app-notification-error',
    });
  }

}
