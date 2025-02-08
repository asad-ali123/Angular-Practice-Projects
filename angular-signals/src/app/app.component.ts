import { Component } from '@angular/core';

import { SignalsComponent } from "./signals/signals.component";

@Component({
  selector: 'app-root',
  imports: [ SignalsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-signals';
}
