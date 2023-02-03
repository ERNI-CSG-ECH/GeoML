import { Component, NgZone, AfterViewInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { View, Map, Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls } from 'ol/control';
import Projection from 'ol/proj/Projection';
import { register } from 'ol/proj/proj4';
import { get as getProjection } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import proj4 from 'proj4';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';

@Component({
  selector: 'geoml-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @Input() center: Coordinate = [2660013.54, 1185171.98];
  @Input() zoom: number = 16;

  projection?: Projection | null;
  view?: View;
  map?: Map;

  @Output() mapReady = new EventEmitter<Map>();

  constructor(private zone: NgZone, private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    setTimeout(() => this.mapReady.emit(this.map));
  }

  private initMap(): void {
    this.setProjection();
    if (this.projection) {
      this.view = new View({
        center: this.center,
        zoom: this.zoom,
        projection: this.projection,
      });
      this.map = new Map({
        layers: [
          new TileLayer({
            source: new OSM({}),
          }),
        ],
        target: 'ol-map',
        view: this.view,
        controls: DefaultControls().extend([new ScaleLine({})]),
      });
      this.addPin(this.map);
    }
  }

  private setProjection(): void {
    proj4.defs(
      'EPSG:2056',
      '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs '
    );
    register(proj4);
    this.projection = getProjection('EPSG:2056');
  }

  private addPin(map: Map): void {
    const iconMarkerStyle = new Icon({
      src: './assets/icons/pin.svg',
      offset: [0, 0],
      opacity: 1,
      scale: 0.35,
    });
    var markers = new Vector({
      style: new Style({
        image: iconMarkerStyle,
      }),
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point([this.center[0], this.center[1]]),
          }),
        ],
      }),
    });
    map.addLayer(markers);
  }
}
