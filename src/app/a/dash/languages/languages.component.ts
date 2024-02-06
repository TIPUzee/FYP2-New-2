import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HtmlService } from '../../../services/html/html.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudArrowUp, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DoctorsComponent } from '../doctors/doctors.component';

@Component({
    selector: 'app-languages',
    standalone: true,
    imports: [FontAwesomeModule, RouterLink, CommonModule, RouterOutlet, RouterLinkActive, DoctorsComponent],
    templateUrl: './languages.component.html',
    styleUrl: './languages.component.scss',
})
export class LanguagesComponent implements AfterViewInit {
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
            label: 'Title',
            field: 'title',
        },
        {
            label: 'Total No. of Doctors',
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
        const rows = [
            [1, 'Urdu', 302],
            [2, 'English', 43],
            [1, 'Urdu', 302],
            [2, 'English', 43],
            [1, 'Urdu', 302],
            [2, 'English', 43],
            [1, 'Urdu', 302],
            [2, 'English', 43],
            [1, 'Urdu', 302],
            [2, 'English', 43],
            [1, 'Urdu', 302],
            [2, 'English', 43],
            [1, 'Urdu', 302],
            [2, 'English', 43],
            [1, 'Urdu', 302],
            [2, 'English', 43],
            [1, 'Urdu', 302],
            [2, 'English', 43],
            [1, 'Urdu', 302],
            [2, 'English', 43],
            [1, 'Urdu', 302],
            [2, 'English', 43],
            [1, 'Urdu', 302],
            [2, 'Pashto', 29],
            [1, 'Bangoli', 78],
            [2, 'English', 43],
            [1, 'Urdu', 302],
            [2, 'English', 43],
        ];
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
