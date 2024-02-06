import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { CommonService } from '../../../services/common/common.service';
import { RouterLink } from '@angular/router';
import { HtmlService } from '../../../services/html/html.service';
import { RatingStarsComponent } from '../../compo/rating-stars/rating-stars.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-completed-appointments',
    standalone: true,
    imports: [CommonModule, RouterLink, RatingStarsComponent, FontAwesomeModule],
    templateUrl: './completed-appointments.component.html',
    styleUrl: './completed-appointments.component.scss',
})
export class CompletedAppointmentsComponent implements AfterViewInit {
    faArrowUpRightFromSquare = faArrowUpRightFromSquare;

    constructor(public commonService: CommonService, private htmlService: HtmlService) {}

    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
    }
}
