import buildGeoserverUrl from './build-geoserver-url';

export default function ({ layer, url }) {
  
  return buildGeoserverUrl({
    request: 'GetLegendGraphic',
    service: 'WMS',
    format: 'image/png',
    width: 30,
    height: 30,
    url,
    layer,
  });
}
