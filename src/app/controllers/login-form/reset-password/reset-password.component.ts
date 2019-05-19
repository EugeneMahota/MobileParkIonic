import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {

    email: any;

    constructor(private router: Router, private authService: AuthService, private alert: AlertService) {
    }

    ngOnInit() {
    }

    resetPassword() {
        this.authService.resetPassword({email: this.email}).subscribe(res => {
            if (res.status === 1) {
                this.alert.onAlert('success', res.msg);
                this.onBack();
            } else if (res.status === 0) {
                this.alert.onAlert('error', res.msg);
            }
        });
    }

    onBack() {
        this.router.navigate(['login-form']);
    }
}
