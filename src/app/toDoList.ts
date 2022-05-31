import { ToDoItem } from './toDoItem';

export class ToDoList {

  constructor(public user: string, public toDoItems: ToDoItem[]) {}

  get items(): ToDoItem[]{
    return this.toDoItems;
  }

  addItem(task: string){
    this.toDoItems.push(new ToDoItem(task))
  }

}
