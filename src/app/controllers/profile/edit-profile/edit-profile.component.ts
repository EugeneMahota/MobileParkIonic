import {Component, OnInit} from '@angular/core';
import {ConfirmService} from '../../../services/confirm.service';
import {AlertService} from '../../../services/alert.service';
import {AuthService} from '../../../services/auth.service';
import {ProfileService} from '../../../services/profile.service';
import {User} from '../../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

    user: User = new User();
    userForm: FormGroup;

    phone: any;
    birthday: any;
    name: any;
    email: any;

    constructor(private confirm: ConfirmService,
                private alert: AlertService,
                private fb: FormBuilder,
                private router: Router,
                private authService: AuthService,
                private profileService: ProfileService) {
    }

    ngOnInit() {
        this.initFormUser();
    }

    ionViewWillEnter() {
        this.getUser();
    }

    initFormUser() {
        this.userForm = this.fb.group({
            phone: ['', [Validators.minLength(11), Validators.maxLength(11)]],
            birthday: ['', []],
            name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
        });

        this.phone = this.userForm.controls['phone'];
        this.birthday = this.userForm.controls['birthday'];
        this.name = this.userForm.controls['name'];
        this.email = this.userForm.controls['email'];
    }

    getUser() {
        this.profileService.getUser().subscribe(res => {
            if (!res.user) {
                this.alert.onAlert('error', 'Ошибка получения данных!');
            } else {
                this.user = res.user;
                this.userForm.setValue({
                    phone: this.user.phone,
                    birthday: this.user.birthday,
                    name: this.user.name,
                    email: this.user.email
                });
            }
        }, error => {
            this.alert.onAlert('error', 'Ошибка получения данных!');
        });
    }

    editProfile(user: User) {
        if (this.userForm.invalid) {
            this.formInvalid();
        } else {
            this.profileService.editUser(user).subscribe(res => {
                if (res.status === 1) {
                    this.alert.onAlert('success', res.msg);
                } else if (res.status === 0) {
                    this.alert.onAlert('error', res.msg);
                }
            });
        }
    }


    onBack() {
        this.router.navigate(['menu', 'profile']);
    }

    onExit() {
        let observer;

        observer = this.confirm.openConfirm('Вы уверены что хотите выйти из аккаунта?').subscribe(res => {
            if (res === true) {
                this.authService.exitAccount();
                observer.unsubscribe();
            } else if (res === false) {
                observer.unsubscribe();
            }
        });
    }

    formInvalid() {
        this.phone.touched = true;
        this.birthday.touched = true;
        this.name.touched = true;
        this.email.touched = true;
    }

    infoBirthday() {
        this.alert.onInfoAlert(
            'День рождения',
            'Каждому пользователю мы дарим 20 бонусов в день рождения, установить дату можно только один раз.',
            null);
    }
}
