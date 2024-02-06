import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPaymentsComponent } from './appointment-payments.component';

describe('AppointmentPaymentsComponent', () => {
    let component: AppointmentPaymentsComponent;
    let fixture: ComponentFixture<AppointmentPaymentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppointmentPaymentsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AppointmentPaymentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
