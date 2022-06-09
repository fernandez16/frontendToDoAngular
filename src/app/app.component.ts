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
  newTask = new Task();

  showOnlyCompleteTasks = false;

  selectedPage = 1;
  tasksPerPage = 4;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.getTasks().subscribe((data) => (this.tasks = data));
  }

  get paginatedTasks(): Task[] {
    let pageIndex = (this.selectedPage - 1) * this.tasksPerPage;
    return this.tasks.slice(pageIndex, pageIndex + this.tasksPerPage);
  }

  get pageNumbers(): number[] {
    return Array(
      Math.ceil(
        this.tasks.length /
          this.tasksPerPage
      )
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  get doneTasksCounter(): number {
    return this.tasks.filter((task) => task.done).length;
  }

  get leftTasksCounter(): number {
    return this.tasks.filter((task) => !task.done).length;
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

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number) {
    this.tasksPerPage = Number(newSize);
    this.changePage(1);
  }

  add(task: Task) {
    this.service.addTask(task).subscribe((data) => {
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
