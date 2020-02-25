import {Component, ViewChild} from '@angular/core';
import {QrScannerService} from '../../services/qr-scanner.service';
import {CardService} from '../../services/card.service';
import {AlertService} from '../../services/alert.service';
import {ConfirmService} from '../../services/confirm.service';
import {CardPark} from '../../models/card-park';
import {AlertController, IonSlides} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-tab2',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.scss'],
    animations: [
        trigger('toolbar', [
            state('void', style({
                opacity: 0.2,
                marginLeft: '-150px'
            })),
            state('*', style({
                opacity: 1,
                marginLeft: 0
            })),
            transition('void=>*, *=>void', animate('300ms ease-in-out'))
        ])
    ]
})
export class CardComponent {

    codeCard: string;
    nameCard: string;
    listCard: CardPark[] = [];

    segment: number = 0;
    slideOpts = {
        initialSlide: 0,
        speed: 200
    };

    @ViewChild('slides', {static: true}) slider: IonSlides;

    toolbar: boolean;

    constructor(private qrService: QrScannerService,
                private router: Router,
                private cardService: CardService,
                private alert: AlertService,
                private confirmService: ConfirmService,
                private route: ActivatedRoute,
                private keyboard: Keyboard,
                private alertController: AlertController) {
        this.qrService.codeCard.subscribe(code => {
            if (code) {
                this.codeCard = code;
                this.newNameCard();
            }
        });
    }

    ionViewWillEnter() {
        this.getListCard();
        this.toolbar = false;
    }

    getListCard() {
        this.cardService.getListCard().subscribe(res => {
            this.listCard = res;
        }, error => {
            this.alert.onAlert('error', 'Ошибка получения списка!');
            this.listCard = [];
        });
    }

    addCard(codeCard) {
        if (codeCard) {
            this.cardService.addCard(codeCard, this.nameCard).subscribe(res => {
                if (res.status === 1) {
                    this.alert.onAlert('success', res.msg);
                    this.keyboard.hide();
                } else if (res.status === 0) {
                    this.alert.onAlert('error', res.msg);
                }
                this.getListCard();
            }, error => {
                this.alert.onAlert('error', error.message);
                this.getListCard();
                this.keyboard.hide();
            });
        }
        this.codeCard = '';
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
        });
    }

    delCard(card) {
        this.cardService.delCard(card.id).subscribe(res => {
            if (res.status === 1) {
                this.alert.onAlert('success', res.msg);
            } else if (res.status === 0) {
                this.alert.onAlert('error', res.msg);
            }
            this.ionViewWillEnter();
        }, error => {
            this.alert.onAlert('error', 'Ошибка удаления!');
        });
    }

    async segmentChanged() {
        await this.slider.slideTo(this.segment);
    }

    async slideChanged() {
        this.segment = await this.slider.getActiveIndex();
    }

    doRefresh(event) {
        this.ionViewWillEnter();
        setTimeout(() => {
            event.target.complete();
        }, 500);
    }


    onScanner() {
        this.router.navigate(['menu', 'card', 'qr-scanner']);
    }

    onPayment(id) {
        this.router.navigate(['list-function', id], {relativeTo: this.route});
    }

    async newNameCard() {
        const alert = await this.alertController.create({
            header: 'Имя карты',
            message: 'Карт может быть несколько, введите имя для добавленной.',
            inputs: [
                {
                    name: 'nameCard',
                    placeholder: 'Введите имя'
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
                        this.nameCard = data.nameCard;
                        this.addCard(this.codeCard);
                    }
                }
            ]
        });

        await alert.present();
    }
}
