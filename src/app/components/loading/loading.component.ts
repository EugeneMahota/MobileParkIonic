import {Component, OnInit} from '@angular/core';
import {LoadingService} from '../../services/loading.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    animations: [
        trigger('loading', [
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
export class LoadingComponent implements OnInit {

    loadingStatus: boolean;

    constructor(private loadingService: LoadingService) {
        this.loadingService.loadingEvent.subscribe(res => {
            this.loadingStatus = res;
        });
    }

    ngOnInit() {
        this.loadingStatus = true;
    }

}
