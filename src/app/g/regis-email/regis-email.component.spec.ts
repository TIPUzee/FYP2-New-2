import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisEmailComponent } from './regis-email.component';

describe('RegisEmailComponent', () => {
    let component: RegisEmailComponent;
    let fixture: ComponentFixture<RegisEmailComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RegisEmailComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RegisEmailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
