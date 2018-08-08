import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthState = new Subject();
  user: firebase.User = null;

  constructor(  private firebaseAuth: AngularFireAuth,
                private router: Router ) {

    firebaseAuth.authState.subscribe( user => {
      this.user = user;
      console.log(this.user);
    });

  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        swal({
          type: 'error',
          title: 'Помилка',
          text: err.message
        });
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        swal(
          'Авторизація пройшла успішно!',
          '',
          'success'
        ).then(() => {
          this.AuthState.next(this.isAuthenticated());
          this.router.navigate(['/']);
        });
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        swal(
          {
            type: 'error',
            title: 'Помилка',
            text: err.message
          }
        );
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut().then(() => {
        this.router.navigate(['login']);
        this.AuthState.next(false);
      });
  }

  isAuthenticated (): boolean {

    if ( this.user != null ) {
      return true;
    } else {
      return false;
    }

  }

}
