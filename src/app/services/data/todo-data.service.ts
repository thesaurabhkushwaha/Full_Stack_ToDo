import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_JPA } from 'src/app/app.constants';
import { Todo } from 'src/app/components/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http:HttpClient) { }

  getAllTodos(username: String){
    return this.http.get<Todo[]>(`${API_URL_JPA}/users/${username}/todos`)
  }

  getTodo(username, id){
    return this.http.get<Todo>(`${API_URL_JPA}/users/${username}/todo/${id}`)
  }

  updateTodo(username, id, todo){
    return this.http.put<Todo>(`${API_URL_JPA}/users/${username}/todo/${id}`, todo)
  }

  addTodo(username, todo){
    return this.http.post<Todo>(`${API_URL_JPA}/users/${username}/todo`, todo)
  }

  deleteTodo(username, id){
    return this.http.delete<Todo>(`${API_URL_JPA}/users/${username}/todo/${id}`)
  }
}
