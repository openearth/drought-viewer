import buildGeoserverUrl from './build-geoserver-url';

export default (layer, startTime, endTime) => buildGeoserverUrl({
  request: 'GetCapabilities',
  service: 'WMS',
  format: 'application/json',
  onlyHeaders: false,
  startForecastTime: startTime,
  endForecastTime: endTime,
  layers: layer.layer
});
