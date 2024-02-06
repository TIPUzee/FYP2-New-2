import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingAppointmentsActionsComponent } from './pending-appointments-actions.component';

describe('PendingAppointmentsActionsComponent', () => {
    let component: PendingAppointmentsActionsComponent;
    let fixture: ComponentFixture<PendingAppointmentsActionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PendingAppointmentsActionsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PendingAppointmentsActionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
