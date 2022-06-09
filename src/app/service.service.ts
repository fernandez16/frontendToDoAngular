import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  Url: string = 'http://localhost:8080/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get<Task[]>(this.Url);
  }

  addTask(task: Task) {
    return this.http.post<Task>(this.Url, task);
  }

  deleteTask(task: Task) {
    return this.http.delete<Task>(this.Url + '/' + task.id);
  }

  updateTask(task: Task) {
    return this.http.put<Task>(this.Url + '/' + task.id, task);
  }

}
