import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ProfileService} from '../../../services/profile.service';
import {AlertService} from '../../../services/alert.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {

    segment: boolean;

    listBonus: any[] = [];
    listMoney: any[] = [];

    constructor(private router: Router, private profileService: ProfileService, private alert: AlertService) {
    }

    ionViewWillEnter() {
        this.segment = false;
        this.getTransactionMoney();
        this.getTransactionBonus();
    }

    onBack() {
        this.router.navigate(['menu', 'profile']);
    }

    getTransactionMoney() {
        this.profileService.getTransactionsMoney().subscribe(res => {
            console.log(res);
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
            console.log(res);
            if (res.length > 0) {
                this.listBonus = res.reverse();
            } else {
                this.listBonus = [];
            }
        }, error => {
            this.alert.onAlert('error', 'Ошибка получения данных.');
        });
    }
}
