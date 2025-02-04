import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { catchError, map, Subject, throwError } from "rxjs";
import { Task } from "../Model/Task";
import { LoggingService } from "./Logging.service";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    http: HttpClient = inject(HttpClient);
    errorSubject = new Subject<HttpErrorResponse>();
    logservice: LoggingService = inject(LoggingService);

    allTasks: Task[] = [];

    CreateTask(task: Task) {
        this.http.post<{ name: string }>('https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks.json', task)
            .pipe(catchError((err) => {
                //Write the logic of log the errors
                const errObj = { statusCode: err.status, errorMessage: err.message, dateTime: new Date() }
                this.logservice.logError(errObj)
                return throwError(() => err)

            }))
            .subscribe({
                error: (error) => {
                    this.errorSubject.next(error)
                }
            })


    }

    FetchAllTasks() {
        return this.http.get<{ [key: string]: Task }>(
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

            }), catchError((err) => {
                //Write the logic of log the errors
                const errObj = { statusCode: err.status, errorMessage: err.message, dateTime: new Date() };
                this.logservice.logError(errObj);
                return throwError(() => err)

            }))// return the transform data
        //subscribe in component class

    }

    DeleteTask(id: string | undefined) {
        this.http.delete('https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks/' + id + '.json')
            .pipe(catchError((err) => {
                //Write the logic of log the errors
                const errObj = { statusCode: err.status, errorMessage: err.message, dateTime: new Date() }
                this.logservice.logError(errObj)
                return throwError(() => err)

            }))
            .subscribe({
                error: (error) => {
                    this.errorSubject.next(error)
                }
            })
    }


    DeleteAllTasks() {
        this.http.delete('https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks.json')
            .pipe(catchError((err) => {
                //Write the logic of log the errors
                const errObj = { statusCode: err.status, errorMessage: err.message, dateTime: new Date() }
                this.logservice.logError(errObj)
                return throwError(() => err)

            }))
            .subscribe({
                error: (error) => {
                    this.errorSubject.next(error)
                }
            })
    }

    UpdateTask(id: string | undefined, data: Task) {
        this.http.put('https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks/' + id + '.json', data)
            .pipe(catchError((err) => {
                //Write the logic of log the errors
                const errObj = { statusCode: err.status, errorMessage: err.message, dateTime: new Date() }
                this.logservice.logError(errObj)
                return throwError(() => err)

            }))
            .subscribe({
                error: (error) => {
                    this.errorSubject.next(error)
                }
            })
    }

    getTaskDetails(id: string | undefined) {
        return this.http.get('https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks/' + id + '.json')
            .pipe(map((response) => {
                let task = {};
                task = { ...response, id: id };
                return task;
            }))
    }

}