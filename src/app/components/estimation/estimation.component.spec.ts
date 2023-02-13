import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MATERIAL_MODULES } from 'src/app/app.module';

import { EstimationComponent } from './estimation.component';
import { GameService } from 'src/app/services/game.service';
import { of } from 'rxjs';

describe('EstimationComponent', () => {
  let component: EstimationComponent;
  let fixture: ComponentFixture<EstimationComponent>;

  beforeEach(async () => {
    const gameMock = { randomTasks$: of([]) };
    await TestBed.configureTestingModule({
      declarations: [EstimationComponent],
      imports: [...MATERIAL_MODULES],
      providers: [{ provide: GameService, useValue: gameMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(EstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
