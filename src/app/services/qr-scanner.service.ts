import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QrScannerService {

    codeCard: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    addCode(code: string) {
        this.codeCard.emit(code);
    }
}
