import { Component } from '@angular/core';
import { ServiceService } from './service.service';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  tasks: Task[];
  showComplete: false;
  taskText = new Task();

  emptyString = "";

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.getTasks().subscribe((data) => (this.tasks = data));
  }

  createTask(task: Task) {
    this.service.createTask(task).subscribe((data) => {
      // alert('Task added');
      this.ngOnInit();
    });
  }

  delete(task: Task): void {
    this.service
      .deleteTask(task)
      .subscribe((data) => (this.tasks = this.tasks.filter((p) => p !== task)));
    // alert('Task deleted');
  }

  update(task: Task) {
    this.service.updateTask(task).subscribe((data) => {
      task = data;
      // alert('Task updated');
      this.ngOnInit();
    });
  }

  updateAll(tasks: Task[]) {
    tasks.forEach((task) => {
      this.service.updateTask(task).subscribe((data) => {
        task = data;
        // alert('Task updated');
        this.ngOnInit();
      });
    });
  }
}
