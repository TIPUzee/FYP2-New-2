import { Component } from '@angular/core';
import { Notification, NotificationService } from "../notification.service";
import { CommonModule } from "@angular/common";
import { NotificationAddRemoveAnimation } from "../../../../services/animations/animations";

@Component({
    selector: 'app-popup-notify-container',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './popup-notify-container.component.html',
    styleUrl: './popup-notify-container.component.scss',
    animations: [
        NotificationAddRemoveAnimation,
    ]
})
export class PopupNotifyContainerComponent {
    notifications: Notification[] = [];
    pendingNotifications: Notification[] = [];
    
    
    constructor(private notificationService: NotificationService) {
        
        this.notificationService.notificationChange.subscribe((notifications: Notification) => {
            if (this.notifications.length > 0) {
                this.pendingNotifications.push(notifications);
                return;
            }
            this.notifications.push(notifications);
            this.setAutoRemoveNotification();
        });
    }
    
    
    setAutoRemoveNotification(delay: number = 2000) {
        setTimeout(() => {
            let curr_noti_type = this.notifications[0].type;
            if (this.notifications.length > 0) {
                this.notifications.shift();
            }
            if (this.pendingNotifications.length > 0) {
                this.notifications.push(this.pendingNotifications.shift() || { message: '', type: 'info', time: 0 });
                if (curr_noti_type === 'error' || curr_noti_type === 'warning') {
                    this.setAutoRemoveNotification(3000);
                }
                this.setAutoRemoveNotification();
            }
        }, delay);
    }
}
