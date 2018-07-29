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
    SweetAlert2Module.forRoot()
  ],
  providers: [ BookService, DataStorageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
