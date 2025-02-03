import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Task } from '../../Model/Task';

@Component({
  selector: 'app-create-task',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements AfterViewInit {


  @ViewChild('taskcreateForm') taskcreateForm!: NgForm;
  @Output() CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() EmitTaskData: EventEmitter<Task> = new EventEmitter<Task>();
  @Input() IsEditMode: boolean = false;
  @Input() selectedTask!: Task;





  ngAfterViewInit() {
    console.log(this.taskcreateForm.value)
    setTimeout(() => {
      this.taskcreateForm.form.patchValue(this.selectedTask)

    }, 0);

  }


  OnCloseForm() { this.CloseForm.emit(false) }




  onSubmittedForm() {
    this.EmitTaskData.emit(this.taskcreateForm.value)
    this.CloseForm.emit(false);
  }

}
