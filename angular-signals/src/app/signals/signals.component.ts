import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  imports: [CommonModule],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.css'
})
export class SignalsComponent {
  counter = signal(0);
  message = signal<any>([]);

  decrement() {
    // this.counter = + this.counter - 1
    // this.counter.set(this.counter() - 1)
    this.counter.update((pravValue) => pravValue - 1)

  }

  increment() {
    // this.counter = + this.counter +1
    this.counter.set(this.counter() + 1)
    this.message.update((pravMesg)=> [...pravMesg , 'Current value of counter is '+ this.counter()]);
    // this.message.mutate((pravMesg) => pravMesg.push('Current value of counter is ' + this.counter()))


``
  }

}
