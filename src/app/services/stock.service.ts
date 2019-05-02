import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StockService {

    constructor(private http: HttpClient) {
    }

    getListStock(): Observable<any> {
        return this.http.get(environment.apiUrl + '/stocks/list');
    }
}
