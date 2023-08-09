import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-login-view',
  templateUrl: './user-login-view.component.html',
  styleUrls: ['./user-login-view.component.scss'],
})
export class UserLoginViewComponent {
  @Input() loginForm!: FormGroup;
  @Output() onSubmit: EventEmitter<void> = new EventEmitter<void>();
}
