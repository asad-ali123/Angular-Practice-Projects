// src/app/app.component.ts

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

  today = new Date();
  startD: any = {
    date: {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate(),
    },
  };


  endD: any = {
    date: {
      year: this.today.getFullYear(),
      month: this.today.getMonth(),
      day: this.today.getDate()

    }

  }

  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: false,
    // dateRange: true
  };

  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public datePipe: DatePipe) { }



  ngOnInit() {
    this.myForm = this.formBuilder.group({
      // Empty string or null means no initial value. Can be also specific date for
      // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
      // value.


      startDate: [this.startD, Validators.required],
      endDate: [this.endD, Validators.required]
      // other controls are here...
    });
  }

  // formatedDate(date: any) {
  //   const { year, month, day } = date.date
  //   const formatDate = `${year}-${month}-${day}`
  //   console.log(`${year}-${month}-${day}`)
  //   return formatDate
  // }

  // getStartDate(date: any): string {
  //   if (!date) {
  //     date = { year: new Date().getFullYear(), month: 1, day: 1 };
  //   }

  //   const startDate = new Date(date.year, date.month - 1, date.day);

  //   // Formatting startDate using DatePipe
  //   const formattedStartDate = this.datePipe.transform(
  //     startDate,
  //     'yyyy-MM-dd',
  //     // 'dd.mm.yyyy'
  //   ) as string;

  //   return formattedStartDate;
  // }


  getStartDate(date: any): string {
  // If no date is provided, set a default date (January 1st of the current year)
  if (!date) {
    date = { year: new Date().getFullYear(), month: 1, day: 1 };
  }

  // Validate the date object
  if (
    typeof date.year !== 'number' ||
    typeof date.month !== 'number' ||
    typeof date.day !== 'number'
  ) {
    throw new Error("Invalid date object: year, month, and day must be numbers");
  }

  // Create a Date object from the provided or default date
  const startDate = new Date(date.year, date.month - 1, date.day);

  // Check if the Date object is valid
  if (isNaN(startDate.getTime())) {
    console.warn("Invalid date provided. Falling back to current date.");
    return this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ssZ') as string;
  }

  // Format the Date object into a string using DatePipe
  const formattedStartDate = this.datePipe.transform(
    startDate,
    'yyyy-MM-ddTHH:mm:ssZ'
  ) as string;

  // Return the formatted date string
  return formattedStartDate;
}



  showDate() {
    const formatedStartDate = this.getStartDate(this.myForm.value.startDate)

    // const formatedEndDate = this.formatedDate(this.myForm.value.endDate)
    // let value =this.myForm.value
    console.log(formatedStartDate)
  }



}
