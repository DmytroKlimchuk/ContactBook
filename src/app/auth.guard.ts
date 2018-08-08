import { Injectable } from '@angular/core';
import { CanActivate, Router  } from '@angular/router';
import { AuthService } from './user/auth.service';
import swal from 'sweetalert2';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public auth: AuthService, public router: Router) {}

    canActivate() {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            swal({
                type: 'error',
                title: 'Нема доступу',
                text: 'Для перегляду сторінки авторизуйтеся'
              });
            return false;
        }
        return true;
    }
}
