import { Component } from '@angular/core';

import { CreateTaskComponent } from "./create-task/create-task.component";
import { CommonModule } from '@angular/common';
import { Task } from '../Model/task';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTaskComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  showCreateTaskForm: boolean = false;
  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;

  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false
  }
  createTask(data: Task) {
    console.log(data)

  }

}
