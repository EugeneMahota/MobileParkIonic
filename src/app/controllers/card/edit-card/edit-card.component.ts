import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CardService} from '../../../services/card.service';
import {CardPark} from '../../../models/card-park';
import {AlertService} from '../../../services/alert.service';

@Component({
    selector: 'app-edit-card',
    templateUrl: './edit-card.component.html',
    styleUrls: ['./edit-card.component.scss'],
})
export class EditCardComponent {

    id: number;

    itemCard: CardPark = new CardPark();

    constructor(private router: Router,
                private route: ActivatedRoute,
                private cardService: CardService,
                private alert: AlertService) {
    }

    ionViewWillEnter() {
        this.id = +this.route.snapshot.paramMap.get('id');

        if (this.cardService.getCard(this.id)) {
            this.itemCard = this.cardService.getCard(this.id);
        } else {
            this.getCard();
        }
    }

    onBack() {
        this.router.navigate(['menu', 'card', 'list-function']);
    }

    editCard() {
        this.cardService.editCard(this.itemCard).subscribe(res => {
            if (res.status === 1) {
                this.onBack();
                this.alert.onAlert('success', 'Карта ' + this.itemCard.code + ' успешно отредактирована.');
            } else if (res.status === 0) {
                this.alert.onAlert('error', res.msg);
            }
        }, error => {
            this.alert.onAlert('error', 'Ошибка редактирования.');
        });
    }


    getCard() {
        this.cardService.getListCard().subscribe(res => {
            this.itemCard = res.find(x => x.id === this.id);
        });
    }
}
