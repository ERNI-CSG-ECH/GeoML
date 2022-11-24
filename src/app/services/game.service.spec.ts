import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GameService } from './game.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    const mockDb = {
      database: {
        ref: () => {
          return { get: () => new Promise(() => {}) };
        },
      },
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebase)],
      providers: [{ provide: AngularFireDatabase, useValue: mockDb }],
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
