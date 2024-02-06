import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { HtmlService } from '../../../services/html/html.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { OffcanvasComponent } from '../../../utils/components/offcanvas/offcanvas.component';
import { OffcanvasService } from '../../../utils/components/offcanvas/offcanvas.service';

@Component({
    selector: 'app-patients',
    standalone: true,
    imports: [FontAwesomeModule, CommonModule, OffcanvasComponent],
    templateUrl: './patients.component.html',
    styleUrl: './patients.component.scss',
})
export class PatientsComponent implements AfterViewInit {
    @ViewChild('dataTableContainer') dataTableContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('dataTableSearch') dataTableSearch!: ElementRef<HTMLInputElement>;
    @ViewChild('searchBtnsContainer') searchBtnsContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('possibleActionsModal') possibleActionsModal!: ElementRef<HTMLDivElement>;

    faCloudArrowUp = faCloudArrowUp;

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
            label: 'Name',
            field: 'name',
        },
        {
            label: 'Email',
            field: 'email',
        },
        {
            label: 'Date of birth',
            field: 'date of birth',
        },
        {
            label: 'Password',
            field: 'password',
        },
        {
            label: 'Mobile Number',
            field: 'mobile number',
        },
        {
            label: 'Account Status',
            field: 'account status',
        },
        {
            label: 'Refundable Amount',
            field: 'refundable amount',
        },
        {
            label: 'Registration Time',
            field: 'registration time',
        },
    ];

    constructor(private htmlService: HtmlService, public offcanvasService: OffcanvasService) {}

    ngAfterViewInit(): void {
        this.initDataTable();
        this.htmlService.initTailwindElements();
    }

    //
    // Datatable
    //
    initDataTable(): void {
        const rows = [
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Zeeshan', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'zeeshan@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
            [1, 'John Doe', 'johndoe@example.com', '1990-05-15', 'password123', '+1234567890', '2023-12-06T10:00:00Z'],
            [2, 'Jane Smith', 'janesmith@example.com', '1988-09-20', 'securepass', '+1987654321', '2023-12-06T11:30:00Z'],
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
