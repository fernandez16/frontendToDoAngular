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
  newTask = new Task();

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.getTasks().subscribe((data) => (this.tasks = data));
  }

  checkTaskNameValidity(taskName: string): boolean {
    if (taskName != null && taskName != '') {
      for (let i = 0; i < taskName.length; i++) {
        if (taskName[i] != ' ') {
          return true;
        }
      }
      return false;
    } else return false;
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

  deleteAll(tasks: Task[]): void {
    tasks.forEach((task) => {
      this.service
        .deleteTask(task)
        .subscribe(
          (data) => (this.tasks = this.tasks.filter((p) => p !== task))
        );
      // alert('Task deleted');
    });
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
