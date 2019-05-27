import {Component} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {AlertService} from '../../services/alert.service';
import {User} from '../../models/user';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {Instagram} from '@ionic-native/instagram/ngx';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss']
})
export class ProfileComponent {

    user: User = new User();
    quantityVisit: number;

    constructor(private profileService: ProfileService,
                private alert: AlertService,
                private socialSharing: SocialSharing,
                private instagram: Instagram,
                private alertController: AlertController) {
    }

    ionViewWillEnter() {
        this.profileService.getUser().subscribe(res => {
            this.user = res.user;
        }, error => {
            this.alert.onAlert('error', 'Ошибка получения данных.');
        });
        this.profileService.getQuantityVisit().subscribe(res => {
            this.quantityVisit = res;
        }, error => {
            this.alert.onAlert('error', 'Ошибка получения данных.');
        });
    }

    async presentAlertMultipleButtons() {
        const alert = await this.alertController.create({
            header: 'Социальные сети',
            buttons: [
                {
                    text: 'WhatsApp',
                    handler: () => {
                        this.shareWhatsApp();
                    }
                },
                {
                    text: 'Instagramm',
                    handler: () => {
                        this.shareInstagram();
                    }
                },
                {
                    text: 'Facebook',
                    handler: () => {
                        this.shareFacebook();
                    }
                }
            ]
        });

        await alert.present();
    }

    async shareWhatsApp() {
        this.profileService.getInvite().subscribe(res => {
            if (res.status === 1) {
                this.socialSharing.shareViaWhatsApp(
                    'Скачай приложение Изи Парк, введи промокод ' + res.msg + ' и получи 20 бонусов на аттракционы.',
                    null,
                    null)
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

    async shareFacebook() {
        this.profileService.getInvite().subscribe(res => {
            if (res.status === 1) {
                this.socialSharing.shareViaFacebook(
                    'Скачай приложение Изи Парк, введи промокод ' + res.msg + ' и получи 20 бонусов на аттракционы.',
                    null,
                    null)
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

    shareInstagram() {
        this.instagram.share('data:image/jpg;card.jpg', 'Заголовок')
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                this.alert.onAlert('error', 'Ошибка отправления.');
            });
    }
}
