import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidAppointmentsComponent } from './unpaid-appointments.component';

describe('UnpaidAppointmentsComponent', () => {
    let component: UnpaidAppointmentsComponent;
    let fixture: ComponentFixture<UnpaidAppointmentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UnpaidAppointmentsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UnpaidAppointmentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
