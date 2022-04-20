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
            <v-sheet class="mt-2">
              <v-img
                aspect-ratio="1.3"
                contain
                src="~@/assets/img/dry.jpg"
              ></v-img>
              <v-card-title>
                Kaart actuele grondwaterstand
              </v-card-title>
              <v-card-text>
                Deze kaart toont de afwijking van de actuele grondwaterstand ten opzichte van de langjarig gemiddelde grondwaterstand voor deze week.
              </v-card-text>
              <v-card-text>
                Op basis van actuele metingen van neerslag en verdamping (bron: KNMI) en rivierafvoer (bron: RWS) wordt met het Landelijk Hydrologisch Model wekelijks de actuele grondwatertoestanden berekend met een ruimtelijk resolutie van 250 bij 250 meter. 
              </v-card-text>
              <v-card-text>
                De datum waarop de laatste actualisatie is uitgevoerd staat linksboven de kaart vermeld.
              </v-card-text>
              </v-sheet>
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
        <div class="deltares-logo">
          <img src="~@/assets/img/deltares-logo.png" style="width: 80px; height: 30px;"/>
        </div>
        <mapbox-map />
      </div>
    </v-main>
  </div>
</template>
<script>
import buildWmsLayer from '@/lib/build-wms-layer';
import { actueleTab, items_actueleTab } from "../../../config/datalayers-config";
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
    items: items_actueleTab
  }),
  computed: { 
    ...mapGetters('mapbox', ['legendLayer', 'activeLayerTimestamp']),
    tabname() {
      return actueleTab;
    }
  },
  mounted () {
    const layerToAdd = this.items[0];
    this.addLayer(layerToAdd);
  },
  methods: {
    //TODO: move it in lib as function as is used in multiple components
    addLayer(layer) {
      let wmsLayer;
      if (!_.get(layer, 'time_stamp')) {
        const getCapabilitiesUrl = buildCapabilitiesUrl(layer);
        fetch(getCapabilitiesUrl)
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            const layerRes = response.layers.find(l => l.name === layer.layer);
            const times = layerRes.times;
            const time = times[times.length - 1];
            layer.time_stamp = time;
            wmsLayer = buildWmsLayer(layer);
            this.$store.commit('mapbox/ADD_RASTER_LAYER', wmsLayer);
            this.$store.commit('mapbox/SET_LEGEND_LAYER', wmsLayer.layer);
          });
      } else {
        wmsLayer = buildWmsLayer(layer);
        this.$store.commit('mapbox/ADD_RASTER_LAYER', wmsLayer);
        this.$store.commit('mapbox/SET_LEGEND_LAYER', wmsLayer.layer);
      }
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

.deltares-logo { 
  position: absolute;
  bottom: -0.2rem;
  left: 6rem;
  z-index: 2;
}
</style>
