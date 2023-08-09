import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-navigation-view',
  templateUrl: './user-navigation-view.component.html',
  styleUrls: ['./user-navigation-view.component.scss'],
})
export class UserNavigationViewComponent {
  @Input() username?: string;
  @Input() isAdmin?: boolean;

  @Output() onLogout: EventEmitter<void> = new EventEmitter<void>();
  @Output() onLogin: EventEmitter<void> = new EventEmitter<void>();
  @Output() onHome: EventEmitter<void> = new EventEmitter<void>();
  @Output() onAddProduct: EventEmitter<void> = new EventEmitter<void>();
}
