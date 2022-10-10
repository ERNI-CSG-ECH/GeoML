import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_MODULES } from 'src/app/app.module';

import { EstimationComponent } from './estimation.component';

describe('EstimationComponent', () => {
  let component: EstimationComponent;
  let fixture: ComponentFixture<EstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstimationComponent],
      imports: [...MATERIAL_MODULES],
    }).compileComponents();

    fixture = TestBed.createComponent(EstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
