import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidator } from './Validators/noSpaceAllowed.validator';



@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Angular-reactive-form';
  formStatus!: string;
  formData: any = {};


  reactiveForm!: FormGroup;


  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, CustomValidator.noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, CustomValidator.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required, CustomValidator.checkUsername),
      dob: new FormControl(null),
      gender: new FormControl('male'),
      addressFields: new FormGroup({
        address: new FormControl(null, Validators.required),
        country: new FormControl('country'),
        city: new FormControl(null, Validators.required),
        region: new FormControl(null),
        postalcode: new FormControl(null, Validators.required),

      }),
      skills: new FormArray([
        new FormControl(null, Validators.required),
      ]),
      experience: new FormArray([

      ])




    });
    console.log(this.reactiveForm)

    // this.reactiveForm.get('firstname').valueChanges.subscribe((value)=>{
    //   console.log(value)
    // })

    this.reactiveForm.statusChanges.subscribe((value) => {
      // console.log(value);
      this.formStatus = value;
    })


  }


  onSubmitForm() {
    console.log(this.reactiveForm.value)
    this.formData = this.reactiveForm.value;
    this.reactiveForm.reset({
      firstname: null,
      lastname: null,
      email: null,
      username: null,
      dob: null,
      gender: 'male',
      addressFields: {
        address: null,
        country: 'country',
        city: null,
        region: null,
        postalcode: null,

      },
      skills: [],
      experience: []
    });

  }

  addSkills() {
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
  }
  deleteSkill(index: number) {
    const controls = <FormArray>this.reactiveForm.get('skills');
    controls.removeAt(index);
  }

  addExperience() {
    const formGroup = new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalexp: new FormControl(null),
      startdate: new FormControl(null),
      enddate: new FormControl(null),

    });

    (<FormArray>this.reactiveForm.get('experience')).push(formGroup)


  }

  deleteExperience(index: number) {
    const controls = <FormArray>this.reactiveForm.get('experience');
    controls.removeAt(index)
  }

  generateUsername() {
    let username: string = "";
    const fname: string = this.reactiveForm.get('firstname').value;
    const lname: string = this.reactiveForm.get('lastname').value;
    const dob: string = this.reactiveForm.get('dob').value;

    if (fname.length >= 3) {
      username += fname.slice(0, 3);
    } else {
      username += fname
    }

    if (lname.length >= 3) {
      username += lname.slice(0, 3);
    } else {
      username += lname
    }

    let datetime = new Date(dob);
    username += `@${datetime.getDate()}`;
    username = username.toLowerCase();

    // this.reactiveForm.setValue({
    //   firstname: this.reactiveForm.get('firstname').value,
    //   lastname: this.reactiveForm.get('lastname').value,
    //   email: this.reactiveForm.get('email').value,
    //   username: username,
    //   dob: this.reactiveForm.get('dob').value,
    //   gender: this.reactiveForm.get('gender').value,
    //   addressFields: {
    //     address: this.reactiveForm.get('addressFields.address').value,
    //     country: this.reactiveForm.get('addressFields.country').value,
    //     city: this.reactiveForm.get('addressFields.city').value,
    //     region: this.reactiveForm.get('addressFields.region').value,
    //     postalcode: this.reactiveForm.get('addressFields.postalcode').value,

    //   },
    //   skills: this.reactiveForm.get('skills').value,
    //   experience: this.reactiveForm.get('experience').value
    // })

    // this.reactiveForm.get('username').setValue(username)

    this.reactiveForm.patchValue({
      username: username
    })



  }


}
