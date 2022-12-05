import { Component, Input, OnChanges } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'geoml-estimation-image',
  templateUrl: './estimation-image.component.html',
  styleUrls: ['./estimation-image.component.scss'],
})
export class EstimationImageComponent implements OnChanges {
  @Input() task?: string;
  @Input() checked = false;
  @Input() small = false;

  imageSrc$?: Promise<string>;

  constructor(private gameService: GameService) {}

  ngOnChanges(): void {
    if (this.task) {
      this.loadImage(this.task);
    }
  }

  loadImage(task: string) {
    this.imageSrc$ = this.gameService.loadImage(task, this.checked);
  }
}
