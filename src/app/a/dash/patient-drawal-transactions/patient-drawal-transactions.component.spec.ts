import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDrawalTransactionsComponent } from './patient-drawal-transactions.component';

describe('PatientDrawalTransactionsComponent', () => {
    let component: PatientDrawalTransactionsComponent;
    let fixture: ComponentFixture<PatientDrawalTransactionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientDrawalTransactionsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PatientDrawalTransactionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
