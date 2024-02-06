import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RatingStarsComponent } from '../../compo/rating-stars/rating-stars.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonService } from '../../../services/common/common.service';
import { HtmlService } from '../../../services/html/html.service';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-transactions',
    standalone: true,
    imports: [CommonModule, RouterLink, RatingStarsComponent, FontAwesomeModule],
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements AfterViewInit {
    faArrowUpRightFromSquare = faArrowUpRightFromSquare;

    constructor(public commonService: CommonService, private htmlService: HtmlService) {}

    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
    }
}
