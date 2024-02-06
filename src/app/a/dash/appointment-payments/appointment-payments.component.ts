import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HtmlService } from '../../../services/html/html.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudArrowUp, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorsComponent } from '../doctors/doctors.component';

@Component({
    selector: 'app-appointment-payments',
    standalone: true,
    imports: [FontAwesomeModule, RouterLink, CommonModule, RouterOutlet, RouterLinkActive, DoctorsComponent],
    templateUrl: './appointment-payments.component.html',
    styleUrl: './appointment-payments.component.scss',
})
export class AppointmentPaymentsComponent implements AfterViewInit {
    @ViewChild('dataTableContainer') dataTableContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('dataTableSearch') dataTableSearch!: ElementRef<HTMLInputElement>;
    @ViewChild('searchBtnsContainer') searchBtnsContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('possibleActionsModal') possibleActionsModal!: ElementRef<HTMLDivElement>;

    faCloudArrowUp = faCloudArrowUp;
    faArrowLeft = faArrowLeft;

    public dataTableInstance: any = null;

    // utils
    Object = Object;

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
            label: 'Appointment ID',
            field: 'appointment id',
        },
        {
            label: 'Patient ID',
            field: 'patient id',
        },
        {
            label: 'Doctor ID',
            field: 'doctor ID',
        },
        {
            label: 'Appointment Current Status',
            field: 'apppointment current status',
        },
        {
            label: 'Payment Time',
            field: 'payment time',
        },
        {
            label: 'Paid Amount',
            field: 'paid amount',
        },
    ];

    constructor(private htmlService: HtmlService, public router: Router) {}

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
