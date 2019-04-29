import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AlertService} from '../../services/alert.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

    registerForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private alert: AlertService, private router: Router) {
    }

    ngOnInit() {
        this.initRegForm();
    }

    initRegForm() {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            login: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/[A-z]/)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    register() {
        this.authService.registrationProfile(this.registerForm.value).subscribe(res => {
            if (res.status === 1) {
                this.alert.onAlert('success', res.msg);
                this.authService.login({login: this.registerForm.value.login, password: this.registerForm.value.password, save: true})
                    .subscribe(res => {
                    }, error => {
                        this.alert.onAlert('error', res.msg);
                    });
            } else {
                this.alert.onAlert('error', res.msg);
            }
        }, error => {
            this.alert.onAlert('error', 'Ошибка регистрации!');
        });
    }

    loginAccount() {
        this.router.navigate(['login-form']);
    }
}
