import {Component, OnInit, ViewChild} from '@angular/core';
import {AttrService} from '../../services/attr.service';
import {Park} from '../../models/park';
import {Attr} from '../../models/attr';
import {IonContent} from '@ionic/angular';

@Component({
    selector: 'app-attr',
    templateUrl: './attr.component.html',
    styleUrls: ['./attr.component.scss'],
})
export class AttrComponent {
    @ViewChild(IonContent) content: IonContent;

    listAttr: Attr[] = [];
    listPark: Park[] = [];

    itemPark: Park = new Park();

    iconScrollTop: boolean = false;

    constructor(private attrService: AttrService) {
    }

    ionViewWillEnter() {
        this.getListPark();
    }

    getListPark() {
        this.attrService.getListPark().subscribe(res => {
            this.listPark = res;
            this.itemPark = res[0];
            this.getListAttr(res[0].id);
        });
    }

    getListAttr(id) {
        this.attrService.getListAttr(id).subscribe(res => {
            this.listAttr = res;
        });
    }

    scrollToTop() {
        this.content.scrollToTop();
    }

    logScrolling(event) {
        if (event.detail.scrollTop > 300) {
            this.iconScrollTop = true;
        } else {
            this.iconScrollTop = false;
        }
    }

}
