import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavigationEnd, Router} from '@angular/router';


@Component({
    selector: 'app-tabs',
    templateUrl: 'menu.page.html',
    styleUrls: ['menu.page.scss'],
    animations: [
        trigger('label', [
            state('void', style({
                transform: 'scale(0)'
            })),
            state('*', style({
                transform: 'scale(1)'
            })),
            transition('void=>*,*=>void', animate('200ms'))
        ])
    ]
})
export class MenuComponent {

    activeMenu: string = 'Карты';

    constructor(private router: Router) {
        router.events.subscribe(res => {
            if (res instanceof NavigationEnd) {
                console.log(res, this.activeMenu);
                if(res.url === '/menu/stock') {
                   this.activeMenu = 'Акции';
                }
                if(res.url === '/menu/card') {
                    this.activeMenu = 'Карты';
                }
                if(res.url === '/menu/news') {
                    this.activeMenu = 'Новости';
                }
                if(res.url === '/menu/attr') {
                    this.activeMenu = 'Аттракционы';
                }
                if(res.url === '/menu/profile') {
                    this.activeMenu = 'Профиль';
                }
            }
        });
    }
}
