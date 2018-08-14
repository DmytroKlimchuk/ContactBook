import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import { DataStorageService } from '../../shared/data-storage.service';
import { BookService } from '../book.service';
import { Book } from '../book.model';
declare const $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  allRecords: Book[];
  records: Book[];
  showCheckbox = false;
  filter = false;

  subscription: Subscription;

  constructor(
    private BookService: BookService,
    private DataStorageService: DataStorageService
  ) { }

  ngOnInit() {

    $(document).ready(function() {
      $('.modal').modal();
    });

    this.allRecords = this.BookService.getRecords();
    this.records = this.allRecords;

    this.subscription = this.BookService.recordsChanged
    .subscribe(
      (items: Book[]) => {
        this.allRecords = items;
        this.records = this.allRecords;
        this.onSave();
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showCheckBoxes() {
    this.showCheckbox = !this.showCheckbox;
  }

  showFilter() {
    this.filter = !this.filter;
  }

  checkRecord(index) {
    if (this.showCheckbox) {
      const el: any = document.getElementById('check_' + index);
      el.checked = !el.checked;
    }
  }

  checkAll(e) {
    const els: any = document.querySelectorAll('.checkbox');
    const target = e.target.checked;

    for (let i = 0; i < els.length; i++) {
      els[i].checked = target;
    }

  }

  onDelete(i) {
    this.BookService.deleteRecord(i);

    swal(
      'Видалено!',
      'Контакт успішно видалено',
      'success'
    );

  }

  onRecordsChanged(items: Book[]) {
    this.records = items;
  }

  deleteSelected() {
    let elements = document.querySelectorAll('.checkbox:checked');
    let items = Array.from(elements);

    if (items.length) {
      for (let i = 0; i < items.length; i++) {
        this.BookService.deleteRecord(items[i].getAttribute('value'));
      }
      swal('Обрані контакти успішно видалено', '', 'success');
    } else {
      swal('Необхідно вказати, які контакти видалити', '', 'info');
    }


  }

  onSave() {

    this.DataStorageService.saveData()
    .subscribe(
      (response: Response) => {
        console.log(response);
      }
    );

  }

}
