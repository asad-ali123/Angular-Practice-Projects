import { Component, inject, OnInit } from '@angular/core';

import { CreateTaskComponent } from "./create-task/create-task.component";
import { CommonModule } from '@angular/common';

import { TaskService } from '../Services/task.service';
import { Task } from '../Model/Task';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTaskComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    this.fetchAllTasks();

  }

  taskService: TaskService = inject(TaskService);
  allTasks: Task[] = [];
  selectedTask: any;
  showCreateTaskForm: boolean = false;
  editMode: boolean = false;
  currentTaskId: string | undefined;
  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
  }
  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
    this.editMode = false;
  }

  // HTTP Methods
  createOrUpdateTask(data: Task) {
    if (!this.editMode) {
      this.taskService.CreateTask(data);
    } else {

      this.taskService.UpdateTask(this.currentTaskId, data)
    }




  }

  private fetchAllTasks() {
    this.taskService.FetchAllTasks().subscribe((tasks) => {
      this.allTasks = tasks;
    })
  }

  fetchAllTasksClicked() {
    this.fetchAllTasks()
  }

  deleteTask(id: string | undefined) {
    this.taskService.DeleteTask(id);


  }

  deletAllTasks() {
    this.taskService.DeleteAllTasks();

  }

  onEditClicked(id: string | undefined) {
    this.currentTaskId = id;
    this.showCreateTaskForm = true;
    this.editMode = true;
    this.selectedTask = this.allTasks.find((task) => task.id === id)
  }

}
