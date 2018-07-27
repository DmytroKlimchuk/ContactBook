import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Book } from '../book/book.model';
import { BookService } from '../book/book.service';

declare const M: any;
declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http, private BookService: BookService) {}

  saveData() {
    M.toast({html: 'Дані збережено на сервері'});
    return this.http.put('https://contact-book-8a6b9.firebaseio.com/book.json', this.BookService.getRecords());
  }

  getData() {
    this.http.get('https://contact-book-8a6b9.firebaseio.com/book.json')
      .map(
        (response: Response): Book[] => {
          const records: Book[] = response.json();
          return records;
        }
      )
      .subscribe(
        (records: Book[]) => {
          this.BookService.setRecords(records);
          M.toast({html: 'Дані загружено з сервера'});
        }
      );
  }


}
