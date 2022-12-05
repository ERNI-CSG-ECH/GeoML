import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationImageComponent } from './estimation-image.component';

describe('EstimationImageComponent', () => {
  let component: EstimationImageComponent;
  let fixture: ComponentFixture<EstimationImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimationImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimationImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
