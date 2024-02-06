import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNotifyContainerComponent } from './popup-notify-container.component';

describe('NotificationContainerComponent', () => {
    let component: PopupNotifyContainerComponent;
    let fixture: ComponentFixture<PopupNotifyContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PopupNotifyContainerComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(PopupNotifyContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
