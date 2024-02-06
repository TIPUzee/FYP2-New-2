import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsApprovalRequestsComponent } from './doctors-approval-requests.component';

describe('DoctorsApprovalRequestsComponent', () => {
    let component: DoctorsApprovalRequestsComponent;
    let fixture: ComponentFixture<DoctorsApprovalRequestsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DoctorsApprovalRequestsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DoctorsApprovalRequestsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
