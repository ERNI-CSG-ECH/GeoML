import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GuidedTour, GuidedTourService } from 'ngx-guided-tour';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { AppSettings } from 'src/app/config/settings';
import { Check } from 'src/app/model/game';
import { GameService } from 'src/app/services/game.service';
import { InformationComponent } from '../information/information.component';

@Component({
  selector: 'geoml-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.scss'],
})
export class EstimationComponent implements OnDestroy {
  private unsubscribe = new Subject<void>();
  apiEndpoint = AppSettings.API_ENDPOINT;
  tutorialDone = false;
  try = 0;
  checked = false;
  selectedValue?: number;
  correctValue?: number;
  botValue?: number;
  humanPoints?: number;
  pointGain?: number;
  showPointGain = false;

  checkText = $localize`Überprüfen`;
  nextText = $localize`Weiter`;
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
  lastCheck$?: Observable<Check>;

  @ViewChild('estimationImage') el?: ElementRef;

  constructor(
    private router: Router,
    private gameService: GameService,
    private guidedTourService: GuidedTourService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.tasks$ = this.gameService.getTasks().pipe();
  }

  ngAfterViewChecked(): void {
    if (this.el && !this.tutorialDone && this.gameService.firstRound) {
      // this.guidedTourService.startTour(this.guidedTour);
      this.tutorialDone = true;
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  check(): void {
    //TODO check value
    if (this.selectedValue !== undefined) {
      this.lastCheck$ = this.gameService.checkTask(this.try, this.selectedValue).pipe(
        tap((check: Check) => {
          this.pointGain = check.humanPoints;
          this.humanPoints = this.gameService.humanScore;
          this.correctValue = check.correct;
          this.botValue = check.botGuess;

          this.showPointGain = true;
          setTimeout(() => {
            this.showPointGain = false;
          }, 1000);
        })
      );
      this.checked = true;
    }
  }

  next(): void {
    this.correctValue = undefined;
    this.selectedValue = undefined;
    this.checked = false;
    this.try++;

    if (this.try === 5) {
      this.gameService.humanScore = 0;
      this.router.navigate(['result']);
    }
  }

  onInfoClick(): void {
    this.gameService
      .getInfo(this.try)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        this.dialog.open(InformationComponent, {
          minWidth: '370px',
          data,
        });
      });
  }
}
