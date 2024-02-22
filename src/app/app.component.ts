import { Component, inject } from '@angular/core';

import { TodoStateService } from './services/todo-state.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { Todo } from './interfaces/Todo';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    //Components
    TodoListComponent,
    TodoFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  
  private todoStateService = inject(TodoStateService);
  private dialog = inject(MatDialog);

  todoSignal = this.todoStateService.todoState;

  openForm(){
    let dialogRef = this.dialog.open(TodoFormComponent, {
      data: {title: "Adicionar"},
      maxWidth: '600px',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(value => {
      if(value){
        //TODO: Receber o objeto da nova tarefa e postar
        this.todoStateService.updateTodoState(value);
        console.log("Dialog foi fechado e esse é ovalor emitido: ", value)
      }
    });
  }

  markAsDoneTask(todo: Todo) {
    this.todoStateService.markAsDoneTask(todo);
  }

  editTask(todo: Todo) {
    let dialogRef = this.dialog.open(TodoFormComponent, {
      data: {title: "Editar", editarTask: todo},
      maxWidth: '600px',
      width: '100%'
    });

    dialogRef.afterClosed().subscribe(value => {
      if(value){
        //TODO: Receber o objeto da nova tarefa e postar
        this.todoStateService.editTask(todo, value);
        console.log("Dialog foi fechado e esse é ovalor emitido: ", value)
      }
    });
    
  }

  deleteTask(todo: Todo) {
    this.todoStateService.deleteTask(todo);
  }

}