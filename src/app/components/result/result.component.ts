import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
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
  aboutText = $localize`Mehr erfahren`;
  shareMessage = $localize`Fordere den Algorithmus heraus!`;

  result!: Result;
  imageSrc$: Observable<string[]>;

  @ViewChild('results', { read: ElementRef }) resultCardEl!: ElementRef;

  constructor(private router: Router, private gameService: GameService) {
    this.result = this.gameService.getResult();
    this.imageSrc$ = combineLatest(
      this.result.checks.map((check) => {
        return this.gameService.loadImage(check.task, true);
      })
    );
  }

  ngOnInit(): void {}

  reset(): void {
    this.gameService.reset();
    this.router.navigate(['']);
  }

  scrollToResult(): void {
    this.resultCardEl.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
