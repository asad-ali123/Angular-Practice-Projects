import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'template-driven-form';


  firstname!: string;
  lastname!: string;
  emailaddress!: string;
  phonenumber!: string;
  dob!: string;
  username!: string;
  address1!: string;
  address2!: string;
  country!: string;
  city!: string;
  region!: string;
  postalcode!: string;
  isAgreed: boolean = false;


  selectCountry: string = 'Select Country';

  @ViewChild('formReg') form!: NgForm;

  genders = [
    { id: 'check-male', value: 'male', display: 'Male' },
    { id: 'check-female', value: 'female', display: 'Female' },
    { id: 'check-other', value: 'other', display: 'prefer not to say' }
  ]



  onFormSubmit() {
    console.log(this.form)

    this.firstname = this.form.value.firstname;
    this.lastname = this.form.value.lastname;
    this.emailaddress = this.form.value.email;
    this.phonenumber = this.form.value.phonenumber;
    this.dob = this.form.value.dob;
    this.username = this.form.value.username;
    this.address1 = this.form.value.address.address1;
    this.address2 = this.form.value.address.address2;
    this.country = this.form.value.address.country;
    this.city = this.form.value.address.city;
    this.region = this.form.value.address.region;
    
    this.postalcode = this.form.value.address.postalcode 
    this.isAgreed = this.form.value
    




    this.form.reset();

    this.form.form.patchValue({
      gender: 'male',
      address: {
        country: "Pakistan"
      }

    })
  }

  generateUsername() {
    let username: string = "";

    if (this.form.value.firstname.length >= 3) {
      username += this.form.value.firstname.slice(0, 3);
    } else {
      username += this.form.value.firstname;
    }
    if (this.form.value.lastname.length >= 3) {
      username += this.form.value.lastname.slice(0, 3);
    } else {
      username += this.form.value.lastname;
    }

    let dateTime = new Date(this.dob);
    username += "@" + dateTime.getDate();

    username = username.toLowerCase();
    console.log(username)
    // this.username = username

    //*update a value using servalue

    // this.form.setValue({
    //   firstname: this.form.value.firstname,
    //   lastname: this.form.value.lastname,
    //   email: this.form.value.email,
    //   phonenumber: this.form.value.phonenumber,
    //   dob: this.form.value.dob,
    //   gender: this.form.value.gender,
    //   username: username,
    //   address: {
    //     address1: this.form.value.address.address1,
    //     address2: this.form.value.address.address2,
    //     country: this.form.value.address.country,
    //     city: this.form.value.address.city,
    //     region: this.form.value.address.region,
    //     postalcode: this.form.value.address.postalcode,

    //   }
    // })

    // *Update a value using patch Value

    this.form.form.patchValue({
      username: username,
      // address: {
      //   city: "BWP"
      // }
    })
  }

}
