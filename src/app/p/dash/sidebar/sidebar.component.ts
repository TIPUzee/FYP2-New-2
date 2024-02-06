import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { faAngleLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PatientService } from '../../../services/patient/patient.service';
import { HtmlService } from '../../../services/html/html.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewInit {
    @ViewChild('sidebar_toggler') sidebar_toggler!: ElementRef<HTMLDivElement>;
    @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;

    faAngleLeft = faAngleLeft;
    faRightFromBracket = faRightFromBracket;
    profileFullName!: string;

    constructor(public patient: PatientService, private htmlService: HtmlService) {
        this.profileFullName = this.patient.__fullName;
        this.patient.fullNameChange.subscribe(v => {
            this.profileFullName = v;
        });
    }

    ngAfterViewInit(): void {
        this.enableResposiveness();
    }

    enableResposiveness(): void {
        this.htmlService.addWindowWidthResizeEventListener((h: number, w: number) => {
            if (w < 1280) {
                this.sidebar.nativeElement.classList.add('!w-0');
                this.sidebar_toggler.nativeElement.classList.add('closed');
            } else {
                this.sidebar.nativeElement.classList.remove('!w-0');
                this.sidebar_toggler.nativeElement.classList.remove('closed');
            }
        }, true);
    }
}
