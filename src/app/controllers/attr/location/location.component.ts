import {Component} from '@angular/core';
import {Park} from '../../../models/park';
import {Attr} from '../../../models/attr';
import {AttrService} from '../../../services/attr.service';
import {Router} from '@angular/router';

declare const ymaps: any;

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class LocationComponent {

    public map: any;

    itemPark: Park = new Park();
    itemAttr: Attr = new Attr();
    listAttr: Attr[] = [];

    zoom: number = 10;

    constructor(private attrService: AttrService, private router: Router) {

    }

    ionViewDidEnter() {

        if (this.attrService.getLocationPark().park) {
            let object: any = this.attrService.getLocationPark();

            this.itemPark = object.park;
            this.listAttr = object.listAttr;
            if (object.itemAttr.x && object.itemAttr.y) {
                this.itemAttr = object.itemAttr;
                this.zoom = 17;
            }
            this.loadMap(this.itemPark, this.listAttr);
        } else {
            this.loadMap(null, null);
        }

        // this.map.container.fitToViewport();
    }

    loadMap(itemPark: Park, listAttr: Attr[]) {
        this.map = new ymaps.Map('map', {
            center: [[this.itemAttr.x || itemPark.xCenter || 45.06166188109295], [this.itemAttr.y || itemPark.yCenter || 38.9622065]],
            zoom: this.zoom
        }, {
            restrictMapArea: [
                [itemPark.xTop || 44.94072507493502, itemPark.yTop || 38.681025164550775],
                [itemPark.xBottom || 45.176514148021475, itemPark.yBottom || 39.34020485205077]
            ]
        });

        this.addNewObjects(listAttr);
    }


    addNewObjects(listAttr) {
        for (let i = 0; listAttr.length > i; i++) {
            this.map.geoObjects.add(
                new ymaps.Placemark([listAttr[i].x, listAttr[i].y],
                    {
                        iconCaption: listAttr[i].name,
                        balloonContent:
                            '<img width="200px" height="auto" src="'
                            + listAttr[i].image + '"/>' + '<br/>' + 'Цена: ' + listAttr[i].price + ' руб',
                        draggable: true
                    },
                    {
                        preset: 'islands#blueCircusIcon',
                        iconColor: listAttr[i].color
                    }
                ));
        }
    }

    onBack() {
        this.router.navigate(['menu', 'attr']);
    }
}
