const CENTER_LATITUDE = 52.2;
const CENTER_LONGITUDE = 5.5;


export const MAP_CENTER = [
  CENTER_LONGITUDE,
  CENTER_LATITUDE
];

export const MAP_ZOOM = 7;
export const MAX_MAP_ZOOM = 10;

export const MAP_BASELAYERS = [
  'light',
  'streets'
].map(layer => ({
  style: `mapbox://styles/mapbox/${ layer }-v9`,
  title: layer,
  thumbnail: `/thumbnails/${ layer }.png`
}));

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0];

export const LEGEND_TEXT = 'Verschil t.o.v. langjarig (m)'
