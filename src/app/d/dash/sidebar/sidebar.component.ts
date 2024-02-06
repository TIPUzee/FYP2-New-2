import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { faAngleLeft, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HtmlService } from '../../../services/html/html.service';
import { DoctorService } from '../../../services/doctor/doctor.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements AfterViewInit {
    @ViewChild('sidebarToggler') sidebarToggler!: ElementRef<HTMLDivElement>;
    @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;

    faAngleLeft = faAngleLeft;
    faRightFromBracket = faRightFromBracket;
    profileFullName!: string;

    constructor(public doctor: DoctorService, private router: Router, private htmlService: HtmlService) {
        this.profileFullName = this.doctor.__fullName;
        this.doctor.fullNameChange.subscribe(v => {
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
                this.sidebarToggler.nativeElement.classList.add('closed');
            } else {
                this.sidebar.nativeElement.classList.remove('!w-0');
                this.sidebarToggler.nativeElement.classList.remove('closed');
            }
        }, true);
    }
}
