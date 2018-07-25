import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { BookService } from '../../book/book.service';
import { Book } from '../../book/book.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id: number;
  private subscriptionId: Subscription;
  record: Book;

  constructor(private router: Router, private route: ActivatedRoute, private BookService: BookService) {

    this.subscriptionId = route.params.subscribe((params) => {
      this.id = params['id'];
      this.record = BookService.getRecordById(this.id);
    });

   }

  ngOnInit() {

  }

}
