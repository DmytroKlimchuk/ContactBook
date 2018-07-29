import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Book } from './book.model';
import { data } from './data';
import swal from 'sweetalert2';
declare const M: any;
declare const $: any;

@Injectable()
export class BookService {
  recordsChanged = new Subject<Book[]>();

  private records: Book[] = [];

  constructor() { }

  getRecords() {
    return this.records;
  }

  setRecords(items: Book[]) {
    this.records = items;
    this.recordsChanged.next(this.records);
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
    swal('Контакт успішно оновлено!', '', 'success');
    this.recordsChanged.next(this.records);
  }

  deleteRecord(id) {
    this.records = this.records.filter(item => item.id != id);
    this.recordsChanged.next(this.records);
  }

  addRecord(item) {
    console.log('add');
    item.id = this.getLastId() + 1;
    this.records.push(item);
    swal('Новий контакт додано!', '', 'success');
    this.recordsChanged.next(this.records);
  }

  getLastId() {
    return +this.records[this.records.length - 1].id;
  }

}
