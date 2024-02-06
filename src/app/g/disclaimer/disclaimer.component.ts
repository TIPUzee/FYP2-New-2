import { AfterViewInit, Component } from '@angular/core';
import { HtmlService } from '../../services/html/html.service';

@Component({
    selector: 'app-disclaimer',
    standalone: true,
    imports: [],
    templateUrl: './disclaimer.component.html',
    styleUrl: './disclaimer.component.scss',
})
export class DisclaimerComponent implements AfterViewInit {
    constructor(private htmlService: HtmlService) {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.htmlService.scrollToTop();
        }, 5);
    }
}
