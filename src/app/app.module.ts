import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BookListComponent } from './book/book-list/book-list.component';

import { BookService } from './book/book.service';
import { BookFilterComponent } from './book/book-filter/book-filter.component';
import { ModifyComponent } from './book/modify/modify.component';

import { RoutingrModule, routeComponents } from './router.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BookListComponent,
    BookFilterComponent,
    ModifyComponent,
    ...routeComponents
  ],
  imports: [
    BrowserModule,
    RoutingrModule
  ],
  providers: [ BookService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
