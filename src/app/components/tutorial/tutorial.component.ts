import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'geoml-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent implements OnInit {
  isProduction = environment.production;
  playVideo = false;
  languages: KeyValue<string, string>[] = [
    { key: 'en', value: $localize`Englisch` },
    { key: 'de', value: $localize`Deutsch` },
  ];

  @Output() skipped = new EventEmitter<void>();

  constructor(@Inject(LOCALE_ID) protected locale: string, private router: Router) {}

  ngOnInit(): void {}

  loadLanguage(newLocale: MatSelectChange) {
    if (this.isProduction) {
      window.location.href = window.location.origin + '/' + newLocale.value + '/';
    }
  }
}
