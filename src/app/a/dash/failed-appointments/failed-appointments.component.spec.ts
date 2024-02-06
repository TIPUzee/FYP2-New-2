import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedAppointmentsComponent } from './failed-appointments.component';

describe('FailedAppointmentsComponent', () => {
    let component: FailedAppointmentsComponent;
    let fixture: ComponentFixture<FailedAppointmentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FailedAppointmentsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FailedAppointmentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
