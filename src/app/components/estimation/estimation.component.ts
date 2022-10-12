import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GuidedTour, GuidedTourService } from 'ngx-guided-tour';
import { Observable, take, tap } from 'rxjs';
import { AppSettings } from 'src/app/config/settings';
import { Check } from 'src/app/model/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'geoml-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.scss'],
})
export class EstimationComponent {
  apiEndpoint = AppSettings.API_ENDPOINT;
  tutorialDone = false;
  try = 0;
  checked = false;
  selectedValue?: number;
  correctValue?: number;
  score?: { human: number; bot: number };

  checkText = $localize`Prüfen`;
  nextText = $localize`Nächstes Bild`;
  resultText = $localize`Abschliessen`;

  guidedTour: GuidedTour = {
    tourId: 'tutorial',
    steps: [
      {
        selector: '.estimation__content-image',
        content: 'Auf dem Bild wird das Strassennetz, welches sie bewerten sollen, weiss markiert.',
        orientation: 'bottom',
      },
      {
        selector: '.estimation__values-number:nth-child(3)',
        content: 'Wählen sie die Risikostufe aus.',
        orientation: 'top',
      },
      { selector: '.estimation__actions-next', content: 'Bestätigen sie die Auswahl.', orientation: 'top' },
    ],
  };

  tasks$!: Observable<string[]>;

  @ViewChild('estimationImage') el?: ElementRef;

  constructor(
    private router: Router,
    private gameService: GameService,
    private guidedTourService: GuidedTourService,
    private cdr: ChangeDetectorRef
  ) {
    this.tasks$ = this.gameService.getTasks().pipe();
  }

  ngAfterViewChecked(): void {
    if (this.el && !this.tutorialDone && this.gameService.firstRound) {
      this.guidedTourService.startTour(this.guidedTour);
      this.tutorialDone = true;
      this.cdr.detectChanges();
    }
  }

  check(): void {
    //TODO check value
    if (this.selectedValue !== undefined) {
      this.gameService
        .checkTask(this.try, this.selectedValue)
        .pipe(take(1))
        .subscribe((check: Check) => {
          this.score = { human: check.humanPoints, bot: check.botPoints };
          this.correctValue = check.correct;
        });
      this.checked = true;
    }
  }

  next(): void {
    //TODO next image
    this.score = undefined;
    this.correctValue = undefined;
    this.selectedValue = undefined;
    this.checked = false;
    this.try++;

    if (this.try === 5) {
      this.router.navigate(['result']);
    }
  }
}
