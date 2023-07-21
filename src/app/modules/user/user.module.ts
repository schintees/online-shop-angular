import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './components/containers/user-login/user-login.component';
import { UserLoginViewComponent } from './components/presentational/user-login-view/user-login-view.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { UserNavigationComponent } from './components/containers/user-navigation/user-navigation.component';
import { UserNavigationViewComponent } from './components/presentational/user-navigation-view/user-navigation-view.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors/auth-interceptor';

@NgModule({
  declarations: [
    UserLoginComponent,
    UserLoginViewComponent,
    UserNavigationComponent,
    UserNavigationViewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    UserNavigationComponent
  ]
})
export class UserModule { }
