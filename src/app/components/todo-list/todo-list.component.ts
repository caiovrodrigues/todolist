import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'
import { MatCardModule } from '@angular/material/card';

import { Todo } from '../../interfaces/Todo';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatTabsModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() public todoList!: Todo[]
  @Output() public deleteTaskEmitter = new EventEmitter();
  @Output() public markAsDoneTaskEmitter = new EventEmitter();
  @Output() public editTaskEmitter = new EventEmitter();

  delete(todo: Todo) {
    this.deleteTaskEmitter.emit(todo);
  }

  edit(todo: Todo) {
    this.editTaskEmitter.emit(todo);
  }

  markAsDone(todo: Todo) {
    this.markAsDoneTaskEmitter.emit(todo);
  }
}
