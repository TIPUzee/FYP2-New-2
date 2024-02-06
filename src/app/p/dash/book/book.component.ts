import { CommonModule, ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import { RatingStarsComponent } from '../../compo/rating-stars/rating-stars.component';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../../services/common/common.service';
import { HtmlService } from '../../../services/html/html.service';

@Component({
    selector: 'app-book',
    standalone: true,
    imports: [CommonModule, RatingStarsComponent, RouterLink],
    templateUrl: './book.component.html',
    styleUrl: './book.component.scss',
})
export class BookComponent implements AfterViewInit {
    constructor(public commonService: CommonService, private htmlService: HtmlService, public scroller: ViewportScroller) {}

    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
        this.scroller.setHistoryScrollRestoration('auto');
        this.scroller.setOffset([300, 300]);
        setTimeout(() => {
            this.scroller.scrollToAnchor('symptomDescriptionInput');
        }, 1000);
    }
}
