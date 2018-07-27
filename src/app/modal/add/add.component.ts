import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Response } from '@angular/http';
import { BookService } from '../../book/book.service';
import { DataStorageService } from '../../shared/data-storage.service';
declare const $: any;
declare const M: any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  id: number;
  editMode = false;
  bookForm: FormGroup;

  constructor(  private route: ActivatedRoute,
                private router: Router,
                private BookService: BookService,
                private DataStorageService: DataStorageService ) { }

  ngOnInit() {

    $(document).ready(function() {
      $('select').formSelect();
    });

    this.route.params.subscribe( (params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });

  }

  onSubmit () {
    if (this.editMode) {
      this.BookService.updateRecord(this.id, this.bookForm.value);
    } else {
      this.BookService.addRecord(this.bookForm.value);
    }

    this.DataStorageService.saveData()
    .subscribe(
      (response: Response) => {
        console.log(response);
      }
    );

    this.router.navigate(['/']);
  }

  initForm () {
    let surname = '';
    let name = '';
    let country = '';
    let city = '';
    let email = '';
    let mobile;
    let company = '';

    if (this.editMode) {
      const record = this.BookService.getRecordById(this.id);
      surname = record.surname;
      name = record.name;
      country = record.country;
      city = record.city;
      email = record.email;
      mobile = record.mobile;
      company = record.company;
    }

    this.bookForm = new FormGroup({
      'surname': new FormControl(surname, Validators.required),
      'name': new FormControl(name, Validators.required),
      'country': new FormControl(country),
      'city': new FormControl(city),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'mobile': new FormControl(mobile, [ Validators.required, Validators.pattern('\\d+') ]),
      'company': new FormControl(company)
    });
  }

}
