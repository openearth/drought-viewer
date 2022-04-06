<template>
  <div>
    <v-card-title>
      {{tabname}}
    </v-card-title>
      <v-card-text class="text-xs-center">
        <div>De lage grondwaterstanden van de afgelopen jaren hebben negatieve gevolgen gehad voor de landbouw en natuur. Bij het nemen van maatregelen tegen droogte is het van belang om de ontwikkeling van het grondwater goed in te kunnen schatten.</div>
      </v-card-text>

      <v-card-text class="text-xs-center">
        De ontwikkeling van het grondwater wordt daarom in beeld gebracht voor de volgende scenario’s:

        <v-card-text class="text-xs-center">
          <div>1.	Het is komende zes maanden <strong>erg droog</strong> (scenario droog);</div>
          <div>2.	De komende zes maanden is het neerslagtekort <strong>gemiddeld</strong> (scenario gemiddeld);</div>
          <div>3.	Het is komende zes maanden <strong>erg nat</strong> (scenario nat).</div>
      </v-card-text >

       Door te klikken op de punten op de kaart verschijnt een grafiek van het berekende grondwaterverloop op deze locatie: een tijdreeks van de grondwaterstand tot nu toe, en tijdreeksen van het toekomstige verloop van de grondwaterstand voor de drie scenario’s.
       In de grafiek wordt ook informatie gegeven over de historische grondwaterstanden in op deze locatie.
      </v-card-text>

      <v-card-text>
        N.B. Deze kaarten worden elke week geüpdatet.
      </v-card-text>
    </div>
</template>

<script>
import { tijdreeksenTab, items_tijdreeksenTab } from "../../../config/datalayers-config";

const defaultUrl = process.env.VUE_APP_SERVER_BASE_URL;

export default {
  data: () => ({
    visibleLayers: [],
    items: items_tijdreeksenTab
  }),
  computed:{
    tabname() {
      return tijdreeksenTab;
    }},
  mounted() {
    this.addLocationsLayer();
  },
  methods: {
    addLocationsLayer() {
      const locationsUrl = `${defaultUrl}/rest/fewspiservice/v1/locations?documentFormat=PI_JSON`;
      fetch(locationsUrl)
        .then(res => {
          return res.json();
        })
        .then(response => {
          const locations = response.locations;
          const features = locations.map(feat => {
            return     {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [parseFloat(feat.lon), parseFloat(feat.lat)]
              },
              id: feat.locationId,
              properties: {
                id: feat.locationId,
                shortName: feat.shortName
              }
            };
          });
          const source = {
            type: 'FeatureCollection',
            features: features
          };

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
          };

          this.$store.commit('mapbox/ADD_GEOJSON_LAYER', mapLayer);
        });
    }
  }
};
</script>
<style>
.v-card__text {
    width: 100%;
    text-align: justify;
}
</style>
