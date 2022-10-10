import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppSettings } from 'src/app/config/settings';
import { Result } from 'src/app/model/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'geoml-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  apiEndpoint = AppSettings.API_ENDPOINT;
  mockScore: { human: number; bot: number } = {
    human: 16,
    bot: 8,
  };

  result$!: Observable<Result>;

  constructor(private router: Router, private gameService: GameService) {
    this.result$ = this.gameService.getResult().pipe();
  }

  ngOnInit(): void {}

  reset(): void {
    this.router.navigate(['']);
  }
}
