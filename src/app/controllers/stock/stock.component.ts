import {Component, OnInit, ViewChild} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {AlertService} from '../../services/alert.service';
import {IonContent, IonSlides} from '@ionic/angular';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {

    listStock: any[] = [];
    listNews: any[] = [];

    segment: number = 0;
    slideOpts = {
        initialSlide: 0,
        speed: 200
    };
    @ViewChild('slider', {static: true}) slider: IonSlides;
    @ViewChild('content', {static: true}) content: IonContent;
    scrollTop: number;

    constructor(private stockService: StockService, private alert: AlertService) {
    }

    ngOnInit() {
        this.getListStock();
        this.getListNews();
    }

    getListStock() {
        this.stockService.getListStock().subscribe(res => {
            if (res.length > 0) {
                this.listStock = res;
            } else {
                this.listStock = [];
            }
        }, error => {
            this.alert.onAlert('error', 'Ошибка загрузки данных.');
        });
    }

    getListNews() {
        this.stockService.getListNews().subscribe(res => {
            console.log(res);
            if (res.length > 0) {
                this.listNews = res;
            } else {
                this.listNews = [];
            }
        }, error => {
            this.alert.onAlert('error', 'Ошибка загрузки данных.');
        });
    }

    infoStock(stock) {
        this.alert.onInfoAlert(stock.title, stock.text, stock.image);
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
