import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
declare const $: any;

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {

  @Input('records') records: Book[];
  @Output() recordsChanged = new EventEmitter<Book[]>();

  @ViewChild('name') name: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('mobile') mobile: ElementRef;
  @ViewChild('city') city: ElementRef;

  filtered: Book[];
  cities;

  constructor(
    private BookService: BookService
  ) { }

  ngOnInit() {

    $(document).ready(function() {
      $('select').formSelect();
    });

    this.cities = this.BookService.getCities();
    this.filtered = this.records;

  }

  search(e) {
    const str_name: string = this.name.nativeElement.value;
    const str_mail: string = this.email.nativeElement.value;
    const str_phone: string = this.mobile.nativeElement.value;
    const str_city: string = this.city.nativeElement.value;

    this.filtered = this.records.filter( (item) => {

      const fullName = (item.name + ' '  + item.surname).toLowerCase();
      const mail = item.email.toLowerCase();
      const phone = item.mobile.toString();

      return fullName.indexOf(str_name) >= 0 && mail.indexOf(str_mail) >= 0 && phone.indexOf(str_phone) >= 0 && item.city.indexOf(str_city) >=0;
    });

    this.recordsChanged.emit(this.filtered);
  }

}