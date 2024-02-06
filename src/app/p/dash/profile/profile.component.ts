import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonService } from '../../../services/common/common.service';
import { RatingStarsComponent } from '../../compo/rating-stars/rating-stars.component';
import { HtmlService } from '../../../services/html/html.service';
import { PatientService } from '../../../services/patient/patient.service';
import { Datepicker } from 'tw-elements';
import { ModalComponent } from '../../../utils/components/modal/modal.component';
import { NotificationService } from "../../../utils/components/notification/notification.service";

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RatingStarsComponent, ModalComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
})
export class ProfileComponent implements AfterViewInit {
    @ViewChild('dobInput') dobInput!: ElementRef<HTMLDivElement>;
    
    profileFullName!: string;
    
    constructor(public commonService: CommonService, private htmlService: HtmlService, public patient: PatientService,
                public notificationService: NotificationService) {
        this.profileFullName = patient.__fullName;
        patient.fullNameChange.subscribe(v => {
            this.profileFullName = v;
        });
    }
    
    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
        this.initDOBPicker();
    }
    
    initDOBPicker(): void {
        new Datepicker(this.dobInput.nativeElement, {
            max: new Date(2007, 5, 20),
            disableFuture: true,
            confirmDateOnSelect: true,
        });
    }
}
