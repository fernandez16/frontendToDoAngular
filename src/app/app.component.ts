import { Component } from '@angular/core';
import { ToDoItem } from './toDoItem';
import { ToDoList } from './toDoList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  private list = new ToDoList('AA', [
    new ToDoItem('Going to the grocery store', true),
    new ToDoItem('Jogging'),
    new ToDoItem('Traveling', false),
  ]);

  showComplete = false;

  // username is an attribute that doesn´t have to be declared explicitly
  get username(): string {
    return this.list.user;
  }

  get itemCount(): number {
    return this.list.items.filter(item => item.complete).length;
  }

  get items(): readonly ToDoItem[]{
    return this.list.items;
  }

  addItem(newItem: string){
    if (newItem!="") {
      this.list.addItem(newItem)
    }
  }

}
