import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MATERIAL_MODULES } from 'src/app/app.module';

import { ResultComponent } from './result.component';
import { GameService } from 'src/app/services/game.service';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;

  beforeEach(async () => {
    const gameMock = {
      getResult: () => {
        return { humanTotal: 0, botTotal: 0, checks: [] };
      },
    };
    await TestBed.configureTestingModule({
      declarations: [ResultComponent],
      imports: [...MATERIAL_MODULES, HttpClientTestingModule],
      providers: [{ provide: GameService, useValue: gameMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
