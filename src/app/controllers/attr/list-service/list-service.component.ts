import {Component, OnInit} from '@angular/core';
import {AttrService} from '../../../services/attr.service';
import {AlertService} from '../../../services/alert.service';
import {Park} from '../../../models/park';
import {Router} from '@angular/router';

@Component({
    selector: 'app-list-service',
    templateUrl: './list-service.component.html',
    styleUrls: ['./list-service.component.scss'],
})
export class ListServiceComponent implements OnInit {

    listPark: Park[] = [];

    constructor(private attrService: AttrService, private alert: AlertService, private router: Router) {
    }

    ngOnInit() {
        this.getListPark();
    }

    getListPark() {
        this.attrService.getListPark().subscribe(res => {
            this.listPark = res;
        }, error => {
            this.alert.onAlert('error', 'Не удалось загрузить список');
        });
    }

    onPark(park) {
        this.attrService.savePark(park);
        this.router.navigate(['menu', 'list-service', 'attr'])
    }

}
