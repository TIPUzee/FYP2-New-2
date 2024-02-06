import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewportScroller } from '@angular/common';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonService } from '../../../../services/common/common.service';
import { HtmlService } from '../../../../services/html/html.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-options',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule, RouterLink],
    templateUrl: './options.component.html',
    styleUrl: './options.component.scss',
})
export class OptionsComponent implements AfterViewInit {
    faChevronDown = faChevronDown;

    constructor(public commonService: CommonService, private htmlService: HtmlService, public scroller: ViewportScroller) {}

    ngAfterViewInit(): void {
        this.htmlService.scrollToTop();
        this.htmlService.initTailwindElements();
    }
}
