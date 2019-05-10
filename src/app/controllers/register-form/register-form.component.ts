import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AlertService} from '../../services/alert.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {

    registerForm: FormGroup;

    name: any;
    login: any;
    email: any;
    password: any;
    password_confirmation: any;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private alert: AlertService,
                private router: Router,
                private alertController: AlertController) {
    }

    ngOnInit() {
        this.initRegForm();
    }

    ionViewDidEnter() {
        this.presentAlertPrompt();
    }

    initRegForm() {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            login: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/[A-z]/)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
            invite_code: ['', []]
        });

        this.name = this.registerForm.controls['name'];
        this.login = this.registerForm.controls['login'];
        this.email = this.registerForm.controls['email'];
        this.password = this.registerForm.controls['password'];
        this.password_confirmation = this.registerForm.controls['password_confirmation'];

    }

    register() {
        if (this.registerForm.invalid || this.registerForm.value.password !== this.registerForm.value.password_confirmation) {
            this.formInvalid();
        } else {
            this.authService.registrationProfile(this.registerForm.value).subscribe(res => {
                if (res.status === 1) {
                    this.alert.onAlert('success', res.msg);
                } else {
                    this.alert.onAlert('error', res.msg);
                }
            }, error => {
                this.alert.onAlert('error', 'Ошибка регистрации!');
            });
        }
    }

    loginAccount() {
        this.router.navigate(['login-form']);
    }

    onBack() {
        this.router.navigate(['login-form']);
    }

    async presentAlertPrompt() {
        const alert = await this.alertController.create({
            header: 'Промокод',
            message: 'Введите пригласительный код и получите бонусы за регистрацию!',
            inputs: [
                {
                    name: 'invite_code',
                    type: 'number',
                    placeholder: 'Введите код'
                }
            ],
            buttons: [
                {
                    text: 'Отмена',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Ок',
                    handler: (data) => {
                        this.registerForm.get('invite_code').setValue(data.invite_code);
                    }
                }
            ]
        });

        await alert.present();
    }


    formInvalid() {
        this.name.touched = true;
        this.login.touched = true;
        this.email.touched = true;
        this.password.touched = true;
        this.password_confirmation.touched = true;
    }
}
