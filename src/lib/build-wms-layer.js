import buildGeoserverUrl from './build-geoserver-url';

const defaultUrl = process.env.VUE_APP_GEOSERVER_BASE_URL;

export default ({ url=defaultUrl, id, layer, time_stamp ,style='', paint={}, tileSize=500 }) => {
  const tile = buildGeoserverUrl({
    url,
    service: 'WMS',
    request: 'GetMap',
    version: '1.3',
    layers: layer,
    style,
    time: time_stamp,
    width: '255',
    height: '255',
    crs: 'EPSG:3857',
    transparent: true,
    showContours:false,
    importFromExternalDataSource:true,
    uppercase:false,
    bbox: '{bbox-epsg-3857}',
    format: 'image/png',
    encode: false
  });

  return {
    id,
    layer,
    type: 'raster',
    source: {
      type: 'raster',
      tiles: [tile],
      tileSize
    },
    paint
  };
};
