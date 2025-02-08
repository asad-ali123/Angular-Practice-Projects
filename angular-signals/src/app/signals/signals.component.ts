import { Component } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.css'
})
export class SignalsComponent {
  counter: number = 0

  decrement() {
    this.counter = + this.counter + 1

  }

  increment() {
    this.counter = + this.counter -1


  }

}
