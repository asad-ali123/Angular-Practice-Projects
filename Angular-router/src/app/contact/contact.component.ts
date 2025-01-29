import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  firstname: string = '';
  lastname: string = '';
  country: string = 'usa';
  message: string = "";

  isSubmitted: boolean = false;
  onSubmit() {
    this.isSubmitted = true;
    this.firstname ='';
    this.lastname="";
    this.country = 'usa'
    this.message="";

  }

  canExit() {
    if ((this.firstname || this.lastname || this.message) && !this.isSubmitted) {
      return confirm('You have unsaved changes.Do you want to navigate away!')
    } else {
      return true;
    }
  }

}
