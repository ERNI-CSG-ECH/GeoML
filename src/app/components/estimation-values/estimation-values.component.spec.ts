import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationValuesComponent } from './estimation-values.component';

describe('EstimationValuesComponent', () => {
  let component: EstimationValuesComponent;
  let fixture: ComponentFixture<EstimationValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimationValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimationValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
