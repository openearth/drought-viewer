import buildGeoserverUrl from './build-geoserver-url';

export default layers => buildGeoserverUrl({
  request: 'GetLegendGraphic',
  service: 'WMS',
  format: 'image/png',
  width: 130,
  height: 200,
  layers
});
