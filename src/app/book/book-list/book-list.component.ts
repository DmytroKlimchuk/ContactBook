import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  allRecords: Book[];
  records: Book[];
  showCheckbox = false;
  filter = true;

  constructor(
    private BookService: BookService
  ) { }

  ngOnInit() {
    this.allRecords = this.BookService.getRecords();
    this.records = this.allRecords;
  }

  showCheckBoxes() {
    this.showCheckbox = !this.showCheckbox;
  }

  showFilter() {
    this.filter = !this.filter;
  }

  checkRecord(index) {
    const el: any = document.getElementById('check_' + index);
    el.checked = !el.checked;
  }

  checkAll(e) {
    const els: any = document.querySelectorAll('.checkbox');
    const target = e.target.checked;

    for (let i = 0; i < els.length; i++) {
      els[i].checked = target;
    }

  }

  onRecordsChanged(items: Book[]) {
    this.records = items;
  }

}
