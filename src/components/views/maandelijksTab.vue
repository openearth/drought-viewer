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
                  <div>De lage grondwaterstanden van de afgelopen jaren hebben negatieve gevolgen gehad voor de landbouw en natuur. Bij het nemen van maatregelen tegen droogte is het van belang om de ontwikkeling van het grondwater goed in te kunnen schatten.</div>
              </v-card-text>

              <v-card-text>
                De ontwikkeling van het grondwater wordt daarom in beeld gebracht voor de volgende scenario’s:
              </v-card-text>
                <v-card-text>
                  <div>1.	Het is komende zes maanden <strong>erg droog</strong> (scenario droog);</div>
                  <div>2.	De komende zes maanden is het neerslagtekort <strong>gemiddeld</strong> (scenario gemiddeld);</div>
                  <div>3.	Het is komende zes maanden <strong>erg nat</strong> (scenario nat).</div>
                </v-card-text>

              <v-row justify="center" class="pl-4 ml-4" >
              <v-container fluid justify="center" class="pl-4 ml-4" @click="slidermethod">
                <v-radio-group v-model="selectedScenario" :mandatory="false">
                  <v-radio v-for="item in items" :key="item.id" :label="item.name" :value="item.id"></v-radio>
                </v-radio-group>
              </v-container>

              <v-col class="px-8">
                <v-subheader>Time slider</v-subheader>
                <v-slider
                  class="slider"
                  :tick-labels="months"
                  :max="months.length-1"
                  :disabled="disabled"
                  :value="sliderValueVue"
                  min="0"
                  ticks="always"
                  tick-size="5"
                  v-model="sliderValueVue"
                  @click="slidermethod"
                >
                </v-slider>
              </v-col>
            </v-row>

              <v-card-text>
                Deze kaarten tonen, voor ieder van de drie scenario’s, de afwijking van de grondwaterstand voor een specifieke maand ten opzichte van de langjarig gemiddelde grondwaterstand van die maand.
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
        <mapbox-map />
      </div>
    </v-main>
  </div>
</template>
<script>
import { formatIdToLabel } from '@/lib/format-id-to-label';
import buildWmsLayer from '@/lib/build-wms-layer';
import { maandelijksTab, months_maandelijksTab } from "../../../config/datalayers-config";
import moment from 'moment';

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
    visibleLayers: [],
    selectedScenario:[],
    items: months_maandelijksTab,
    sliderValue: 0,
    sliderValueVue:0,
    disabled:true,
    monthName:""
  }),

  computed:{
    ...mapGetters('mapbox', ['legendLayer', 'activeLayerTimestamp']),
    months () {
      const months = Array.from(Array(6).keys());
      const availableMonths = months.map((currentMonth) => {
        const month = currentMonth + 1; 
        return moment().add(month, 'months').format('MMM');
      });
      return availableMonths;
    },
    tabname() {
      return maandelijksTab;
    },
    options() {
      return {
        options: {
          barColor: '#444',
          barColorActive: '#337ab7',
          prefix: '$'
        }
      };
    }
  },

  methods: {
    addLayer(layer) {
      const format = 'YYYY-MM-DDTHH:mm:ss';
      const timeStamp = `${moment().add(1,'months').startOf('month').add(this.sliderValueVue, 'months').format(format)}Z`;
      layer.time_stamp = timeStamp;
      const wmsLayer = buildWmsLayer(layer);
      this.$store.commit('mapbox/ADD_RASTER_LAYER', wmsLayer);
    },

    removeLayer(layerId) {
      this.$store.commit('mapbox/REMOVE_RASTER_LAYER', layerId);
    },

    formatIdToLabel(id) {
      return formatIdToLabel(id);
    },

    slidermethod() {
      this.$store.commit('mapbox/REMOVE_ALL_LAYERS');
      this.$store.commit('mapbox/SET_LEGEND_LAYER', null);
      const layerToAdd = this.items.find(item => item.id === this.selectedScenario);
      this.addLayer(layerToAdd);
      this.$store.commit('mapbox/SET_LEGEND_LAYER', layerToAdd.layer);
    }
  },

  watch: {
    selectedScenario(newScenario) {
      this.$store.commit('mapbox/REMOVE_ALL_LAYERS');
      // this.sliderValueVue=0;
      this.selectedScenario=newScenario;
      this.disabled= false;
    },
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
.slider {
  /* overwrite slider styles */
  height: 30px;
  width: 360px;
  /* box-sizing:border-box; */
}
.range-slider-rail {
  height: 10px;
}
.range-slider-fill {
    background-color: #49a5e2;
}
</style>
