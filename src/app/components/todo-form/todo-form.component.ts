import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {

  private dialogRef = inject(MatDialogRef);
  private MAT_DIALOG_DATA = inject(MAT_DIALOG_DATA);

  titleForm!: string;

  taskForm!: FormGroup;

  ngOnInit(){
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.minLength(10)])
    })
    console.log(this.MAT_DIALOG_DATA);
    
    if(this.MAT_DIALOG_DATA){
      this.titleForm = this.MAT_DIALOG_DATA.title;
    }

    if(this.MAT_DIALOG_DATA.editarTask){
      this.taskForm.patchValue({title: this.MAT_DIALOG_DATA.editarTask.title});
      this.taskForm.patchValue({description: this.MAT_DIALOG_DATA.editarTask.description});
    }
  }

  get title(){
    return this.taskForm.get("title")!;
  }

  get description(){
    return this.taskForm.get("description")!;
  }

  submitForm(){
    console.log(this.description?.errors);
    
    if(this.taskForm.valid){
      let taskObj = {
        ...this.taskForm.value,
        done: false
      }
      this.dialogRef.close(taskObj);
    }
  }
}
