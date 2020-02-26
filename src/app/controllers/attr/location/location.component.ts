import {Component, OnInit} from '@angular/core';
import {Park} from '../../../models/park';
import {Attr} from '../../../models/attr';
import {AttrService} from '../../../services/attr.service';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';

declare const ymaps: any;

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {


    backEvent: any;

    public map: any;

    itemPark: Park = new Park();
    itemAttr: Attr = new Attr();
    listAttr: Attr[] = [];

    zoom: number = 15;

    constructor(private attrService: AttrService,
                private router: Router,
                private platform: Platform) {

    }

    ionViewWillEnter() {
        let object: any = this.attrService.getLocationPark();
        this.itemPark = object.park;
        this.listAttr = object.listAttr;

        this.addCenter(this.itemPark);
        this.addNewObjects(this.listAttr);

        this.backEvent = this.platform.backButton.subscribe(() => {
            if (this.itemPark.name) {
                this.router.navigate(['menu', 'list-service', 'attr']);
            }
        });
    }

    ionViewWillLeave() {
        this.backEvent.unsubscribe();
    }


    ngOnInit() {
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
    }

    loadMap(itemPark: Park, listAttr: Attr[]) {
        this.map = new ymaps.Map('map', {
            center: [[this.itemAttr.x || itemPark.xCenter || 45.06166188109295], [this.itemAttr.y || itemPark.yCenter || 38.9622065]],
            zoom: this.zoom
        });
    }


    addNewObjects(listAttr) {
        this.map.geoObjects.removeAll();

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

    addCenter(itemPark: Park) {
        if (itemPark.xCenter) {
            this.map.setCenter([itemPark.xCenter, itemPark.yCenter], this.zoom)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }
    }

    onBack() {
        this.router.navigate(['menu', 'attr']);
    }
}
