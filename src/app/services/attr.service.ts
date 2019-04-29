import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Park} from '../models/park';
import {Attr} from '../models/attr';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AttrService {

    listPark: Park[] = [];
    listAttr: Attr[] = [];
    constructor(private http: HttpClient) {
    }

    getListPark(): Observable<Park[]> {
        return this.http.get(environment.apiUrl + '/attr/parks')
            .pipe(map(data => {
                this.listPark = [].slice.call(data);
                return this.listPark = this.listPark.map((data: any) => {
                    return {
                        id: data.park_id,
                        name: data.name,
                        xTop: data.lat_top,
                        yTop: data.lng_top,
                        xCenter: data.lat_center,
                        yCenter: data.lng_center,
                        xBottom: data.lat_bottom,
                        yBottom: data.lng_bottom
                    };
                });
            }));
    }

    getListAttr(id: number): Observable<any> {
        return this.http.post(environment.apiUrl + '/attr/list', JSON.stringify({park_id: id}))
            .pipe(map(data => {
                this.listAttr = [].slice.call(data);
                return this.listAttr = this.listAttr.map((data: any) => {
                    return {
                        id: data.attr_id,
                        name: data.rep_name,
                        image: data.image,
                        price: data.price,
                        bonus: data.bonus,
                        info: data.text,
                        weight: data.weight,
                        growth: data.growth,
                        ageMax: data.age_max,
                        ageMin: data.age_min,
                        danger: data.level_fear,
                        x: data.lat,
                        y: data.lng
                    };
                });
            }));
    }

}
