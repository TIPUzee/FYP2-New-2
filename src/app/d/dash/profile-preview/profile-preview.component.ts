import { Component } from '@angular/core';
import { DoctorComponent } from '../../../p/dash/doctor/doctor.component';

@Component({
    selector: 'app-profile-preview',
    standalone: true,
    imports: [DoctorComponent],
    templateUrl: './profile-preview.component.html',
    styleUrl: './profile-preview.component.scss',
})
export class ProfilePreviewComponent {}
