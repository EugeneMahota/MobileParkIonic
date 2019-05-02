import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {InfoAlert} from '../../models/info-alert';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-info-alert',
    templateUrl: './info-alert.component.html',
    styleUrls: ['./info-alert.component.scss'],
    animations: [
        trigger('alert', [
            state('void', style({
                opacity: 0
            })),
            state('*', style({
                opacity: 1
            })),
            transition('void=>*, *=>void', animate('150ms ease-in-out'))
        ])
    ]
})
export class InfoAlertComponent {

    infoAlert: InfoAlert = new InfoAlert();

    constructor(private alert: AlertService) {
        this.alert.infoAlert.subscribe(res => {
            this.infoAlert = res;
        });
    }


    close() {
        this.alert.delInfoAlert();
    }
}
