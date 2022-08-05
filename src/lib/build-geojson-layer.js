export default function buildGeojsonLayer({ id, name, data, opacity }) {
  return {
    id,
    type: 'fill',
    source: {
      type: 'geojson',
      data,
    }, 
    paint: {
      'fill-color': '#00FF00', 
      'fill-opacity': 1,
      'fill-outline-color': 'rgba(0, 0, 0, 0.3)'
    },
    opacity
  };
}
