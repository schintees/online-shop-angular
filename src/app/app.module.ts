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
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsFormViewComponent } from './components/presentational/products-form-view/products-form-view.component';
import { MatInputModule } from '@angular/material/input';
import { ProductsFormComponent } from './components/containers/products-form/products-form.component';
import { MatCardModule } from '@angular/material/card';
import { UserModule } from './modules/user/user.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appMetaReducers, appReducers } from './state/app.reducers';
import { appEffects } from './state/app.effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
    declarations: [
        AppComponent,
        ProductsDetailsComponent,
        ProductsDetailsViewComponent,
        ProductsListComponent,
        ProductsListViewComponent,
        ConfirmDeleteDialogViewComponent,
        ConfirmDeleteDialogComponent,
        ProductsFormComponent,
        ProductsFormViewComponent
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ShoppingCartModule,
        UserModule,
        BrowserAnimationsModule,
        IconButtonComponent,
        MatDialogModule,
        MatButtonModule,
        HttpClientModule,
        MatSnackBarModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatCardModule,
        MatProgressSpinnerModule,
        StoreModule.forRoot(appReducers, appMetaReducers),
        EffectsModule.forRoot(appEffects),
        StoreDevtoolsModule.instrument(),
    ]
})
export class AppModule { }
