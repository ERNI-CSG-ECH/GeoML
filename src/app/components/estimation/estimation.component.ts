import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'geoml-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.scss']
})
export class EstimationComponent implements OnInit {
  selectedValue?: number;
  correctValue?: number;
  score?: {human: number, bot: number};

  checkText = $localize`Prüfen`;
  nextText = $localize`Nächstes Bild`;

  constructor() { }

  ngOnInit(): void {
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
    }
  }

  next(): void {
    //TODO next image
    this.score = undefined;
    this.correctValue = undefined;
    this.selectedValue = undefined;
  }

}
