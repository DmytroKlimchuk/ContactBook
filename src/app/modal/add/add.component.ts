import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from '../../book/book.service';
import swal from 'sweetalert2';
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
                private BookService: BookService) { }

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

      let item = this.BookService.getRecordByEmail(this.bookForm.value.email);
      if (item) {

        swal({
            title: 'Контакт з вказаним E-mail вже існує!',
            text: 'Ви хочете замінити його чи створити новий?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Так, замінити',
            cancelButtonText: 'Створити новий'
          }).then((result) => {
            if (result.value) {

              this.BookService.updateRecord(item.id, this.bookForm.value);

            } else if (result.dismiss === swal.DismissReason.cancel) {

              this.BookService.addRecord(this.bookForm.value);

            }
        });

      } else {
        this.BookService.addRecord(this.bookForm.value);
      }

    }

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
      let record = this.BookService.getRecordById(this.id);
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
