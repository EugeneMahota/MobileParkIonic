import {Component, OnInit} from '@angular/core';
import {Alert} from '../../models/alert';
import {AlertService} from '../../services/alert.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
        trigger('alert', [
            state('void', style({
                opacity: 0.5,
                marginBottom: '-90px'
            })),
            state('*', style({
                opacity: 1,
                marginBottom: 0
            })),
            transition('void=>*, *=>void', animate('200ms ease-in-out'))
        ])
    ]
})
export class AlertComponent implements OnInit {

    listAlert: Alert[] = [];

    constructor(private alertService: AlertService) {
        this.alertService.alertEvent.subscribe(alert => {
            this.listAlert = alert;
            // this.listAlert = this.listAlert.reverse();
        });
    }

    ngOnInit() {
    }

    delAlert() {
        this.alertService.delAlert();
    }

}
