import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Payment} from '../models/payment';
import {interval, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {flatMap} from 'rxjs/operators';

const paymentHeaders = {
    headers: new HttpHeaders({
        'Shop Id': 'test_NTg4ODU2lc-4GywPaPNTcTbZG4ELvXgjk27aSrhbJ4U'
    })
};

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    constructor(private http: HttpClient) {
    }


    addMoney(payment: Payment): Observable<any> {
        console.log(payment);
        return this.http.post(environment.apiUrl + '/card/add_money', JSON.stringify(payment));
    }
}
