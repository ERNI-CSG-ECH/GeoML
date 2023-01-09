import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'geoml-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
  playVideo = false;

  @Output() skipped = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
