import buildGeoserverUrl from './build-geoserver-url';

export default function ({ layers, url }) {
  
  return buildGeoserverUrl({
    request: 'GetLegendGraphic',
    service: 'WMS',
    format: 'image/png',
    width: 130,
    height: 200,
    url,
    layers,
  });
}
