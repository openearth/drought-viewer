const CENTER_LATITUDE = 52.2;
const CENTER_LONGITUDE = 5.5;


export const MAP_CENTER = [
  CENTER_LONGITUDE,
  CENTER_LATITUDE
];

export const MAP_ZOOM = 8;

export const MAP_BASELAYERS = [
  'light',
  'streets'
].map(layer => ({
  style: `mapbox://styles/mapbox/${ layer }-v9`,
  title: layer,
  thumbnail: `/thumbnails/${ layer }.png`
}));

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0];
