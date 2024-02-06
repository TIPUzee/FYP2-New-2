import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CommonService } from '../../../services/common/common.service';
import { RatingStarsComponent } from '../../compo/rating-stars/rating-stars.component';
import { HtmlService } from '../../../services/html/html.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { AgChartsAngular, AgChartsAngularModule } from 'ag-charts-angular';
import {
    AgBarSeriesOptions,
    AgCategoryAxisOptions,
    AgChartCaptionOptions,
    AgChartLegendOptions,
    AgChartOptions,
    AgChartSubtitleOptions,
    AgCharts,
    AgLineSeriesOptions,
    AgNumberAxisOptions,
} from 'ag-charts-community';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
    selector: 'app-doctor',
    standalone: true,
    imports: [CommonModule, RatingStarsComponent, RouterLink, FontAwesomeModule, AgChartsAngularModule],
    templateUrl: './doctor.component.html',
    styleUrl: './doctor.component.scss',
})
export class DoctorComponent implements AfterViewInit {
    faAngleDown = faAngleDown;

    @ViewChild('chartThreeMonthsAppointments') chartThreeMonthsAppointments!: AgChartsAngular;
    chartThreeMonthsAppointmentsOptions!: AgChartOptions;
    @ViewChild('chartLast3WeekRating') chartLast3WeekRating!: AgChartsAngular;
    chartLast3WeekRatingOptions!: AgChartOptions;
    @ViewChild('chartLast3WeekRating') chartAllTimeRating!: AgChartsAngular;
    chartAllTimeRatingOptions!: AgChartOptions;

    constructor(public commonService: CommonService, private htmlService: HtmlService, public utilsService: UtilsService) {
        this.initAgCharts();
    }

    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
        this.initAgChartsColors();
    }

    initAgCharts(): void {
        let oldRandVal = 12;
        let data = Array.from({ length: 90 }, (_, index) => {
            oldRandVal = this.commonService.getRandomNumber(oldRandVal - 5, oldRandVal + 5);
            return { day: `Day ${index + 1}`, appointments: oldRandVal, rating: this.commonService.getRandomNumber(1, 5) };
        });

        this.chartThreeMonthsAppointmentsOptions = {
            title: { text: 'No. of Completed Appointments' } as AgChartCaptionOptions,
            subtitle: { text: 'Last 3 months' },
            data: data,
            series: [
                {
                    type: 'line',
                    xKey: 'day',
                    yKey: 'appointments',
                    xName: 'Day',
                    yName: 'No. of Appointments',
                    nodeClickRange: 'nearest',
                } as AgLineSeriesOptions,
            ],
            legend: {
                position: 'top',
            } as AgChartLegendOptions,
        };
        this.chartLast3WeekRatingOptions = {
            title: { text: 'Appointments Rating' } as AgChartCaptionOptions,
            subtitle: { text: 'Last 3 weeks' },
            data: [
                { title: 'Poor', count: this.commonService.getRandomNumber(1, 35) },
                { title: 'Fair', count: this.commonService.getRandomNumber(1, 35) },
                { title: 'Good', count: this.commonService.getRandomNumber(1, 35) },
                { title: 'Very Good', count: this.commonService.getRandomNumber(1, 35) },
                { title: 'Excellent', count: this.commonService.getRandomNumber(1, 35) },
            ],
            series: [{ type: 'bar', xKey: 'title', yKey: 'count', yName: 'Rating by patients', nodeClickRange: 'nearest' } as AgBarSeriesOptions],
            legend: {
                position: 'top',
            } as AgChartLegendOptions,
        };
    }

    initAgChartsColors(): void {
        AgCharts.updateDelta(this.chartThreeMonthsAppointments.chart!, {
            background: {
                fill: '#edf7fe',
            },
        });
        AgCharts.updateDelta(this.chartLast3WeekRating.chart!, {
            background: {
                fill: '#edf7fe',
            },
        });
    }
}
