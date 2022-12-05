import { Component, Input, OnInit } from '@angular/core';
import { Check } from 'src/app/model/game';

@Component({
  selector: 'geoml-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})
export class ResultCardComponent implements OnInit {
  @Input() check!: Check;

  constructor() { }

  ngOnInit(): void {
  }

}
