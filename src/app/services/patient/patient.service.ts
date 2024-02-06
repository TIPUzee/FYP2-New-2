import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PatientService {
    __fullName = 'Zeeshan Nadeem';
    fullNameChange: Subject<string> = new Subject<string>();

    constructor() {}

    changeFullName(_fullName: string) {
        this.__fullName = _fullName;
        this.fullNameChange.next(this.__fullName);
    }
}
