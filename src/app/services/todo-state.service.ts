import { Injectable, effect, signal } from '@angular/core';
import { Todo } from '../interfaces/Todo';
import { LocalStorageTodo } from '../interfaces/LocalStorageTodo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoStateService {

  todoState = signal<Todo[]>([]);
  
  constructor(){
    let todoFromLocalStorage = localStorage.getItem(LocalStorageTodo.todolist);
    if(todoFromLocalStorage)
      this.todoState.set(JSON.parse(todoFromLocalStorage));
  }

  updateTodoState(todo: Todo){
    //TODO: Reeber um valor e atualizar o signal
    this.todoState.update(value => {
      value.push(todo);
      return value;
    });
    this.saveTodoInLocalStorage();
  }

  markAsDoneTask(todo: Todo) {
    this.todoState.update(value => {
      let itemIndex = value.findIndex(item => item == todo);
      
      itemIndex != null ? value[itemIndex].done = !value[itemIndex].done : '';
      this.saveTodoInLocalStorage();
      return value;
    })
  }

  editTask(oldTask: Todo, editedTasktodo: Todo) {
    this.todoState.update(value => {
      let itemIndex = value.findIndex(item => item == oldTask);
      
      if(itemIndex != null){
        value[itemIndex].title = editedTasktodo.title
        value[itemIndex].description = editedTasktodo.description
        this.saveTodoInLocalStorage();
      }
      return value;
    })
  }

  deleteTask(todo: Todo) {
    this.todoState.update(value => value.filter(item => item != todo));
    this.saveTodoInLocalStorage();
  }

  saveTodoInLocalStorage(){
    if(this.todoState().length === 0){
      localStorage.removeItem(LocalStorageTodo.todolist);
      return;
    }
    localStorage.setItem(LocalStorageTodo.todolist, JSON.stringify(this.todoState()));
  }
}
