import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformationData } from 'src/app/model/game';

@Component({
  selector: 'geoml-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent {
  coordsOffset = 300;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InformationData,
    private dialogRef: MatDialogRef<InformationComponent>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
