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
  dob!: string;
  username !: string;
  selectCountry: string = 'Select Country';

  @ViewChild('formReg') form!: NgForm;

  genders = [
    { id: 'check-male', value: 'male', display: 'Male' },
    { id: 'check-female', value: 'female', display: 'Female' },
    { id: 'check-other', value: 'other', display: 'prefer not to say' }
  ]


  onFormSubmit() {
    console.log(this.form)
    console.log(this.form.value.address.postalcode);
    console.log(this.dob)
    // this.form.reset();
  }

  generateUsername() {
    let username: string = "";

    if (this.firstname.length >= 3) {
      username += this.firstname.slice(0, 3);
    } else {
      username += this.firstname;
    }
    if (this.lastname.length >= 3) {
      username += this.lastname.slice(0, 3);
    } else {
      username += this.lastname;
    }

    let dateTime = new Date(this.dob);
    username += "@" + dateTime.getDate();

    username = username.toLowerCase();
    // this.username = username;

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
      username : username,
      address:{
        city:"BWp"
      }
    })
  }

}
