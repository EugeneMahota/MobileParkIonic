import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../../../services/profile.service';
import {AlertService} from '../../../services/alert.service';
import {IonContent, IonSlides} from '@ionic/angular';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {

    listBonus: any[] = [];
    listMoney: any[] = [];

    segment: number = 0;
    slideOpts = {
        initialSlide: 0,
        speed: 200
    };

    @ViewChild('slider') slider: IonSlides;
    @ViewChild('content') content: IonContent;
    scrollTop: number;


    constructor(private router: Router, private profileService: ProfileService, private alert: AlertService) {
    }

    ionViewWillEnter() {
        this.getTransactionMoney();
        this.getTransactionBonus();
    }

    onBack() {
        this.router.navigate(['menu', 'profile']);
    }

    getTransactionMoney() {
        this.profileService.getTransactionsMoney().subscribe(res => {
            if (res.length > 0) {
                this.listMoney = res.reverse();
            } else {
                this.listMoney = [];
            }
        }, error => {
            this.alert.onAlert('error', 'Ошибка получения данных.');
        });
    }

    getTransactionBonus() {
        this.profileService.getTransactionsBonus().subscribe(res => {
            if (res.length > 0) {
                this.listBonus = res.reverse();
            } else {
                this.listBonus = [];
            }
        }, error => {
            this.alert.onAlert('error', 'Ошибка получения данных.');
        });
    }

    async segmentChanged() {
        await this.slider.slideTo(this.segment);
        await this.content.scrollToTop(this.scrollTop);
    }

    async slideChanged() {
        this.segment = await this.slider.getActiveIndex();
        this.content.scrollToTop(this.scrollTop);
    }

    logScrolling(event) {
        this.scrollTop = event.detail.scrollTop;
    }
}
