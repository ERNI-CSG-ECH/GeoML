import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExplanationComponent } from '../explanation/explanation.component';

@Component({
  selector: 'geoml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() activeStep?: number;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openExplanation(): void {
    this.dialog.open(ExplanationComponent);
  }
}
