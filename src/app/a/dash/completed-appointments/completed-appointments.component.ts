import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HtmlService } from '../../../services/html/html.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudArrowUp, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorsComponent } from '../doctors/doctors.component';
import { OffcanvasComponent } from '../../../utils/components/offcanvas/offcanvas.component';
import { OffcanvasService } from '../../../utils/components/offcanvas/offcanvas.service';

@Component({
    selector: 'app-completed-appointments',
    standalone: true,
    imports: [FontAwesomeModule, RouterLink, CommonModule, RouterOutlet, RouterLinkActive, DoctorsComponent, OffcanvasComponent],
    templateUrl: './completed-appointments.component.html',
    styleUrl: './completed-appointments.component.scss',
})
export class CompletedAppointmentsComponent implements AfterViewInit {
    @ViewChild('dataTableContainer') dataTableContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('dataTableSearch') dataTableSearch!: ElementRef<HTMLInputElement>;
    @ViewChild('searchBtnsContainer') searchBtnsContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('possibleActionsModal') possibleActionsModal!: ElementRef<HTMLDivElement>;

    faCloudArrowUp = faCloudArrowUp;
    faArrowLeft = faArrowLeft;

    public dataTableInstance: any = null;

    // utils
    Object = Object;
    offcanvasCurrentComponent: any = null;

    // Datatable
    columns = [
        {
            label: 'ID',
            field: 'id',
            fixed: true,
            width: 65,
        },
        {
            label: 'Doctor ID',
            field: 'doctor id',
        },
        {
            label: 'Patient ID',
            field: 'patient id',
        },
        {
            label: 'Doctor Delay Count',
            field: 'doctor delay count',
        },
        {
            label: 'Patient Reschedule Count',
            field: 'patient reschedule count',
        },
        {
            label: 'Requested Time',
            field: 'requested time',
        },
        {
            label: 'Meeting Time From',
            field: 'meeting time from',
        },
        {
            label: 'Meeting Time To',
            field: 'meeting time to',
        },
        {
            label: 'Patient Rating',
            field: 'patient rating',
        },
        {
            label: 'Secret Code',
            field: 'secret code',
        },
    ];

    constructor(private htmlService: HtmlService, public router: Router, public offcanvasService: OffcanvasService) {}

    ngAfterViewInit(): void {
        this.initDataTable();
        this.htmlService.initTailwindElements();
    }

    //
    // Datatable
    //
    initDataTable(): void {
        const rows = [[1], [2], [1], [2], [1], [2], [1], [2], [1], [2], [1], [2], [1], [2], [1], [2], [1], [2], [1], [2], [1], [2], [1], [2], [1], [2], [1], [2]];
        this.dataTableInstance = this.htmlService.createDataTable(
            this.dataTableContainer.nativeElement,
            this.dataTableSearch.nativeElement,
            this.columns,
            undefined,
            this.searchBtnsContainer.nativeElement,
        );

        (this.dataTableContainer.nativeElement as any).addEventListener('rowClick.te.datatable', () => {
            this.possibleActionsModal.nativeElement.click();
        });
        this.htmlService.updateDataTable(this.dataTableInstance, rows);
    }
}
