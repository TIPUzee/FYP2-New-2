import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedAppointmentsComponent } from './completed-appointments.component';

describe('CompletedAppointmentsComponent', () => {
    let component: CompletedAppointmentsComponent;
    let fixture: ComponentFixture<CompletedAppointmentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompletedAppointmentsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CompletedAppointmentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
