export default function buildGeojsonLayer({ id, name, data, opacity }) {
  return {
    id,
    type: 'fill',
    source: {
      type: 'geojson',
      data,
    }, 
    paint: {
      'fill-color': '#00FF00', // blue color fill
      'fill-opacity': 1
    },
    opacity
  };
}
