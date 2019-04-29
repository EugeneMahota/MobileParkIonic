import {Component} from '@angular/core';

declare let ymaps: any;

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class LocationComponent {

    public map: any;

    paramsPark = {
        name: 'Солнечный остров',
        x_top: 44.99925605048972,
        y_top: 39.03337463476561,
        x_bottom: 45.01400638183218,
        y_bottom: 39.07457336523437,
        x_center: 45.0076363517897,
        y_center: 39.05466064550779,
    };
    listObject: any[] = [
        {name: 'Матерхон', x: 45.01023989586831, y: 39.05277665485124, color: '#3880FF', info: 'Какая-то информация тут.', price: 300},
        {name: 'Горки', x: 45.00959086706556, y: 39.05236090354359, color: '#3880FF', info: 'Какая-то информация тут.', price: 200}
    ];

    constructor() {

    }

    ionViewDidEnter() {
        this.loadMap(this.paramsPark, this.listObject);
    }

    loadMap(paramsPark, listObject) {
        this.map = new ymaps.Map('map', {
            center: [paramsPark.x_center, paramsPark.y_center],
            zoom: 10
        }, {
            restrictMapArea: [
                [paramsPark.x_top, paramsPark.y_top],
                [paramsPark.x_bottom, paramsPark.y_bottom]
            ]
        });

        this.addNewObjects(listObject);
    }


    addNewObjects(listObject) {
        for (let i = 0; listObject.length > i; i++) {
            this.map.geoObjects.add(new ymaps.Placemark(
                [listObject[i].x, listObject[i].y],
                {
                    iconColor: listObject[i].color,
                    iconCaption: listObject[i].name,
                    balloonContent: listObject[i].info + '<br/>' + listObject[i].price + ' руб.',
                    preset: 'islands#blackStretchyIcon',
                    draggable: true
                }
            ));
        }
    }


}