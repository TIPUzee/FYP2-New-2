import { Component, Input } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
    selector: 'app-notification',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss'
})
export class NotificationComponent {
    @Input({ required: true }) message!: string;
    @Input({ required: true }) type!: 'success' | 'error' | 'warning' | 'info';
}
