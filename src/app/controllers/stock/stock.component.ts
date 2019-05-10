import {Component, OnInit} from '@angular/core';
import {StockService} from '../../services/stock.service';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {

    listStock: any[] = [];

    constructor(private stockService: StockService, private alert: AlertService) {
    }

    ngOnInit() {
        this.stockService.getListStock().subscribe(res => {
            console.log(res);
            if (res.length > 0) {
                this.listStock = res;
            } else {
                this.listStock = [];
            }
        }, error => {
            this.alert.onAlert('error', 'Ошибка загрузки данных.');
        });
    }

    infoStock(stock) {
        this.alert.onInfoAlert(stock.title, stock.text, stock.image);
    }

}
