// src/app/app.component.ts

import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IMyDpOptions, MyDatePickerModule } from '@murbanczyk-fp/mydatepicker';

@Component({
  selector: 'app-root',
  standalone: true,
  // Import FormsModule and MyDatePickerModule for template-driven forms and the date picker component.
  imports: [MyDatePickerModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],


})
export class AppComponent {
  public today = new Date();
  // startDate:any
  dateDt: any = {
    date: {
      year: this.today.getFullYear(),
      month: this.today.getMonth() + 1,
      day: this.today.getDate(),
    },
  };
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





  public myDatePickerOptions: IMyDpOptions = {
    
    // other options...
    dateFormat: 'dd.mm.yyyy',
    showTodayBtn: false,

    // dateRange: true

    
  };

  public myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.myForm = this.formBuilder.group({
      // Empty string or null means no initial value. Can be also specific date for
      // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
      // value.


      myDate: [this.dateDt, Validators.required]
      // other controls are here...
    });
  }



}
