import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'geoml-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  score: { human: number; bot: number } = {
    human: 16,
    bot: 8,
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  reset(): void {
    this.router.navigate(['']);
  }
}
