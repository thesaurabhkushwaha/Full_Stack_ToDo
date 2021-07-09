import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { ListTodosComponent } from './components/list-todos/list-todos.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodoComponent } from './components/todo/todo.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  { path: '', redirectTo : '/login',pathMatch : 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent, canActivate:[RouteGuardService]},
  { path: 'welcome/:name', component: WelcomeComponent, canActivate:[RouteGuardService]},
  { path: 'todos', component: ListTodosComponent, canActivate:[RouteGuardService]},
  { path: 'todos/:id', component: TodoComponent, canActivate:[RouteGuardService]},
  { path: 'matlogin', component: LoginFormComponent},
  { path: 'matnav', component: NavbarComponent},
  { path: '**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
