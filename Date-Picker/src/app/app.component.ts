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

  // myDpOptions: IMyDpOptions = {
  //   dateFormat: 'dd-mm-yyyy',
  //   markCurrentDay: true,
  //   monthSelector: false,
  //   showTodayBtn: false,
  //   showClearDateBtn: false,
  //   inline: false,
  //   editableDateField: false,
  //   openSelectorOnInputClick: true,
  // };
  // public myForm!: FormGroup;


  // constructor(private formBuilder: FormBuilder) {
  // const yesterday = new Date(this.today);
  //     yesterday.setDate(this.today.getDate() - 1);
  //     this.startDate = {
  //       date: {
  //         year: 2025,
  //         month: 1,
  //         day: 1,
  //       },
  //       isRange: false,
  //       singleDate: { jsDate: new Date(2025, 1, 1) },
  //     };



  //  }

  // ngOnInit() {
  //   this.myForm = this.formBuilder.group({
  //     myDate: [null, Validators.required]
  //     // other controls are here...
  //   });
  // }

  // setDate(): void {
  //   // Set today date using the patchValue function
  //   const date = new Date();
  //   this.myForm.patchValue({
  //     myDate: {
  //       date: {
  //         year: date.getFullYear(),
  //         month: date.getMonth() + 1,
  //         day: date.getDate()
  //       }
  //     }
  //   });
  // }


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

  formatedDate(date: any) {
    const { year, month, day } = date.date
    const formatDate = `${year}-${month}-${day}`
    console.log(`${year}-${month}-${day}`)
    return formatDate
  }

  getStartDate(date: any): string {
    if (!date) {
      date = { year: new Date().getFullYear(), month: 1, day: 1 };
    }

    const startDate = new Date(date.year, date.month - 1, date.day);

    // Formatting startDate using DatePipe
    const formattedStartDate = this.datePipe.transform(
      startDate,
      // 'yyyy-MM-ddTHH:mm:ssZ',
      'dd.mm.yyyy'
    ) as string;

    return formattedStartDate;
  }



  showDate() {
    const formatedStartDate = this.getStartDate(this.myForm.value.endDate)

    // const formatedEndDate = this.formatedDate(this.myForm.value.endDate)
    // let value =this.myForm.value
    console.log(formatedStartDate)
  }



}
