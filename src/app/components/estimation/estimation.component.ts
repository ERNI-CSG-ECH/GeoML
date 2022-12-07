import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
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

  tasks$!: Promise<string[]>;
  lastCheck$?: Promise<Check>;

  @ViewChild('estimationImage') el?: ElementRef;

  constructor(
    private router: Router,
    private gameService: GameService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.tasks$ = this.gameService.randomTasks$.then((tasks) => {
      this.currentTask = tasks[0];
      return tasks;
    });
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
      this.lastCheck$ = this.gameService.checkTask(task, this.selectedValue).then((check: Check) => {
        this.pointGain = check.humanPoints;
        this.humanPoints = this.gameService.humanScore;
        this.correctValue = check.correct;
        this.botValue = check.botGuess;

        this.showPointGain = true;
        setTimeout(() => {
          this.showPointGain = false;
        }, 5000);

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
}
