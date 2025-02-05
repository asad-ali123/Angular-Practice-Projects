import { Component, inject, OnInit } from '@angular/core';

import { CreateTaskComponent } from "./create-task/create-task.component";
import { CommonModule } from '@angular/common';

import { TaskService } from '../Services/task.service';
import { Task } from '../Model/Task';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TeskDetailComponent } from "./tesk-detail/tesk-detail.component";
import { LoaderComponent } from "../utility/loader/loader.component";
import { SnackbarComponent } from "../utility/snackbar/snackbar.component";

@Component({
  selector: 'app-dashboard',
  imports: [CreateTaskComponent, CommonModule, TeskDetailComponent, LoaderComponent, SnackbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  taskService: TaskService = inject(TaskService);
  allTasks: Task[] = [];
  selectedTask: any;
  showCreateTaskForm: boolean = false;
  showDetail: boolean = false;
  editMode: boolean = false;
  currentTaskId: string | undefined;
  isLoading: boolean = false;
  errorMessage!: string | null;
  errorSub!: Subscription;
  currentTaskDetails: Task | null = null

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
  // Show task details component

  onShowDetail(id: string | undefined) {
    this.showDetail = true;
    this.taskService.getTaskDetails(id).subscribe((data)=>{
       let currentTask: Task = data as Task;
       this.currentTaskDetails =  currentTask

    }  )
    
  }
  onCloseDetail() {
    this.showDetail = false;
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
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
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
