import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DoctorService {
    __fullName = 'Dr. Zeeshan';
    __languages: Set<string> = new Set<string>();
    fullNameChange: Subject<string> = new Subject<string>();
    languagesChange: Subject<string> = new Subject<string>();

    constructor() {
        this.__languages.add('Alig');
    }

    changeFullName(_fullName: string): void {
        this.__fullName = _fullName;
        this.fullNameChange.next(this.__fullName);
    }

    addLanguage(_language: string): void {
        if (_language == 'Add New Language') {
            return;
        }
        if (!this.__languages.has(_language)) {
            this.__languages.add(_language);
            this.languagesChange.next(_language);
        }
    }
}
