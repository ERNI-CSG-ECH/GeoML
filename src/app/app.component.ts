import { Component } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GeoML';

  constructor(private iconReg: SvgIconRegistryService) {
    this.iconReg.loadSvg('../../../assets/icons/bot.svg', 'bot')?.pipe(take(1)).subscribe();
  }
}
