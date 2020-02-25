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

    hideMenu: boolean;
    constructor(private router: Router) {
        this.hideMenu = false;
        router.events.subscribe(res => {
            if (res instanceof NavigationEnd) {
                console.log(res);
                if (res.url === '/menu/stock') {
                    this.activeMenu = 'Акции';
                    this.hideMenu = false;
                } else if (res.url === '/menu/card') {
                    this.activeMenu = 'Карты';
                    this.hideMenu = false;
                } else if (res.url === '/menu/location') {
                    this.activeMenu = 'Новости';
                    this.hideMenu = false;
                } else if (res.url === '/menu/attr') {
                    this.activeMenu = 'Аттракционы';
                    this.hideMenu = false;
                } else if (res.url === '/menu/profile') {
                    this.activeMenu = 'Профиль';
                    this.hideMenu = false;
                }else if (res.url === '/menu' || res.url === '/' || res.url === '/menu/list-service') {
                    this.activeMenu = 'Профиль';
                    this.hideMenu = false;
                } else {
                    this.hideMenu = true;
                }
            }
        });
    }
}
