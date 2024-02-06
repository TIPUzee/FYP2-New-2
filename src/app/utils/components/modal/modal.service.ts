import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    _noTotalModals: number = 0;
    _noCurrentlyOpenedModal: number = 0;
    noCurrentlyOpenedModalSubject: Subject<number> = new Subject<number>();

    constructor() {}

    generateId(): number {
        this._noTotalModals += 1;
        return this._noTotalModals;
    }

    generateOpeningId(): number {
        this._noCurrentlyOpenedModal += 1;
        this.noCurrentlyOpenedModalSubject.next(this._noCurrentlyOpenedModal);
        return this._noCurrentlyOpenedModal;
    }

    dismissOpeningId(): null {
        this._noCurrentlyOpenedModal -= 1;
        this.noCurrentlyOpenedModalSubject.next(this._noCurrentlyOpenedModal);
        return null;
    }
}
