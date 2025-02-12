// src/app/app.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-root',
  standalone: true,
  // Import FormsModule and MyDatePickerModule for template-driven forms and the date picker component.
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // DatePicker configuration options: using the format 'dd.mm.yyyy'
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    // You can add additional options as needed.
  };

  // The model that holds the date value. Initialized to October 9, 2018.
  public model: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor() { }
}
