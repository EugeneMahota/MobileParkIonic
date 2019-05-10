import {EventEmitter, Injectable} from '@angular/core';
import {Alert} from '../models/alert';
import {InfoAlert} from '../models/info-alert';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    listAlert: Alert[] = [];
    alertEvent: EventEmitter<Alert[]> = new EventEmitter<Alert[]>();
    timeout: any;

    infoAlert: EventEmitter<InfoAlert> = new EventEmitter<InfoAlert>();

    constructor() {
    }

    onAlert(type: string, message: string) {
        this.delAlert();
        clearTimeout(this.timeout);

        this.listAlert.push({type: type, message: message});
        this.alertEvent.emit(this.listAlert);

        this.timeout = setTimeout(() => {
            this.delAlert();
        }, 4000);
    }

    delAlert() {
        this.listAlert.splice(-1, 1);
        this.alertEvent.emit(this.listAlert);
    }

    onInfoAlert(title, message, image) {
        this.infoAlert.emit({title: title, message: message, image: image});
    }

    delInfoAlert() {
        this.infoAlert.emit({title: null, message: null, image: null});
    }
}
