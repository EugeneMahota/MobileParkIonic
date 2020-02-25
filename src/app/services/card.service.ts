import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {CardPark} from '../models/card-park';

@Injectable({
    providedIn: 'root'
})
export class CardService {

    listCard: CardPark[] = [];

    constructor(private http: HttpClient) {
    }

    addCard(codeCard: string, name: string): Observable<any> {
        return this.http.post(environment.apiUrl + '/card/add', JSON.stringify({code_card: codeCard, name: name}));
    }

    getListCard(): Observable<any> {
        return this.http.get(environment.apiUrl + '/card/list')
            .pipe(map(res => {
                if (res['status'] === 0) {
                    return [];
                } else {
                    this.listCard = [].slice.call(res);
                    return this.listCard = this.listCard.map(function (data: any) {
                        return {
                            id: data.card_id,
                            code: data.code,
                            name: data.name,
                            money: data.balance_money,
                            bonus: data.balance_bonus
                        };
                    });
                }
            }));
    }

    getCard(id: number): CardPark {
        return this.listCard.find(x => x.id === id);
    }

    delCard(id): Observable<any> {
        console.log({card_id: +id});
        return this.http.post(environment.apiUrl + '/card/delete', JSON.stringify({card_id: id}));
    }

    editCard(card: CardPark): Observable<any> {
        return this.http.post(environment.apiUrl + '/card/edit', JSON.stringify({card_id: card.id, name: card.name}));
    }
}
