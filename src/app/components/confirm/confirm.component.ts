import {Component, OnInit} from '@angular/core';
import {ConfirmService} from '../../services/confirm.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
    animations: [
        trigger('confirm', [
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
export class ConfirmComponent implements OnInit {

    message: string;

    constructor(private confirmService: ConfirmService) {
        this.confirmService.messageEvent.subscribe(message => {
            this.message = message;
        });
    }

    ngOnInit() {

    }

    setConfirm(status) {
        this.confirmService.setConfirm(status);
    }

}
