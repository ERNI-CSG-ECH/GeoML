import { Component, NgZone, AfterViewInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Map } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'geoml-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Input() center: Coordinate = [2660013.54, 1185171.98];
  @Input() zoom: number = 16;

  map?: Map;

  @Output() mapReady = new EventEmitter<Map>();

  constructor(private zone: NgZone, private cd: ChangeDetectorRef, private mapService: MapService) {}

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    setTimeout(() => this.mapReady.emit(this.map));
  }

  private initMap(): void {
    this.map = this.mapService.getMap(this.center, this.zoom);
  }
}
