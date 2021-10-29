const defaultUrl = process.env.VUE_APP_SERVER_BASE_URL;
const emptyFeatureCollection = {
  type: 'FeatureCollection',
  features: []
}
export default ({ url=defaultUrl}) => {
  const locationsUrl = `${url}/rest/fewspiservice/v1/archive/locations?documentFormat=PI_JSON`
  fetch(locationsUrl)
    .then(res => {
      return res.json()
    })
    .then(response => {
      console.log(response)
      const features = response.map(feat => {
        return     {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(feat.lat), parseFloat(feat.lon)]
          },
          properties: {
            locationId: feat.locationId,
            shortName: feat.shortName
          }
        }
      })
      const source = {
        type: 'FeatureCollection',
        features: features
      }

      const mapLayer = {
        id: 'locations',
        source: {
          data: source,
          type: 'geojson',
        },
        type:'circle',
        layout: {},
        paint: {
          'circle-radius': 5,
          "circle-opacity" : 0.7,
          'circle-color': '#54b04a'
        }
      }
    })
};
