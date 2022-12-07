import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'geoml-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.scss'],
})
export class ExplanationComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ExplanationComponent>) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialogRef.close();
  }
}
