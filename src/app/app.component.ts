import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HtmlService } from './services/html/html.service';
import {
    PopupNotifyContainerComponent
} from "./utils/components/notification/popup-notify-container/popup-notify-container.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, PopupNotifyContainerComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'AI-Disease Predictor';

    constructor(htmlService: HtmlService, private scroller: ViewportScroller, private router: Router) {
        // htmlService.setPrintCurrentBreakPoint();
        scroller.setOffset([200, 200]);
        // htmlService.initConsoleDeveloperDetailsLoop();
    }
}
