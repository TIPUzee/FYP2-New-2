import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PComponent } from './p.component';

describe('PComponent', () => {
  let component: PComponent;
  let fixture: ComponentFixture<PComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
