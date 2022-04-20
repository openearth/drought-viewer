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
            <v-card-text class="text--primary">
              <div>De lage grondwaterstanden van de <b>afgelopen jaren</b> hebben negatieve gevolgen gehad voor de landbouw en natuur. Bij het nemen van maatregelen tegen droogte is het van belang om de ontwikkeling van het grondwater goed in te kunnen schatten.</div>
            </v-card-text>

            <v-card-text>
              De ontwikkeling van het grondwater wordt daarom in beeld gebracht voor de volgende scenario’s:
            </v-card-text>
            <v-card-text>
              <div>1.	Het is komende zes maanden <strong>erg droog</strong> (scenario droog);</div>
              <div>2.	De komende zes maanden is het neerslagtekort <strong>gemiddeld</strong> (scenario gemiddeld);</div>
              <div>3.	Het is komende zes maanden <strong>erg nat</strong> (scenario nat).</div>
            </v-card-text>
            <div v-if="currentlySummer" >
            <!--  <div> -->
              <v-sheet class="pl-12">
                <v-switch :multiple="false"
                  v-for="layer in layers"
                  :key="layer.id"
                  :label="layer.name"
                  :value="layer.id"
                  v-model="visibleLayers"
                  inset
                  hide-details
                  />
              </v-sheet>
              <v-card-text>
                Deze drie kaarten tonen, voor ieder van de drie scenario’s, de afwijking van de berekende zomergrondwaterstand ten opzichte van de langjarig gemiddelde zomergrondwaterstand.
                De zomergrondwaterstand wordt bepaald als het gemiddelde van de drie laagste grondwaterstanden geregistreerd in de periode van 1 april tot 1 oktober. Hierbij worden alleen grondwaterstanden op de 14de en 28ste dag van de maand meegenomen.
              </v-card-text>
              <v-card-text>
                N.B. Deze kaarten worden elke week geüpdatet. Aan het eind van de zomer is de zomergrondwaterstand niet langer een blik op de toekomst maar een terugblik. Alle drie de kaarten geven dan dezelfde informatie.
              </v-card-text>

             </div>
      <!--       <v-card-text  v-else>
              Vanaf 1 februari worden hier de prognoses van de zomergrond-
              waterstanden voor dit jaar getoond.
            </v-card-text> -->
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
        <mapbox-map />
      </div>
    </v-main>
  </div>
</template>
<script>
import { zomerTab, items_zomerTab } from "../../../config/datalayers-config";

import moment from 'moment';
import buildWmsLayer from '@/lib/build-wms-layer';
import buildCapabilitiesUrl from '@/lib/build-capabilities-url';
import _ from 'lodash';


import MapboxMap from '@/components/mapbox-map';
import RiskLegend from '@/components/legend';
import MapTitle from '@/components/map-title';
import {mapGetters} from 'vuex';

export default { 
  components: {
    MapboxMap,
    RiskLegend,
    MapTitle
  },
  data: () => ({
    layers: items_zomerTab,
    visibleLayers: null,
  }),
  computed: { 
    ...mapGetters('mapbox', ['legendLayer', 'activeLayerTimestamp']),
    tabname() {
      return zomerTab;
    },
    currentlySummer() {
      const currentMonth = moment().month();
      return currentMonth >= 1 && currentMonth <= 9;
    }
  },
  methods: {

    async addLayer(layer) {
      if (!_.get(layer, 'time_stamp')) {
        const format = 'YYYY-MM-DDTHH:mm:ssZ';
        const startTime = moment().format(format);
        const endTime = moment().add(6, 'months').format(format);
        const getCapabilitiesUrl = buildCapabilitiesUrl(layer, startTime, endTime);
        fetch(getCapabilitiesUrl)
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            const times = response.layers[0].times;
            const time = times[times.length - 1];
            layer.time_stamp = time;
            const wmsLayer = buildWmsLayer(layer);
            this.$store.commit('mapbox/ADD_RASTER_LAYER', wmsLayer);
          });
      } else {
        const wmsLayer = buildWmsLayer(layer);
        this.$store.commit('mapbox/ADD_RASTER_LAYER', wmsLayer);
      }
    },

    removeLayer(layerId) {
      this.$store.commit('mapbox/REMOVE_RASTER_LAYER', layerId);
    },

  },
  watch: {
    visibleLayers(newArray, oldArray) {
      const removeLayerId = newArray !== oldArray;
      if(removeLayerId) {
        this.$store.commit('mapbox/REMOVE_ALL_LAYERS');
        this.$store.commit('mapbox/SET_LEGEND_LAYER', null);
      }
      if (newArray) {
        const layerToAddId = this.layers[newArray-1];
        const layerToAdd = this.layers.find(({ id }) => id === layerToAddId.id);
        this.addLayer(layerToAdd);
        this.$store.commit('mapbox/SET_LEGEND_LAYER', layerToAdd.layer);
      }
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
</style>
