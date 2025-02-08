import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [CommonModule],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.css'
})
export class SignalsComponent {
  counter: number = 0
  message :string []=[]

  decrement() {
    // this.counter = + this.counter - 1
    this.counter--

  }

  increment() {
    // this.counter = + this.counter +1
    this.counter++


  }

}
