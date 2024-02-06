import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecializationCategoryAndDiseaseMappingComponent } from './specialization-category-and-disease-mapping.component';

describe('SpecializationCategoryAndDiseaseMappingComponent', () => {
  let component: SpecializationCategoryAndDiseaseMappingComponent;
  let fixture: ComponentFixture<SpecializationCategoryAndDiseaseMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecializationCategoryAndDiseaseMappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecializationCategoryAndDiseaseMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
