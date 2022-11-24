import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GuidedTour, GuidedTourService } from 'ngx-guided-tour';
import { Observable, Subject, take, takeUntil, tap } from 'rxjs';
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
  tutorialDone = false;
  try = 0;
  currentTask?: string;
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

  tasks$!: Promise<string[]>;
  lastCheck$?: Promise<Check>;
  imageSrc$?: Promise<string>;

  @ViewChild('estimationImage') el?: ElementRef;

  constructor(
    private router: Router,
    private gameService: GameService,
    private guidedTourService: GuidedTourService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.tasks$ = this.gameService.randomTasks$.then((tasks) => {
      this.currentTask = tasks[0];
      this.loadImage(this.currentTask);
      return tasks;
    });
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

  check(task: string): void {
    //TODO check value
    if (this.selectedValue !== undefined) {
      this.checked = true;
      this.currentTask = task;
      this.loadImage(task);
      this.lastCheck$ = this.gameService.checkTask(task, this.selectedValue).then((check: Check) => {
        this.pointGain = check.humanPoints;
        this.humanPoints = this.gameService.humanScore;
        this.correctValue = check.correct;
        this.botValue = check.botGuess;

        this.showPointGain = true;
        setTimeout(() => {
          this.showPointGain = false;
        }, 1000);

        return check;
      });
    }
  }

  next(nextTask?: string): void {
    if (nextTask) {
      this.correctValue = undefined;
      this.selectedValue = undefined;
      this.checked = false;
      this.try++;
      this.currentTask = nextTask;
      this.loadImage(this.currentTask);
    } else {
      this.router.navigate(['result']);
    }
  }

  onInfoClick(): void {
    if (this.currentTask) {
      this.gameService.getInfo(this.currentTask).then((data) => {
        this.dialog.open(InformationComponent, {
          minWidth: '370px',
          data,
        });
      });
    }
  }

  loadImage(task: string) {
    this.imageSrc$ = this.gameService.loadImage(task, this.checked);
  }
}
