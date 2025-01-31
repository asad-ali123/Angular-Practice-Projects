import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Angular-reactive-form';

  reactiveForm!: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null),
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
      experiance: new FormArray([
      new FormGroup({
        
      })
      ])




    });
    console.log(this.reactiveForm)


  }


  onSubmitForm() {
    console.log(this.reactiveForm)
  }

  addSkills() {
    (<FormArray>this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required));
  }
  deleteSkill(index: number) {
    const controls = <FormArray>this.reactiveForm.get('skills');
    controls.removeAt(index);
  }

}
