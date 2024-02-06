import { AfterViewInit, Component } from '@angular/core';
import { HtmlService } from '../../services/html/html.service';

@Component({
    selector: 'app-faq',
    standalone: true,
    imports: [],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.scss',
})
export class FaqComponent implements AfterViewInit {
    constructor(private htmlService: HtmlService) {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.htmlService.scrollToTop();
        }, 0);
    }
}
