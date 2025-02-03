import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { map, Subject } from "rxjs";
import { Task } from "../Model/Task";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    http: HttpClient = inject(HttpClient);
    errorSubject = new Subject<HttpErrorResponse>()

    allTasks: Task[] = [];

    CreateTask(task: Task) {
        this.http.post<{ name: string }>('https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks.json', task)
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

            }))// return the transform data
        //subscribe in component class

    }

    DeleteTask(id: string | undefined) {
        this.http.delete('https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks/' + id + '.json')
            .subscribe({
                error: (error) => {
                    this.errorSubject.next(error)
                }
            })
    }


    DeleteAllTasks() {
        this.http.delete('https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks.json')
            .subscribe({
                error: (error) => {
                    this.errorSubject.next(error)
                }
            })
    }

    UpdateTask(id: string | undefined, data: Task) {
        this.http.put('https://angularhttp-89e90-default-rtdb.firebaseio.com/tasks/' + id + '.json', data)
            .subscribe({
                error: (error) => {
                    this.errorSubject.next(error)
                }
            })
    }

}