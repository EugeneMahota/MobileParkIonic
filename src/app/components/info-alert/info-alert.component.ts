import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
export class InfoAlertComponent implements OnInit {

  message: string = 'Привет!';
  constructor() { }

  ngOnInit() {}

}
