import {Component, OnInit} from '@angular/core';
import {QrScannerService} from '../../services/qr-scanner.service';
import {CardService} from '../../services/card.service';
import {AlertService} from '../../services/alert.service';
import {ConfirmService} from '../../services/confirm.service';

@Component({
    selector: 'app-tab2',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.scss']
})
export class CardComponent implements OnInit {

    codeCard: string;

    listCard: any[] = [];

    segment: boolean = true;

    constructor(private qrService: QrScannerService, private cardService: CardService, private alert: AlertService, private confirmService: ConfirmService) {
        this.qrService.codeCard.subscribe(code => {
            this.addCard(code);
        });
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.getListCard();
    }

    segmentChanged() {
        this.segment = !this.segment;
    }

    getListCard() {
        this.cardService.getCard().subscribe(res => {
            if (res.status === 0) {
                this.listCard = [];
            } else {
                this.listCard = res;
            }
        }, error => {
            this.alert.onAlert('error', error.message);
        });
    }

    addCard(codeCard) {
        this.cardService.addCard(codeCard).subscribe(res => {
            if (res.status === 1) {
                this.alert.onAlert('success', res.msg);
            } else if (res.status === 0) {
                this.alert.onAlert('error', res.msg);
            }
            this.getListCard();
        }, error => {
            this.alert.onAlert('error', error.message);
            this.getListCard();
        });
    }

    confirmDelCard(card) {
        let $observer;
        $observer = this.confirmService.openConfirm('Удалить карту ' + card.code + '?').subscribe(res => {
            if (res === true) {
                this.delCard(card);
                $observer.unsubscribe();
            } else if (res === false) {
                $observer.unsubscribe();
            }

            console.log(res);
        });
    }

    delCard(card) {
        this.cardService.delCard(card.card_id).subscribe(res => {
            if (res.status === 1) {
                this.alert.onAlert('success', res.msg);
            } else if (res.status === 0) {
                this.alert.onAlert('error', res.msg);
            }
            this.ionViewWillEnter();
        });
    }

    editCard(card) {

    }
}
