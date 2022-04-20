<template>
  <div>
    <v-navigation-drawer
      clipped
      app
      permanent
      width="500"
      ref="nav"
    >
      <v-row dense>
        <v-col :cols="12">
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
        </v-col>
      </v-row>
    </v-navigation-drawer>
    <v-main app>
      <div class="data-layers">
        <map-title v-if="activeLayerTimestamp" :title="activeLayerTimestamp"></map-title>
        <risk-legend
          v-if="legendLayer"
          :legendLayer="legendLayer"
        />
      <feature-details
          v-if="!!activeFeature"
          :feature="activeFeature"
          :parameters="parameters"
      />
      <requestData
        v-if="!!requestData"
        :feature="requestData"
      />
        <div class="deltares-logo">
          <img src="~@/assets/img/deltares-logo.png" style="width: 80px; height: 30px;"/>
        </div>
        <mapbox-map />
      </div>
    </v-main>
  </div>
</template>
<script>
import MapboxMap from '@/components/mapbox-map';
import RiskLegend from '@/components/legend';
import MapTitle from '@/components/map-title';
import FeatureDetails from '@/components/feature-details';
import requestData from '@/components/transect-popup';
import {mapGetters} from 'vuex';
import { tijdreeksenTab, items_tijdreeksenTab } from "../../../config/datalayers-config";

const defaultUrl = process.env.VUE_APP_SERVER_BASE_URL;


export default { 
  components: { 
    MapboxMap,
    RiskLegend,
    MapTitle,
    FeatureDetails,
    requestData,
  },
  data: () => ({
    visibleLayers: [],
    items: items_tijdreeksenTab,
    parameters: ''
  }),
  computed:{
    ...mapGetters('mapbox', ['legendLayer', 'activeLayerTimestamp', 'requestData', 'activeFeature']),
    tabname() {
      return tijdreeksenTab;
    },
  },

  mounted() {
    this.getParameters();
    this.addLocationsLayer();
  },
  methods: {
    getParameters() {
      fetch(`${defaultUrl}/rest/fewspiservice/v1/archive/parameters?documentFormat=PI_JSON`)
        .then(res => {
          return res.json();
        })
        .then(response => {
          // TODO: uncomment this when fewspiservice is properly filled
          this.parameters = response.parameters[0].parameterId;
          // let parameters = response.parameters.map(param => param.parameterId)
          // this.parameters = parameters.join(';')
        });
    },
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
<style scoped> 
.data-layers {
  width: 1200;
  height: 94vh;
}
.v-card__text {
    width: 100%;
    text-align: justify;
}

.deltares-logo { 
  position: absolute;
  bottom: -0.2rem;
  left: 6rem;
  z-index: 2;
}
</style>
