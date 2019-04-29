import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../../../services/payment.service';
import {Payment} from '../../../models/payment';
import {AlertService} from '../../../services/alert.service';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Card} from '../../../models/card';

const checkout = YandexCheckout(588856);

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {

    card: Card = new Card();
    payment: Payment = new Payment();

    paymentObject: any;

    inputEventValue: string = '';

    constructor(private router: Router,
                private route: ActivatedRoute,
                private paymentService: PaymentService,
                private alert: AlertService,
                private iab: InAppBrowser) {
    }

    ionViewWillEnter() {
        this.card.number = '';
        this.payment.card_id = +this.route.snapshot.paramMap.get('id');
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
                this.successCard();
            } else if (response.status === 'error') {
                this.alert.onAlert('error', response.error.params[0].message);
            }
        });
    }

    successCard() {
        if (this.payment.value) {
            this.paymentService.addMoney(this.payment).subscribe(res => {
                console.log(res);
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
            this.alert.onAlert('success', 'Сервис ожидает подтверждения.');
            if (paymentObject.confirmation.confirmation_url) {
                this.onBack();
                const browser = this.iab.create(paymentObject.confirmation.confirmation_url, '_system');
            }
        }
        if (paymentObject.status === 'succeeded') {
            this.alert.onAlert('success', 'Средства готовы к списанию, ожидайте зачисления.');
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
        this.onClear();
    }

    onClear() {
        this.payment = new Payment();
        this.card = new Card();
        this.paymentObject = null;
    }

    moveFocus(nextElement) {
        nextElement.setFocus();
    }
}
