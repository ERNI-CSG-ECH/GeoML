import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'geoml-estimation-values',
  templateUrl: './estimation-values.component.html',
  styleUrls: ['./estimation-values.component.scss'],
})
export class EstimationValuesComponent implements OnInit {
  @Input() correctValue?: number;
  @Input() selectedValue?: number;
  @Input() botValue?: number;
  @Input() small = false;

  @Output() selectedValueChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
