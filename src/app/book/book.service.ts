import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Book } from './book.model';
import { data } from './data';
declare const M: any;
declare const $: any;

@Injectable()
export class BookService {
  recordsChanged = new Subject<Book[]>();

  private records: Book[] = [];


  constructor() { }

  getRecords() {
    return this.records.slice();
  }

  setRecords(items: Book[]) {
    this.records = items;
    this.recordsChanged.next(this.records.slice());
  }

  getCities() {
    const cities = new Set();

    this.records.forEach( (item) => {
      cities.add(item.city);
    });

    return cities;
  }

  getRecordById(id) {
    return this.records[id];
  }

  updateRecord(id, form) {
    this.records[id] = form;
    M.toast({html: 'Оновлено контакт'});
    this.recordsChanged.next(this.records.slice());
  }

  deleteRecord(id) {
    this.records.splice(id, 1);
    M.toast({html: 'Видалено контакт'});
    this.recordsChanged.next(this.records.slice());
  }

  addRecord(item) {
    console.log('add');
    this.records.push(item);
    M.toast({html: 'Додано новий контакт'});
    this.recordsChanged.next(this.records.slice());
  }
}
