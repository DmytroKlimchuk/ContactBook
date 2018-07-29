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

  getRecordById(id): Book {
    return this.records.find(item => item.id == id);
  }

  getRecordByEmail(email): Book {
    return this.records.find(item => item.email == email);
  }

  updateRecord(id, form) {
    for (let i in this.records) {
      if (this.records[i].id == id) {
        this.records[i] = form;
        this.records[i].id = id;
        console.log(this.records[i]);
        break;
      }
    }

    M.toast({html: 'Оновлено контакт'});
    this.recordsChanged.next(this.records);
  }

  deleteRecord(id) {
    this.records = this.records.filter(item => item.id != id);
    M.toast({html: 'Видалено контакт'});
    this.recordsChanged.next(this.records.slice());
  }

  addRecord(item) {
    console.log('add');
    item.id = this.getLastId() + 1;

    this.records.push(item);
    M.toast({html: 'Додано новий контакт'});
    this.recordsChanged.next(this.records.slice());
  }

  getLastId() {
    return +this.records[this.records.length - 1].id;
  }

}
