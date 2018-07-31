import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { DataStorageService } from './shared/data-storage.service';
import { BookService } from './book/book.service';
import { BookFilterComponent } from './book/book-filter/book-filter.component';
import { RoutingrModule, routeComponents } from './router.module';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from './user/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BookListComponent,
    BookFilterComponent,
    ...routeComponents
  ],
  imports: [
    BrowserModule,
    RoutingrModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SweetAlert2Module.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [ BookService, DataStorageService, AuthService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
