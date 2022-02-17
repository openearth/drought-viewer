import buildGeoserverUrl from './build-geoserver-url';

export default (layer, startTime, endTime) => buildGeoserverUrl({
  request: 'GetCapabilities',
  service: 'WMS',
  format: 'application/json',
  onlyHeaders: false,
  ...(startTime) && {startForecastTime: startTime},
  ...(endTime) && {endForecastTime: endTime},
  layers: layer.layer
});
