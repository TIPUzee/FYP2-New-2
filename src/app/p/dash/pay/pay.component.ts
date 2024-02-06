import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from '../../../services/common/common.service';
import { HtmlService } from '../../../services/html/html.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RatingStarsComponent } from '../../compo/rating-stars/rating-stars.component';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
    selector: 'app-pay',
    standalone: true,
    imports: [CommonModule, RatingStarsComponent, RouterLink, HttpClientModule],
    templateUrl: './pay.component.html',
    styleUrl: './pay.component.scss',
})
export class PayComponent implements AfterViewInit {
    @ViewChild('payfastTokenInput') payfastTokenInput!: ElementRef<HTMLInputElement>;

    constructor(
        public commonService: CommonService,
        private htmlService: HtmlService,
        public scroller: ViewportScroller,
        private http: HttpClient,
        public location: Location,
    ) {}

    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
        this.scroller.setHistoryScrollRestoration('auto');
        this.scroller.setOffset([300, 300]);
        setTimeout(() => {
            this.scroller.scrollToAnchor('symptomDescriptionInput');
        }, 1000);

        this.getAndSetPayfastToken();
    }

    getAndSetPayfastToken(): void {
        this.http
            .post('https://skillsseekho.com/api/get-payfast-redirect-form-params-ai-disease-predictor', {
                amount: 1500,
            })
            .subscribe((e: any) => {
                this.payfastTokenInput.nativeElement.value = e['data']['TOKEN'];
                console.log(e['data']['TOKEN']);
            });
    }
}
