import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MATERIAL_MODULES } from 'src/app/app.module';

import { EstimationComponent } from './estimation.component';
import { GameService } from 'src/app/services/game.service';

describe('EstimationComponent', () => {
  let component: EstimationComponent;
  let fixture: ComponentFixture<EstimationComponent>;

  beforeEach(async () => {
    const gameMock = { randomTasks$: new Promise(() => []) };
    await TestBed.configureTestingModule({
      declarations: [EstimationComponent],
      imports: [...MATERIAL_MODULES, HttpClientTestingModule],
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
