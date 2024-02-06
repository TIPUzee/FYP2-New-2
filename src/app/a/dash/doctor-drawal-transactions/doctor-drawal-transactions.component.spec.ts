import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDrawalTransactionsComponent } from './doctor-drawal-transactions.component';

describe('DoctorDrawalTransactionsComponent', () => {
    let component: DoctorDrawalTransactionsComponent;
    let fixture: ComponentFixture<DoctorDrawalTransactionsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DoctorDrawalTransactionsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DoctorDrawalTransactionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
