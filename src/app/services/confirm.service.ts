import {EventEmitter, Injectable} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ConfirmService {

    message: string;
    messageEvent: EventEmitter<string> = new EventEmitter<string>();

    statusConfirm: boolean;

    constructor() {
    }

    openConfirm(message): Observable<any> {
        this.statusConfirm = undefined;
        this.message = message;
        this.messageEvent.emit(this.message);

        return interval(500).pipe(flatMap(() => {
            return new Observable((observer) => {
                observer.next(this.statusConfirm);
            });
        }));
    }

    setConfirm(status: boolean) {
        this.statusConfirm = status;
        this.closeConfirm();
    }

    closeConfirm() {
        this.message = null;
        this.messageEvent.emit(this.message);
    }

}
