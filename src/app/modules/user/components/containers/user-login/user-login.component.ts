import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { login } from '../../../state/user.actions';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: []
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
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

    this.store.dispatch(login({ userCredentials: this.loginForm.value }))
  }

}

