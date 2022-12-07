import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'geoml-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() activeStep?: number;

  constructor() { }

  ngOnInit(): void {
  }

}
