import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
//Залежності
import { BookComponent } from './book/book.component';
import { ViewComponent } from './modal/view/view.component';
import { AddComponent } from './modal/add/add.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  { path: '', component: BookComponent, canActivate: [AuthGuard]},
  { path: 'view/:id', component: ViewComponent, outlet: 'popup', canActivate: [AuthGuard]},
  { path: 'edit/:id', component: AddComponent, outlet: 'popup'},
  { path: 'add', component: AddComponent, outlet: 'popup'},
  { path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '/book' }
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
  providers: [AuthGuard],
  declarations: []
})

export class RoutingrModule { }
