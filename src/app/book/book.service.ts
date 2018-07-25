import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Book } from './book.model';
import { data } from './data';

@Injectable()
export class BookService {
  recordsChanged = new Subject<Book[]>();

  private records: Book[] = data;

  constructor() { }

  getRecords() {
    return this.records.slice();
  }

  setRecords(items: Book[]) {
    this.records = items;
    this.recordsChanged.next(this.records.slice());
    console.log(this.records);
  }

  getCities() {
    const cities = new Set();

    this.records.forEach( (item) => {
      cities.add(item.city);
    });

    return cities;
  }

}
