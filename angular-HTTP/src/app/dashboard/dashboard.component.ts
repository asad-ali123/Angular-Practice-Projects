import { Component } from '@angular/core';

import { CreateTaskComponent } from "./create-task/create-task.component";
import { CommonModule } from '@angular/common';
import { Task } from '../Model/task';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTaskComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private http: HttpClient) { }

  showCreateTaskForm: boolean = false;
  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;

  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false
  }
  createTask(data: Task) {
    this.http.post<{ name: string }>('https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks.json', data)
      .subscribe((res) => {
        console.log(res)
      })

  }

}
