import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuidedTour, GuidedTourService } from 'ngx-guided-tour';

@Component({
  selector: 'geoml-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.scss']
})
export class EstimationComponent implements AfterViewInit {
  tries = 0;
  selectedValue?: number;
  correctValue?: number;
  score?: {human: number, bot: number};

  checkText = $localize`Prüfen`;
  nextText = $localize`Nächstes Bild`;
  resultText = $localize`Abschliessen`;

  guidedTour: GuidedTour = {
    tourId: 'tutorial',
    steps: [
      {selector: '.estimation__content-image', content: 'Auf dem Bild wird das Strassennetz, welches sie bewerten sollen, weiss markiert.', orientation: 'bottom'},
      {selector: '.estimation__values-number:nth-child(3)', content: 'Wählen sie die Risikostufe aus.', orientation: 'top'},
      {selector: '.estimation__actions-next', content: 'Bestätigen sie die Auswahl.', orientation: 'top'}
    ]
  };

  constructor(private router: Router, private guidedTourService: GuidedTourService, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.guidedTourService.startTour(this.guidedTour);
    this.cdr.detectChanges();
  }

  check(): void {
    //TODO check value
    if(this.selectedValue !== undefined){
      if(this.selectedValue < 3){
        this.score = {human: 16, bot: 8};
        this.correctValue = this.selectedValue;
      } else {
        this.score = {human: 8, bot: 16};
        this.correctValue = this.selectedValue - 1;
      }
      this.tries++;
    }
  }

  next(): void {
    //TODO next image
    this.score = undefined;
    this.correctValue = undefined;
    this.selectedValue = undefined;

    if(this.tries === 5){
      this.router.navigate(['result'])
    }
  }
}
