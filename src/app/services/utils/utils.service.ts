import { Injectable } from '@angular/core';

export enum UserType {
    Guest = 'Guest',
    Patient = 'Patient',
    Doctor = 'Doctor',
    Admin = 'Admin',
}

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    // Current User Type
    UserType = UserType;
    currentUser: UserType = UserType.Guest;
    setCurrentUser(_userType: UserType): void {
        this.currentUser = _userType;
    }
    getCurrentUser(): UserType {
        return this.currentUser;
    }

    constructor() {}
}
