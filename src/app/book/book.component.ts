import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private AuthService: AuthService, private router: Router) {  }


  ngOnInit() {

    if ( !this.AuthService.user ) {
      swal('Помилка доступу!', 'Для перегляду контактів потрібно авторизуватися', 'warning');
      this.router.navigate(['login']);
      console.log(this.AuthService.user);
    }
  }

}
