import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule,
    MatIconModule],
  templateUrl: './icon-button.component.html',
  styleUrls: []
})
export class IconButtonComponent {
  @Input() type: String = '';
  @Input() color: String = 'black';

  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

}
