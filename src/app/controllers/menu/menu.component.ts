import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavigationEnd, Router} from '@angular/router';

import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';


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

    constructor(private router: Router,
                private geolocation: Geolocation,
                private nativeGeocoder: NativeGeocoder) {
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
                } else if (res.url === '/menu' || res.url === '/' || res.url === '/menu/list-service') {
                    this.activeMenu = 'Профиль';
                    this.hideMenu = false;
                } else {
                    this.hideMenu = true;
                }
            }
        });
    }

    ionViewWillEnter() {
        this.getGeoLocation();
    }

    getGeoLocation() {
        this.geolocation.getCurrentPosition().then((resp) => {
            console.log(resp);

            this.reverseGeoCode(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }

    reverseGeoCode(latitude: number, longitude: number) {
        let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };

        this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
            .then((result: NativeGeocoderResult[]) => console.log(result))
            .catch((error: any) => console.log(error));
    }

}
