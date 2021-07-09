import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicAuthenticationService } from 'src/app/services/basic-AuthenticationService';
import { TodoDataService } from 'src/app/services/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id: number;
  todo: Todo;
  action = "";

  todoForm;

  constructor(private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router,
    private basicAuth: BasicAuthenticationService,
    private fb: FormBuilder) { }

  
  // todoForm = new FormGroup({
  //   task: new FormControl(''),
  //   targetDate: new FormControl(''),
  //   completed: new FormControl(false)
  // });


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(this.id, "", new Date(), false); // dummy object to avoid error - task undefined

    if (this.id != -1)
      this.todoService.getTodo(this.basicAuth.getAuthenticatedUser(), this.id).subscribe(
        response => this.todoForm.patchValue(response)
      )
    
    this.todoForm = this.fb.group({
        id: [this.id],
        task: ['', [Validators.required, Validators.minLength(5)]],
        targetDate: [''],
        completed: [false]
      })
  }

  saveTodo() {
    //this.action = "Add"
    if (this.id == -1) {
      this.todoService.addTodo(this.basicAuth.getAuthenticatedUser(), this.todoForm.value)
        .subscribe(
          response => {
            console.log(response)
            this.router.navigate(['todos'])
          }
        )
    }
    else {
      // this.action = "Update",
      this.todoService.updateTodo(this.basicAuth.getAuthenticatedUser(), this.id, this.todoForm.value)
        .subscribe(
          response => {
            console.log(response)
            this.router.navigate(['todos'])
          }
        )
    }
  }

  customValidator(control: AbstractControl) {
    let trimmed = control.value.trim();
    console.log("TASK LENGTH: " + control.value.length + " TRIMMED TASK LENGTH: " + trimmed.length);
    return control.value.length != trimmed.length;
  }
}
