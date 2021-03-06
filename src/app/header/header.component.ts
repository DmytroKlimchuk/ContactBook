import { Component, OnInit } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { BookService } from '../book/book.service';
import { AuthService } from '../user/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { data } from '../book/data';
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  show = false;
  subscription: Subscription;
  private toExport = [];
  private items = data;

  constructor(
                private BookService: BookService,
                private AuthService: AuthService
              ) { }

  ngOnInit() {

    $(document).ready(function() {
      $('.sidenav').sidenav();
    });

    this.subscription = this.AuthService.AuthState
    .subscribe(
      ( state: boolean ) => {
        this.show = state;
      }
    );

  }

  export () {

    let elements = document.querySelectorAll('.checkbox:checked');
    let items = Array.from(elements);

    if (!items.length) {
      swal(
        'Не вибрано дані!',
        'Необхідно вказати, які дані необхідно експортувати',
        'info'
      );
    } else {
      for (let i = 0; i < items.length; i++) {
        this.toExport.push(this.BookService.getRecordById(items[i].getAttribute('value')));
      }
      new Angular5Csv(this.toExport, 'My contacts');
    }

  }

  import () {
    this.BookService.setRecords(this.items);
  }

  logout () {
    this.AuthService.logout();
  }

}
