import { Component, inject, OnInit } from '@angular/core';

import { CreateTaskComponent } from "./create-task/create-task.component";
import { CommonModule } from '@angular/common';

import { TaskService } from '../Services/task.service';
import { Task } from '../Model/Task';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CreateTaskComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  taskService: TaskService = inject(TaskService);
  allTasks: Task[] = [];
  selectedTask: any;
  showCreateTaskForm: boolean = false;
  editMode: boolean = false;
  currentTaskId: string | undefined;
  isLoading: boolean = false;
  errorMessage!: string | null;
  errorSub!: Subscription;

  ngOnInit(): void {
    this.fetchAllTasks();
    this.errorSub = this.taskService.errorSubject.subscribe({
      next: (httmError) => {
        this.setErrorMessage(httmError)
      }
    })

  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }


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
    this.isLoading = true;
    this.taskService.FetchAllTasks().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.setErrorMessage(error)
      }
    })
  }

  private setErrorMessage(err: HttpErrorResponse) {
    if (err.error.error === 'Permission denied') {
      this.errorMessage = "You do not have permisson to perform this action"
    } else {
      this.errorMessage = err.message
    }


    setTimeout(() => {
      this.errorMessage = null
    }, 3000);
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
