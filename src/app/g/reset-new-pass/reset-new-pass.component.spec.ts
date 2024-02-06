import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetNewPassComponent } from './reset-new-pass.component';

describe('ResetNewPassComponent', () => {
    let component: ResetNewPassComponent;
    let fixture: ComponentFixture<ResetNewPassComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ResetNewPassComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ResetNewPassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
