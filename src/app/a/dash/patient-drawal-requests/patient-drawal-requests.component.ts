import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HtmlService } from '../../../services/html/html.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudArrowUp, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorsComponent } from '../doctors/doctors.component';

@Component({
    selector: 'app-patient-drawal-requests',
    standalone: true,
    imports: [FontAwesomeModule, RouterLink, CommonModule, RouterOutlet, RouterLinkActive, DoctorsComponent],
    templateUrl: './patient-drawal-requests.component.html',
    styleUrl: './patient-drawal-requests.component.scss',
})
export class PatientDrawalRequestsComponent implements AfterViewInit {
    @ViewChild('dataTableContainer') dataTableContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('dataTableSearch') dataTableSearch!: ElementRef<HTMLInputElement>;
    @ViewChild('searchBtnsContainer') searchBtnsContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('possibleActionsModal') possibleActionsModal!: ElementRef<HTMLDivElement>;

    faCloudArrowUp = faCloudArrowUp;
    faArrowLeft = faArrowLeft;

    public dataTableInstance: any = null;

    // utils
    Object = Object;
    console = console;

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
            label: 'Withdrawal Amount',
            field: 'withdrawal amount',
        },
        {
            label: 'Receiver Easypaisa Number',
            field: 'receiver easypaisa number',
        },
        {
            label: 'Receiver Easypaisa Username',
            field: 'receiver easypaisa username',
        },
        {
            label: 'Sender Easypaisa Number',
            field: 'sender Easypaisa number',
        },
        {
            label: 'Sender Easypaisa Username',
            field: 'sender Easypaisa username',
        },
        {
            label: 'Transaction Title',
            field: 'transaction title',
        },
        {
            label: 'Transaction ID By Easypaisa',
            field: 'transaction id by easypaisa',
        },
        {
            label: 'Transaction Time',
            field: 'transaction time',
        },
        {
            label: 'Requested Time',
            field: 'requested time',
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
