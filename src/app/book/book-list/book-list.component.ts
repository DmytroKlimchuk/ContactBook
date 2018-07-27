import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Response } from '@angular/http';
import { DataStorageService } from '../../shared/data-storage.service';
import { BookService } from '../book.service';
import { Book } from '../book.model';
declare const $: any;

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

    this.subscription = this.BookService.recordsChanged
    .subscribe(
      (items: Book[]) => {
        this.allRecords = items;
        this.records = this.allRecords;
      }
    );

    this.allRecords = this.BookService.getRecords();
    this.records = this.allRecords;
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

    this.DataStorageService.saveData()
    .subscribe(
      (response: Response) => {
        console.log(response);
      }
    );

  }

  onRecordsChanged(items: Book[]) {
    this.records = items;
  }

}
