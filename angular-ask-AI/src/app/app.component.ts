import { Component } from '@angular/core';
import { SidemenuComponent } from "./components/sidemenu/sidemenu.component";


@Component({
  selector: 'app-root',
  imports: [SidemenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ask-AI';
}
