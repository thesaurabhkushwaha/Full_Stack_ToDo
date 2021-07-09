import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BasicAuthenticationService } from 'src/app/services/basic-AuthenticationService';
import { TodoDataService } from 'src/app/services/data/todo-data.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[] = null;

  message = '';

  emptyTableMessage = '-- No tasks --';

  username: String = this.basicAuth.getAuthenticatedUser();

  columnsToDisplay = ['task', 'targetDate', 'actions'];

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // pageCounter: number = 0;
  // rowsPerPage: number = 5;
  // start = 0;
  // end = 0;
  // nextDis = false;
  // prevDis = false;

  // = [
  //   new Todo( 1,'Saurabh','Task 1', new Date(), true ),
  //   new Todo( 2,'Saurabh','Task 2', new Date(), false ),
  //   new Todo( 3,'Saurabh','Task 3', new Date(), true ),
  //   new Todo( 4,'Saurabh','Task 4', new Date(), false ),
  //   new Todo( 5,'Saurabh','Task 5', new Date(), true ),

  constructor(private router: Router, private todoService: TodoDataService, private basicAuth: BasicAuthenticationService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.initTodos();
  }

  initTodos() {
    this.todoService.getAllTodos(this.username).pipe(
      map((todos: Todo[]) => this.todos = todos)
      //map((todos: Todo[]) => this.todos = todos.slice(start, end))
    ).subscribe();
  }

  getLength() {
    return this.todos.length;
  }

  deleteTodo(id) {
    // Delete from UI
    this.todos = this.todos.filter(t => t.id !== id)
    //Delete from database
    this.todoService.deleteTodo(this.username, id).subscribe(
      response => {
        console.log("DELETE RESPONSE: " + response);
        this.message = `Todo No.${id} is deleted !`;
      }
    )
  }

  updateTodo(id) {
    this.router.navigate(['todos', id])
  }

  addTodo() {
    this.router.navigate(['todos', -1])
  }

  // nextPage() {
  //   this.prevDis = false;
  //   this.pageCounter++;
  //   console.log("NEXT TODO LENGTH, ROWS PER PAGE = "+this.todos.length +", "+ this.rowsPerPage);
  //   if( this.todos.length < this.rowsPerPage){
  //     this.nextDis = true;
  //     this.pageCounter--;
  //     return;
  //   }
  //   this.start = (this.rowsPerPage * this.pageCounter);
  //   this.end = this.start + this.rowsPerPage;

  //   console.log("NEXT PARAMETERS: PageCounter: " + this.pageCounter + " Start: " + this.start + " End: " + this.end);
  //   this.initTodos(this.start, this.end);
  // }

  // previousPage() {
  //   this.nextDis = false;
  //   this.pageCounter--;
  //   console.log("PREVIOUS TODO LENGTH, ROWS PER PAGE = "+this.todos.length +", "+ this.rowsPerPage);
  //   if (this.pageCounter < 0) {
  //     this.pageCounter = 0;
  //     this.prevDis = true;
  //     return;
  //   }
  //   this.start = (this.rowsPerPage * this.pageCounter);
  //   this.end = this.start + this.rowsPerPage;
  //   console.log("PREV PARAMETERS: PageCounter: " + this.pageCounter + " Start: " + this.start + " End: " + this.end);
  //   this.initTodos(this.start, this.end);
  // }
}

export class Todo {
  constructor(public id: number, public task: String, public targetDate: Date, public done: boolean) {

  }
}

// export class TodoDataSource extends DataSource<Todo>{
//   constructor(private todoService: TodoDataService, private basicAuth: BasicAuthenticationService) {
//     super();
//   }
//   todos: Todo[];
//   username: String = this.basicAuth.getAuthenticatedUser();
//   connect(collectionViewer: CollectionViewer): Observable<Todo[] | readonly Todo[]> {
//     return this.todoService.getAllTodos(this.username);
//   }
//   disconnect(collectionViewer: CollectionViewer): void {
//     throw new Error('Method not implemented.');
//   }

// }
