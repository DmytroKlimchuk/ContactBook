import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Залежності
import { BookComponent } from './book/book.component';
import { ViewComponent } from './modal/view/view.component';
import { AddComponent } from './modal/add/add.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: '', component: BookComponent},
  { path: 'view/:id', component: ViewComponent, outlet: 'popup'},
  { path: 'edit/:id', component: AddComponent, outlet: 'popup'},
  { path: 'add', component: AddComponent, outlet: 'popup'},
  { path: 'login', component: LoginComponent}
];

export const routeComponents = [
  BookComponent,
  ViewComponent,
  AddComponent,
  LoginComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})

export class RoutingrModule { }
