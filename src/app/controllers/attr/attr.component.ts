import {Component, OnInit, ViewChild} from '@angular/core';
import {AttrService} from '../../services/attr.service';
import {Park} from '../../models/park';
import {Attr} from '../../models/attr';
import {IonContent} from '@ionic/angular';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-attr',
    templateUrl: './attr.component.html',
    styleUrls: ['./attr.component.scss'],
})
export class AttrComponent implements OnInit {
    @ViewChild(IonContent) content: IonContent;

    listAttr: Attr[] = [];
    listPark: Park[] = [];

    itemPark: Park = new Park();

    iconScrollTop: boolean = false;

    age: number = 12;
    growth: number = 150;

    constructor(private attrService: AttrService, private alert: AlertService) {
    }

    ionViewWillEnter() {
    }

    ngOnInit() {
        this.getListPark();
    }

    getListPark() {
        this.attrService.getListPark().subscribe(res => {
            this.listPark = res;
            this.itemPark = res[0];
            this.getListAttr(res[0].id);
        }, error => {
            this.alert.onAlert('error', 'Не удалось загрузить список');
        });
    }

    getListAttr(id) {
        this.attrService.getListAttr(id).subscribe(res => {
            this.listAttr = res;
        }, error => {
            this.alert.onAlert('error', 'Не удалось загрузить список');
        });
    }

    selectPark(park: Park) {
        this.itemPark = park;
        this.getListAttr(park.id);
        this.scrollToTop();
    }

    scrollToTop() {
        this.content.scrollToTop();
    }

    logScrolling(event) {
        // console.log(event.detail);
        if (event.detail.scrollTop > 300) {
            this.iconScrollTop = true;
        } else {
            this.iconScrollTop = false;
        }
    }

    onAttrLocation(index: number) {
        for (let i = 0; this.listAttr.length > i; i++) {
            this.listAttr[i].color = '#3880FF';
        }

        this.listAttr[index].color = '#FF0101';
        this.attrService.setLocationPark(this.itemPark, this.listAttr, this.listAttr[index]);
    }

    onLocation() {
        for (let i = 0; this.listAttr.length > i; i++) {
            this.listAttr[i].color = '#3880FF';
        }
        let attr: Attr = new Attr();
        this.attrService.setLocationPark(this.itemPark, this.listAttr, attr);
    }

    onPhoto(attr: Attr) {
        this.alert.onInfoAlert(attr.name, attr.info, attr.image);
    }
}
