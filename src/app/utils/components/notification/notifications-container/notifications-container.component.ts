import { Component } from '@angular/core';
import { NotificationService } from "../notification.service";
import { CommonModule } from "@angular/common";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
    selector: 'app-notifications-container',
    standalone: true,
    imports: [CommonModule, FaIconComponent],
    templateUrl: './notifications-container.component.html',
    styleUrl: './notifications-container.component.scss'
})
export class NotificationsContainerComponent {
    faAngleDown = faAngleDown;
    notifications = this.notificationService.__notifications;
    
    constructor(private notificationService: NotificationService) {
    }
}
