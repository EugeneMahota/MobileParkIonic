import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../../../services/payment.service';
import {Payment} from '../../../models/payment';
import {AlertService} from '../../../services/alert.service';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Card} from '../../../models/card';
import {CardService} from '../../../services/card.service';
import {CardPark} from '../../../models/card-park';
import {IonSlides} from '@ionic/angular';
import {ProfileService} from '../../../services/profile.service';
import {User} from '../../../models/user';
import {ConfirmService} from '../../../services/confirm.service';

// @ts-ignore
const checkout = YandexCheckout(588856);

const browserOptions = {
    toolbarcolor: '#00C851',
    navigationbuttoncolor: '#ffffff',
};

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {

    user: User = new User();
    card: Card = new Card();
    payment: Payment = new Payment();

    paymentObject: any;
    observable: any;

    inputEventValue: string = '';

    itemCard: CardPark = new CardPark();

    @ViewChild('slider', {static: true}) slider: IonSlides;
    segment: number = 0;
    slideOpts = {initialSlide: 0, speed: 200};

    bonus: number = 0;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private paymentService: PaymentService,
                private alert: AlertService,
                private iab: InAppBrowser,
                private cardService: CardService,
                private profileService: ProfileService,
                private confirm: ConfirmService) {
    }

    ionViewWillEnter() {
        this.card.number = '';
        this.payment.card_id = +this.route.snapshot.paramMap.get('id');

        this.getCard();
        this.getInfoUser();
    }

    ionViewWillLeave() {
        this.onClear();
    }

    onPay(card: Card) {
        checkout.tokenize({
            number: card.number.replace(' ', ''),
            cvc: card.cvc,
            month: card.month.length === 1 ? '0' + card.month : card.month,
            year: card.year
        }).then(response => {
            if (response.status === 'success') {
                this.payment.token = response.data.response.paymentToken;
                this.newPayment();
            } else if (response.status === 'error') {
                this.alert.onAlert('error', response.error.params[0].message);
            }
        });
    }

    newPayment() {
        if (this.payment.value) {
            this.paymentService.addMoney(this.payment).subscribe(res => {
                this.paymentObject = res;

                this.validationPayment(this.paymentObject);
            }, error => {
                this.alert.onAlert('error', error.message);
            });
        } else {
            this.alert.onAlert('error', 'Введите сумму пополнения.');
        }
    }

    validationPayment(paymentObject) {
        if (paymentObject.status === 'pending') {
            if (paymentObject.confirmation.confirmation_url) {
                const browser = this.iab.create(paymentObject.confirmation.confirmation_url, '_blank', browserOptions);

                browser.on('exit').subscribe(event => {
                    this.getPayment();
                });
            }
        }
        if (paymentObject.status === 'succeeded') {
            this.alert.onAlert('success', 'Средства готовы к списанию, ожидайте зачисления.');
            this.onBack();
        }
        if (paymentObject.status === 'canceled') {
            this.alert.onAlert('error', 'Ошибка! Платеж не прошел.');
            this.onBack();
        }
        if (paymentObject.status === 'waiting_for_capture') {
            this.alert.onAlert('error', 'Ожидайте списание средств.');
            this.onBack();
        }
    }

    inputCard(event) {
        if (event.target.value > this.inputEventValue) {
            if (event.target.value.length % 5 === 0 && event.target.value.slice(-1) !== ' ') {
                this.card.number = this.card.number + ' ' + event.target.value.slice(-1);
            }
        } else {
            if (event.target.value.length % 5 === 0 && event.target.value.slice(-1) === ' ') {
                this.card.number = this.card.number.slice(0, this.card.number.length - 2);
            }
        }
        this.inputEventValue = event.target.value;
    }

    onBack() {
        this.router.navigate(['menu', 'card']);
    }

    onClear() {
        this.payment = new Payment();
        this.card = new Card();
        this.paymentObject = null;
    }

    moveFocus(nextElement) {
        nextElement.setFocus();
    }

    infoCVC() {
        this.alert.onInfoAlert(
            'CVV/CVC',
            'Код, написанный на обратной стороне карты, служит для проверки подлинности.',
            null);
    }

    getPayment() {
        this.paymentService.getPayment(this.paymentObject.id).subscribe(res => {
            if (res.status === 'succeeded') {
                this.alert.onAlert('success', 'Средства списаны. Обновите страницу, если деньги не зачисленны.');

                setTimeout(() => {
                    this.onBack();
                }, 1000);
            } else if (res.status === 'canceled') {
                this.alert.onAlert('error', 'Ошибка! Платеж не прошел.');
            } else if (res.status === 'waiting_for_capture') {
                this.onBack();
                this.alert.onAlert('error', 'Ожидайте списание средств.');
            } else if (res.status === 'pending') {
                this.confirmation(res.url);
            }
        }, error => {
            this.alert.onAlert('error', 'Ошибка получения платежа.');
        });
    }


    getCard() {
        if (this.cardService.getCard(this.payment.card_id)) {
            this.itemCard = this.cardService.getCard(this.payment.card_id);
        } else {
            this.cardService.getListCard().subscribe(res => {
                this.itemCard = res.find(x => x.id === this.payment.card_id);
            });
        }
    }

    getInfoUser() {
        this.profileService.getUser().subscribe(res => {
            this.user = res.user;
        }, error => {
            this.alert.onAlert('error', 'Ошибка получения данных.');
        });
    }

    onBonus() {
        if (this.bonus > 0) {
            this.paymentService.addBonus({
                card_id: this.itemCard.id,
                value: this.bonus
            }).subscribe(res => {
                if (res.status === 1) {
                    this.bonus = 0;
                    this.alert.onAlert('success', res.msg);

                    this.updateCard();
                    this.getInfoUser();
                } else {
                    this.alert.onAlert('error', res.msg);
                }
            }, error => {
                this.alert.onAlert('error', 'Ошибка пополнения.');
            });
        }
    }

    infoBonus() {
        this.alert.onInfoAlert(
            'Получение бонусов',
            'Все способы получения бонусов описаны в разделе Акции!',
            null);
    }

    async segmentChanged() {
        await this.slider.slideTo(this.segment);
    }

    async slideChanged() {
        this.segment = await this.slider.getActiveIndex();
    }


    updateCard() {
        this.cardService.getListCard().subscribe(res => {
            this.itemCard = res.find(x => x.id === this.payment.card_id);
        });
    }

    async confirmation(url) {
       const confirm = this.confirm.openConfirm('Вам необходимо подтвердить платеж. Сделать это?').subscribe(res => {
            if (res === true) {
                const browser = this.iab.create(url, '_blank', browserOptions);

                browser.on('exit').subscribe(event => {
                    this.getPayment();
                });
                confirm.unsubscribe();
            } else if (res === false) {
                this.alert.onAlert('error', 'Ошибка! Платеж не прошел.');
                confirm.unsubscribe();
            }
        });
    }
}
