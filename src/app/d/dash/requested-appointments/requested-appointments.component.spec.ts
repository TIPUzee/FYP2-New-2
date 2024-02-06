import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedAppointmentsComponent } from './requested-appointments.component';

describe('RequestedAppointmentsComponent', () => {
    let component: RequestedAppointmentsComponent;
    let fixture: ComponentFixture<RequestedAppointmentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RequestedAppointmentsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RequestedAppointmentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
