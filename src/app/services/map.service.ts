import { Injectable } from '@angular/core';
import { Map, View, Feature } from 'ol';
import { ScaleLine, defaults as defaultControls } from 'ol/control';
import { Tile as TileLayer } from 'ol/layer';
import { XYZ } from 'ol/source';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { Coordinate } from 'ol/coordinate';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private backgroundLayer = new TileLayer({
    source: new XYZ({
      url: `https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg`,
    }),
  });

  constructor() {
    this.setProjections();
  }

  getMap(center: number[], zoom: number = 16): Map {
    const map = this.createView(center, zoom);
    this.addPin(map, center);
    return map;
  }

  private setProjections(): void {
    proj4.defs(
      'EPSG:2056',
      '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs '
    );
    proj4.defs(
      'EPSG:21781',
      '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs'
    );
    register(proj4);
  }

  private createView(center: Coordinate, zoom: number = 16): Map {
    const view = new View({
      projection: 'EPSG:2056',
      center,
      zoom,
    });
    return new Map({
      target: 'ol-map',
      controls: defaultControls().extend([
        new ScaleLine({
          units: 'metric',
        }),
      ]),
      layers: [this.backgroundLayer],
      view: view,
    });
  }

  private addPin(map: Map, center: Coordinate): Map {
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
            geometry: new Point(center),
          }),
        ],
      }),
    });
    map.addLayer(markers);
    return map;
  }
}
