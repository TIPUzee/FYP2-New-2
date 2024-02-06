import { Component } from '@angular/core';
import { faBell, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from "@angular/common";
import { HtmlService } from "../../../services/html/html.service";
import {
    NotificationsContainerComponent
} from "../notification/notifications-container/notifications-container.component";

@Component({
    selector: 'app-right-sidebar',
    standalone: true,
    imports: [FontAwesomeModule, CommonModule, NotificationsContainerComponent],
    templateUrl: './right-sidebar.component.html',
    styleUrl: './right-sidebar.component.scss'
})
export class RightSidebarComponent {
    faBell = faBell;
    faCircleXmark = faCircleXmark;
    open = false;
    
    constructor(private htmlService: HtmlService) {
    }
}
