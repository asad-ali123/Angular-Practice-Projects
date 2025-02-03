import { Component, OnInit } from '@angular/core';

import { CreateTaskComponent } from "./create-task/create-task.component";
import { CommonModule } from '@angular/common';
import { Task } from '../Model/task';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTaskComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient) { };
  allTasks: Task[] = [];

  ngOnInit(): void {
    this.fetchAllTasks();

  }

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
        console.log(res);
        this.fetchAllTasks()

      })

  }

  private fetchAllTasks() {
    this.http.get<{ [key: string]: Task }>(
      'https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks.json')
      .pipe(map((response) => {
        //TRANSFORM DATA
        let tasks = [];
        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            tasks.push({ ...response[key], id: key })
          }
        }
        return tasks

      }))// return the transform data
      .subscribe((tasks) => {
        this.allTasks = tasks
      })
  }

  fetchAllTasksClicked() {
    this.fetchAllTasks()
  }

  deleteTask(id: string | undefined) {
    // let check = this.allTasks.filter((task) => {
    //   if (task.id === id) {
    //     return this.allTasks.pop();
    //   }
    //   return
    // })
    // console.log(check)
    this.http.delete('https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks/' + id + '.json')
      .subscribe(() => this.fetchAllTasks());

  }

  deletAllTasks() {
    this.http.delete('https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks.json')
      .subscribe(() => this.fetchAllTasks());
  }

}
