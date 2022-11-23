import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformationData } from 'src/app/model/game';

@Component({
  selector: 'geoml-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss'],
})
export class InformationComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InformationData,
    private dialogRef: MatDialogRef<InformationComponent>
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  getMap(): string {
    const coordsOffset = 300;
    const basePath = 'https://map.geo.admin.ch/embed.html'
    const bgLayer = 'bgLayer=ch.swisstopo.pixelkarte-grau';
    const east = `E=${this.data.xCoords + coordsOffset}.00`
    const north = `N=${this.data.yCoords - coordsOffset}.00`
    const config = 'zoom=8&lang=de&topic=ech'
    return `${basePath}?${bgLayer}&${east}&${north}&${config}`;
  }
}
