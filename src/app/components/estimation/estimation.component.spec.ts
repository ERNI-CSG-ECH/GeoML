import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuidedTourService } from 'ngx-guided-tour';
import { MATERIAL_MODULES } from 'src/app/app.module';

import { EstimationComponent } from './estimation.component';

describe('EstimationComponent', () => {
  let component: EstimationComponent;
  let fixture: ComponentFixture<EstimationComponent>;

  beforeEach(async () => {
    const tourMock = {
      startTour: () => {},
    };
    await TestBed.configureTestingModule({
      declarations: [EstimationComponent],
      imports: [...MATERIAL_MODULES],
      providers: [{ provide: GuidedTourService, useValue: tourMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(EstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
