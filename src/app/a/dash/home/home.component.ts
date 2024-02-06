import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [AgChartsAngularModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
    @ViewChild('barChart') barChart!: ElementRef<HTMLCanvasElement>;
    @ViewChild('tumorModelUsageLineChart3Months') tumorModelUsageLineChart3MonthsElem!: ElementRef<HTMLCanvasElement>;

    @ViewChild('chart1')
    public chart1!: AgChartsAngular;
    @ViewChild('chart2')
    public chart2!: AgChartsAngular;
    @ViewChild('chart3')
    public chart3!: AgChartsAngular;
    @ViewChild('chart4')
    public chart4!: AgChartsAngular;
    @ViewChild('chart5')
    public chart5!: AgChartsAngular;
    @ViewChild('chart6')
    public chart6!: AgChartsAngular;
    @ViewChild('chart7')
    public chart7!: AgChartsAngular;

    public options!: AgChartOptions;

    public tumorNDiseaseModelUsage8Weeks: AgChartOptions;

    constructor() {
        this.options = {
            // Chart Title
            title: { text: 'Tumor Detection Model Usage' } as AgChartCaptionOptions,
            // Chart Subtitle
            subtitle: { text: '1 Week Usage' } as AgChartSubtitleOptions,
            // Data: Data to be displayed within the chart
            data: [
                { month: 'Sun', usage: 1254000 },
                { month: 'Mon', usage: 162000 },
                { month: 'Tue', usage: 302000 },
                { month: 'Wed', usage: 800000 },
                { month: 'Thu', usage: 1254000 },
                { month: 'Fri', usage: 1254000 },
                { month: 'Sat', usage: 1254000 },
            ],
            // Series: Defines which chart type and data to use
            series: [
                { type: 'bar', xKey: 'month', yKey: 'usage', yName: 'Usage' } as AgBarSeriesOptions,
                {
                    type: 'line',
                    xKey: 'month',
                } as AgLineSeriesOptions,
            ],
            // Axes: Configure the axes for the chart
            axes: [
                // Display category (xKey) as the bottom axis
                {
                    type: 'category',
                    position: 'bottom',
                } as AgCategoryAxisOptions,
                // Use left axis for 'usage' series
                {
                    type: 'number',
                    position: 'left',
                    keys: ['usage'],
                } as AgNumberAxisOptions,
                // Use right axis for 'avgTemp' series
                {
                    type: 'number',
                    position: 'right',
                    keys: ['avgTemp'],
                    // Format the label applied to this axis (append ' °C')
                    label: {
                        formatter: params => {
                            return params.value + ' °C';
                        },
                    },
                } as AgNumberAxisOptions,
            ],
            // Legend: Matches visual elements to their corresponding series or data categories.
            legend: {
                position: 'top',
            } as AgChartLegendOptions,
        };

        this.tumorNDiseaseModelUsage8Weeks = {
            title: {
                text: 'Temperature Readings',
            },
            series: [
                {
                    data: [
                        {
                            time: Date.parse('01 Jan 2020 13:25:00 GMT'),
                            usage: 21,
                        },
                        {
                            time: Date.parse('01 Jan 2020 13:26:00 GMT'),
                            usage: 22,
                        },
                        {
                            time: Date.parse('01 Jan 2020 13:28:00 GMT'),
                            usage: 22,
                        },
                        {
                            time: Date.parse('01 Jan 2020 13:29:00 GMT'),
                            usage: 23,
                        },
                        {
                            time: Date.parse('01 Jan 2020 13:30:00 GMT'),
                            usage: 24,
                        },
                        {
                            time: Date.parse('01 Jan 2020 13:31:00 GMT'),
                            usage: 24,
                        },
                        {
                            time: Date.parse('01 Jan 2020 13:32:00 GMT'),
                            usage: 24.5,
                        },
                        {
                            time: Date.parse('01 Jan 2020 13:33:00 GMT'),
                            usage: 24.5,
                        },
                    ],
                    xKey: 'time',
                    yKey: 'usage',
                    yName: 'Tumor Detection Model',
                },
                {
                    data: [
                        {
                            time: new Date('01 Jan 2020 13:25:30 GMT'),
                            usage: 25,
                        },
                        {
                            time: new Date('01 Jan 2020 13:26:30 GMT'),
                            usage: 24,
                        },
                        {
                            time: new Date('01 Jan 2020 13:27:30 GMT'),
                            usage: 24,
                        },
                        {
                            time: new Date('01 Jan 2020 13:28:30 GMT'),
                            usage: 23,
                        },
                        {
                            time: new Date('01 Jan 2020 13:29:30 GMT'),
                            usage: 22.5,
                        },
                        {
                            time: new Date('01 Jan 2020 13:30:30 GMT'),
                            usage: 21.5,
                        },
                        {
                            time: new Date('01 Jan 2020 13:31:30 GMT'),
                            usage: 22.5,
                        },
                    ],
                    xKey: 'time',
                    yKey: 'usage',
                    yName: 'Disease Prediction Model',
                },
            ],
            axes: [
                {
                    type: 'time',
                    position: 'bottom',
                },
                {
                    type: 'number',
                    position: 'left',
                    label: {
                        format: '#{.1f} °C',
                    },
                },
            ],
        };
    }

    agChartsBgColor(): void {
        AgCharts.updateDelta(this.chart1.chart!, {
            background: {
                fill: 'rgb(255, 255, 255)',
            },
        });
        AgCharts.updateDelta(this.chart2.chart!, {
            background: {
                fill: 'rgb(255, 255, 255)',
            },
        });
        AgCharts.updateDelta(this.chart3.chart!, {
            background: {
                fill: 'rgb(255, 255, 255)',
            },
        });
        AgCharts.updateDelta(this.chart4.chart!, {
            background: {
                fill: 'rgb(255, 255, 255)',
            },
        });
        AgCharts.updateDelta(this.chart5.chart!, {
            background: {
                fill: 'rgb(255, 255, 255)',
            },
        });
        AgCharts.updateDelta(this.chart6.chart!, {
            background: {
                fill: 'rgb(255, 255, 255)',
            },
        });
        AgCharts.updateDelta(this.chart7.chart!, {
            background: {
                fill: 'rgb(255, 255, 255)',
            },
        });
    }

    ngAfterViewInit(): void {
        this.agChartsBgColor();
        this.agChartsBgColor();
    }
}
