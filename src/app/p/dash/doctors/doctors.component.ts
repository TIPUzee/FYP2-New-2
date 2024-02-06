import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HtmlService } from '../../../services/html/html.service';
import { RatingStarsComponent } from '../../compo/rating-stars/rating-stars.component';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../services/common/common.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-doctors',
    standalone: true,
    imports: [RatingStarsComponent, CommonModule, RouterLink],
    templateUrl: './doctors.component.html',
    styleUrl: './doctors.component.scss',
})
export class DoctorsComponent implements AfterViewInit {
    constructor(private htmlService: HtmlService, public commonService: CommonService) {}

    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
    }
}
