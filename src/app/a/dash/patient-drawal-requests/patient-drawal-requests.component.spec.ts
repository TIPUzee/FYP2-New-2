import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDrawalRequestsComponent } from './patient-drawal-requests.component';

describe('PatientDrawalRequestsComponent', () => {
    let component: PatientDrawalRequestsComponent;
    let fixture: ComponentFixture<PatientDrawalRequestsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientDrawalRequestsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientDrawalRequestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
