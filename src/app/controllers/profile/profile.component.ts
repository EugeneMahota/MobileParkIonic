import {Component} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {AlertService} from '../../services/alert.service';
import {User} from '../../models/user';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent {

    user: User = new User();
    quantityVisit: number;

    constructor(private profileService: ProfileService, private alert: AlertService, private socialSharing: SocialSharing) {
    }

    ionViewWillEnter() {
        this.profileService.getUser().subscribe(res => {
            this.user = res.user;
        }, error => {
            this.alert.onAlert('error', 'Ошибка получения.');
        });
        this.profileService.getQuantityVisit().subscribe(res => {
            this.quantityVisit = res;
        }, error => {
            this.alert.onAlert('error', 'Ошибка получения.');
        });
    }

    async shareWhatsApp() {
        this.profileService.getInvite().subscribe(res => {
            if (res.status === 1) {
                this.socialSharing.shareViaWhatsApp(
                    'Скачай приложение ParkPay, введи промокод ' + '"' + res.msg + '"' + ' и получи 50 бонусов на аттракционы.',
                    null,
                    'https://play.google.com/store/apps/details?id=com.rovio.angrybirds')
                    .then(() => {

                    }).catch((e) => {
                    this.alert.onAlert('error', 'Ошибка отправления.');
                });
            } else if (res.status === 0) {
                this.alert.onAlert('error', res.msg);
            }
        }, error => {
            this.alert.onAlert('error', 'Ошибка получения.');
        });
    }
}
