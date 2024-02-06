import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedDoctorsComponent } from './suggested-doctors.component';

describe('SuggestedDoctorsComponent', () => {
    let component: SuggestedDoctorsComponent;
    let fixture: ComponentFixture<SuggestedDoctorsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SuggestedDoctorsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SuggestedDoctorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
