import { Component, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'online-shop-angular';

  @HostListener("window:beforeunload")
  clearLocalStorage() {
    localStorage.clear();
  }
}
