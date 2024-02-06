import { AfterViewInit, Component } from '@angular/core';
import { HtmlService } from '../../services/html/html.service';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit {
    constructor(private htmlService: HtmlService) {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.htmlService.scrollToTop();
        }, 5);
    }
}
