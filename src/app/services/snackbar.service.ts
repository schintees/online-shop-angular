import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarMessages } from '../modules/shared/types/snackbar-messages.enum';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matSnackBar: MatSnackBar) { }

  openSuccessMessageBar(message: SnackbarMessages): void {
    this.matSnackBar.open(this.transform(message), $localize`:@@Snackbar.Message.Dismiss:Dismiss`, {
      duration: 5000,
      panelClass: 'app-notification-success',
    });
  }


  openErrorMessageBar(message: SnackbarMessages): void {
    this.matSnackBar.open(this.transform(message), $localize`:@@Snackbar.Message.Dismiss:Dismiss`, {
      duration: 5000,
      panelClass: 'app-notification-error',
    });
  }

  transform(message: SnackbarMessages): string {
    switch (message) {
      case SnackbarMessages.productDeletedSuccessfully:
        return $localize`:@@Snackbar.Message.Product.Deleted:The product has been deleted successfully.`;
      case SnackbarMessages.productUpdatedSuccessfully:
        return $localize`:@@Snackbar.Message.Product.Updated:The product has been updated successfully.`;
      case SnackbarMessages.productCreatedSuccessfully:
        return $localize`:@@Snackbar.Message.Product.Created:The product has been created successfully.`;
      case SnackbarMessages.emptyCart:
        return $localize`:@@Snackbar.Message.Cart.Empty:Your cart is empty.`;
      case SnackbarMessages.productAddedToCartSuccessfully:
        return $localize`:@@Snackbar.Message.Product.Added.To.Cart:The product has been successfully added to the cart.`;
      case SnackbarMessages.orderCreatedSuccessfully:
        return $localize`:@@Snackbar.Message.Order.Created:Successfully created the order.`;
      case SnackbarMessages.wrongCredentials:
        return $localize`:@@Snackbar.Message.Wrong.Credentials:Wrong username and password!`;
      case SnackbarMessages.serverError:
        return $localize`:@@Snackbar.Message.Server.Error:A problem occurred during the login process.`;
      default: {
        return $localize`:@@Snackbar.Message.Default:`;
      }
    }
  }

}
