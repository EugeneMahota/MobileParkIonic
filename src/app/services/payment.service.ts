import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Payment} from '../models/payment';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(private http: HttpClient) {
    }


    addMoney(payment: Payment): Observable<any> {
        return this.http.post(environment.apiUrl + '/card/create_payment', JSON.stringify(payment));
    }

    getPayment(id): Observable<any> {
        return this.http.post(environment.apiUrl + '/card/info_payment', JSON.stringify({id: id}))
            .pipe(map(res => {
                if (res['status']) {
                    return {status: res['status']};
                } else {
                    return {status: 'error'};
                }
            }));
    }

    addBonus(data): Observable<any> {
        return this.http.post(environment.apiUrl + '/card/add_bonus', JSON.stringify(data));
    }
}
