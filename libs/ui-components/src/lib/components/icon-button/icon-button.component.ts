import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'lib-icon-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './icon-button.component.html',
  styleUrls: []
})
export class IconButtonComponent {
  @Input() type: string = '';
  @Input() color: string = 'black';

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
}
