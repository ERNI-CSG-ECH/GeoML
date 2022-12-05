import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameService } from 'src/app/services/game.service';

import { EstimationImageComponent } from './estimation-image.component';

describe('EstimationImageComponent', () => {
  let component: EstimationImageComponent;
  let fixture: ComponentFixture<EstimationImageComponent>;

  beforeEach(async () => {
    const gameMock = { randomTasks$: new Promise(() => []) };
    await TestBed.configureTestingModule({
      declarations: [EstimationImageComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: GameService, useValue: gameMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(EstimationImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
