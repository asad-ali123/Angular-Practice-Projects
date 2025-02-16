
import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMyDpOptions, MyDatePickerModule } from '@murbanczyk-fp/mydatepicker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MyDatePickerModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe],
})
export class AppComponent {
  today = new Date(); // Current Date

  // Start Date
  startD: any = {
    date: {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate(),
    },
  };

  // End Date
  endD: any = {
    date: {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate(),
    },
  };


  // Date Picker options
  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: false,
  };


  myForm!: FormGroup;     //Create instance of Reactive form 

  constructor(private formBuilder: FormBuilder, public datePipe: DatePipe) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      startDate: [this.startD, Validators.required],
      endDate: [this.endD, Validators.required],
    });
  }

  //Method for get Dates
  getDate(date: any): string {
    if (!date || !date.date) {
      date = { date: { year: new Date().getFullYear(), month: 1, day: 1 } };
    }

    const { year, month, day } = date.date;

    if (
      typeof year !== 'number' ||
      typeof month !== 'number' ||
      typeof day !== 'number'
    ) {
      throw new Error('Invalid date object: year, month, and day must be numbers');
    }

    const startDate = new Date(year, month - 1, day);

    if (isNaN(startDate.getTime())) {
      console.warn('Invalid date provided. Falling back to current date.');
      return this.datePipe.transform(new Date(), 'yyyy-MM-dd') as string;
    }

    const formattedStartDate = this.datePipe.transform(
      startDate,
      'yyyy-MM-dd'
    ) as string;

    return formattedStartDate;
  }

  showDate() {
    const formattedStartDate = this.getDate(this.myForm.value.startDate);
    const formattedEndDate = this.getDate(this.myForm.value.endDate);
    console.log('Formatted Start Date:', formattedStartDate);
    console.log('Formatted End Date:', formattedEndDate);
  }
}
