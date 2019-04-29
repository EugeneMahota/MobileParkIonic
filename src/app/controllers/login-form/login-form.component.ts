import {Component, OnInit} from '@angular/core';
import {Login} from '../../models/login';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

    user: Login = new Login();

    constructor(private router: Router, private alertService: AlertService, private authService: AuthService) {
    }

    ngOnInit() {
        this.user.save = true;

        if (localStorage.getItem('user')) {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
    }

    login() {
        this.authService.login(this.user).subscribe(res => {
        }, error => {
            if (error) {
                this.alertService.onAlert('error', 'Ошибка авторизации!');
            }
        });

        if (this.user.save) {
            localStorage.setItem('user', JSON.stringify(this.user));
        }

    }

    createAccount() {
        this.router.navigate(['register-form']);
    }

}
