import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient) {
    }

    getUser(): Observable<any> {
        return this.http.get(environment.apiUrl + '/user/get_info');
    }

    getQuantityVisit(): Observable<any> {
        return this.http.get(environment.apiUrl + '/user/visits');
    }

    editUser(user): Observable<any> {
        return this.http.post(environment.apiUrl + '/user/edit', JSON.stringify(user));
    }

    getInvite(): Observable<any> {
        return this.http.get(environment.apiUrl + '/stocks/invite');
    }

    getTransactionsMoney(): Observable<any> {
        return this.http.get(environment.apiUrl + '/report/transactions');
    }

    getTransactionsBonus(): Observable<any> {
        return this.http.get(environment.apiUrl + '/report/stocks');
    }
}
