import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../Model/task';

@Component({
  selector: 'app-create-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  @ViewChild('taskcreateForm') taskcreateForm!: NgForm;
  @Output() CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();




  OnCloseForm() { this.CloseForm.emit(false) }




  onSubmittedForm() {
    this.EmitTaskData.emit(this.taskcreateForm.value)
    this.CloseForm.emit(false)
  }

}
