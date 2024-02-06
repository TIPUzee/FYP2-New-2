import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from '../../../services/common/common.service';
import { RatingStarsComponent } from '../../compo/rating-stars/rating-stars.component';
import { HtmlService } from '../../../services/html/html.service';
import { Datepicker } from 'tw-elements';
import { DoctorService } from '../../../services/doctor/doctor.service';
import { FileDragNDropDirective } from '../../../directives/file-drag-n-drop.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faCirclePlus, faPenToSquare, faTrash, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RatingStarsComponent, FileDragNDropDirective, FontAwesomeModule, RouterLink],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements AfterViewInit {
    faXmark = faXmark;
    faCirclePlus = faCirclePlus;
    faPenToSquare = faPenToSquare;
    faTrash = faTrash;
    faCircleQuestion = faCircleQuestion;

    @ViewChild('dobInput') dobInput!: ElementRef<HTMLDivElement>;
    @ViewChild('languagesHolder') languagesHolder!: ElementRef<HTMLDivElement>;
    @ViewChild('languageSelectorInputHolder') languageSelectorInputHolder!: ElementRef<HTMLDivElement>;
    experienceFromDatePickers!: NodeListOf<HTMLDivElement>;
    experienceToDatePickers!: NodeListOf<HTMLDivElement>;

    profileLanguagesChipsEle: any;

    profileFullName!: string;

    constructor(public commonService: CommonService, private htmlService: HtmlService, public doctor: DoctorService, private elem: ElementRef<HTMLDialogElement>) {
        this.profileFullName = doctor.__fullName;
        doctor.fullNameChange.subscribe(v => {
            this.profileFullName = v;
        });
    }

    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
        this.experienceFromDatePickers = this.elem.nativeElement.querySelectorAll('.experienceFromDatePicker');
        this.experienceToDatePickers = this.elem.nativeElement.querySelectorAll('.experienceToDatePicker');
        this.initDOBPicker();
    }

    initDOBPicker(): void {
        new Datepicker(this.dobInput.nativeElement, {
            max: new Date(2007, 5, 20),
            disableFuture: true,
            confirmDateOnSelect: true,
        });
        this.experienceFromDatePickers.forEach((ele: HTMLDivElement, _: number) => {
            new Datepicker(ele, {
                max: new Date(2023, 12, 5),
                disableFuture: true,
                confirmDateOnSelect: true,
            });
        });
        this.experienceToDatePickers.forEach((ele: HTMLDivElement, _: number) => {
            new Datepicker(ele, {
                max: new Date(2023, 12, 5),
                disableFuture: true,
                confirmDateOnSelect: true,
            });
        });
    }
}
