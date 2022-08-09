<template>
  <div>
    <v-navigation-drawer
      clipped
      app
      permanent
      width="500"
      ref="nav"
    >
      <v-tabs
       fixed-tabs
      >
        <v-tab>Information</v-tab>
        <v-tab>Overlays</v-tab>
        <v-tab-item>
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
        </v-tab-item>
         <v-tab-item>
          <v-card-title>
            Somekind of title
          </v-card-title>
          <v-card-text>
            Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum
            Lorem ipsum Lorem ipsum
          </v-card-text>
           <v-container fluid justify="center" class="pl-4 ml-4">
             <div v-for="overlay in overlays" :key="overlay.id">
               <v-switch
                  :label="overlay.name"
                  :value="overlay.id"
                  v-model="selectedOverlayId"
                  inset
                  hide-details
                />
                <v-slider
                  v-model="layerOpacity"
                  class="pt-2 pb-5 pr-16 pl-4"
                  hide-details
                  :ripple="false"
                  :max="1"
                  :step="0.1"
                  label="Opacity"
                  @change="setLayerOpacity(overlay.id)"
                />
             </div>
            </v-container>


        </v-tab-item>
        </v-tabs>
     
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
import buildGeojsonLayer from '@/lib/build-geojson-layer';
import natura_2000 from '@/data/natura_2000_test.geojson';
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
    items: items_actueleTab,
    overlays: [{id: 'natura_test-2dvbe9', name: 'nature 2000 areas', data: natura_2000, opacity: 1 }],
    selectedOverlayId: null,
    layerOpacity: 1
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
    setLayerOpacity(id) {
      const selectedOverlay = this.overlays.find(overlay => overlay.id === id);
      const updatedOverlay = {...selectedOverlay, ... {opacity: this.layerOpacity}};
      this.$store.commit('mapbox/REMOVE_OVERLAY_LAYER');
      this.$store.commit('mapbox/ADD_OVERLAY_LAYER', buildGeojsonLayer(updatedOverlay));

    }
  },
  watch: {
    selectedOverlayId() { 
      //find attributes of selected overlays to build the layer
      if (!this.selectedOverlayId) {
        this.$store.commit('mapbox/REMOVE_OVERLAY_LAYER');
      }else {
        const selectedOverlay = this.overlays.find(overlay => overlay.id === this.selectedOverlayId);
        this.$store.commit('mapbox/ADD_OVERLAY_LAYER', buildGeojsonLayer(selectedOverlay));
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

.deltares-logo { 
  position: absolute;
  bottom: 1.2rem;
  left: 11rem;
  z-index: 2;
}
</style>
