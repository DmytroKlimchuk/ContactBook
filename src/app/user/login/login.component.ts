import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor( private AuthService: AuthService ) { }

  ngOnInit() {
  }

  signup () {
    this.AuthService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login () {
    this.AuthService.login(this.email, this.password);
    this.password = '';
  }

  logout () {
    this.AuthService.logout();
  }

}
