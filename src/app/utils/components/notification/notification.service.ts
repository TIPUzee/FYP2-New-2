import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

export interface Notification {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    description?: string;
    time: number;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    __notifications: Notification[] = [];
    notificationChange: Subject<Notification> = new Subject<Notification>();
    count = 0;
    
    
    constructor() {
    }
    
    
    public info(message: string, description: string) {
        const time = new Date().getTime();
        this.count++;
        this.__notifications.push({ message, type: 'info', time, description });
        this.notificationChange.next({ message, type: 'info', time, description });
    }
    
    
    public success(message: string, description: string) {
        const time = new Date().getTime();
        this.count++;
        this.__notifications.push({ message, type: 'success', time, description });
        this.notificationChange.next({ message, type: 'success', time, description });
    }
    
    
    public error(message: string, description: string) {
        const time = new Date().getTime();
        this.count++;
        this.__notifications.push({ message, type: 'error', time, description });
        this.notificationChange.next({ message, type: 'error', time, description });
    }
    
    
    public warning(message: string, description: string) {
        const time = new Date().getTime();
        this.count++;
        this.__notifications.push({ message, type: 'warning', time, description });
        this.notificationChange.next({ message, type: 'warning', time, description });
    }
}
