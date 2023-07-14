import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsDetailsComponent } from './components/containers/products-details/products-details.component';
import { ProductsDetailsViewComponent } from './components/presentational/products-details-view/products-details-view.component';
import { ProductsListComponent } from './components/containers/products-list/products-list.component';
import { ProductsListViewComponent } from './components/presentational/products-list-view/products-list-view.component';
import { ShoppingCartModule } from './modules/shopping-cart/shopping-cart.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconButtonComponent } from "./modules/shared/components/presentational/icon-button/icon-button.component";
import { ConfirmDeleteDialogViewComponent } from './components/presentational/confirm-delete-dialog-view/confirm-delete-dialog-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDeleteDialogComponent } from './components/containers/confirm-delete-dialog/confirm-delete-dialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GlobalHttpInterceptorService } from './services/global-http-interceptor.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        AppComponent,
        ProductsDetailsComponent,
        ProductsDetailsViewComponent,
        ProductsListComponent,
        ProductsListViewComponent,
        ConfirmDeleteDialogViewComponent,
        ConfirmDeleteDialogComponent
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: GlobalHttpInterceptorService,
        multi: true
    }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ShoppingCartModule,
        BrowserAnimationsModule,
        IconButtonComponent,
        MatDialogModule,
        MatButtonModule,
        HttpClientModule,
        MatSnackBarModule
    ]
})
export class AppModule { }
