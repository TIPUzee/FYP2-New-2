import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDrawalRequestsComponent } from './doctor-drawal-requests.component';

describe('DoctorDrawalRequestsComponent', () => {
    let component: DoctorDrawalRequestsComponent;
    let fixture: ComponentFixture<DoctorDrawalRequestsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DoctorDrawalRequestsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DoctorDrawalRequestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
