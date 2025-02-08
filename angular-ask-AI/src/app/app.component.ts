import { Component } from '@angular/core';
import { SidemenuComponent } from "./components/sidemenu/sidemenu.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [SidemenuComponent , RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ask-AI';
}
