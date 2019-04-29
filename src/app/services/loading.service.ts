import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    loading: boolean = true;
    loadingEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    showLoading() {
        this.loading = false;
        this.loadingEvent.emit(this.loading);
    }

    hideLoading() {
        this.loading = true;
        this.loadingEvent.emit(this.loading);
    }
}
