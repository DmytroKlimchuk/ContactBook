import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Залежності
import { BookComponent } from './book/book.component';
import { ViewComponent } from './modal/view/view.component';
import { AddComponent } from './modal/add/add.component';

const routes: Routes = [
  { path: '', component: BookComponent},
  { path: 'view/:id', component: ViewComponent, outlet: 'popup'},
  { path: 'add', component: AddComponent, outlet: 'popup'}
];

export const routeComponents = [
  BookComponent,
  ViewComponent,
  AddComponent
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
