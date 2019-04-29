import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CardService {

    constructor(private http: HttpClient) {
    }

    addCard(codeCard: string): Observable<any> {
        return this.http.post(environment.apiUrl + '/card/add', JSON.stringify({code_card: codeCard}));
    }

    getCard(): Observable<any> {
        return this.http.get(environment.apiUrl + '/card/list');
    }

    delCard(id): Observable<any> {
        console.log({card_id: +id});
        return this.http.post(environment.apiUrl + '/card/delete', JSON.stringify({card_id: id}));
    }
}
