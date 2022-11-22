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
    this.iconReg.loadSvg('../../../assets/icons/bot-pin.svg', 'bot-pin')?.pipe(take(1)).subscribe();
    this.iconReg.loadSvg('../../../assets/icons/arrow.svg', 'arrow')?.pipe(take(1)).subscribe();
    this.iconReg.loadSvg('../../../assets/icons/info.svg', 'info')?.pipe(take(1)).subscribe();
    this.iconReg.loadSvg('../../../assets/icons/car.svg', 'car')?.pipe(take(1)).subscribe();
    this.iconReg.loadSvg('../../../assets/icons/ruler.svg', 'ruler')?.pipe(take(1)).subscribe();
  }
}
