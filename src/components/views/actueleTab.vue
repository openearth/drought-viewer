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
        <v-tab>Grondwater</v-tab>
        <v-tab>Functies & Landgebruik </v-tab>
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
          Grondwaterafhankelijke natuur
          </v-card-title>
          <v-card-text>
          Het in actueel beeld brengen en voorspellen van grondwaterstanden in grondwaterafhankelijke natuurgebieden geeft inzicht in impact van droogte op natuur: welke gebieden hebben of krijgen mogelijk te maken met lage grondwaterstanden, in welke mate en wanneer? Water- en natuurbeheerders kunnen op basis van deze informatie, waar mogelijk, maatregelen nemen om natuurschade als gevolg van droogte te beperken. 
          Meer informatie: <a style="background-color: white; color:#008fc5 !important;" href="https://www.deltares.nl/nl/nieuws/actuele-kaartbeelden-van-grondwaterstandsverlaging-en-de-ligging-van-enkele-natuurgebieden/#:~:text=Door%20de%20droogte%20en%20hitte,ligging%20van%20enkele%20natuurgebieden%20gecombineerd." >Zeer lage grondwaterstanden natuurgebieden door de droogte - Deltares</a>   
          </v-card-text>
           <v-container fluid justify="center" class="pl-4 ml-4">
             <div v-for="overlay in overlays" :key="overlay.id">
               <v-switch
                  :label="overlay.name"
                  :value="overlay.id"
                  @change="loadOverlay(overlay)"
                  inset
                  hide-details
                />
                <v-slider
                  v-model="overlay.opacity"
                  class="pt-2 pb-5 pr-16 pl-4"
                  hide-details
                  :ripple="false"
                  :max="1"
                  :step="0.1"
                  label="Opacity"
                  @change="setLayerOpacity(overlay)"
                />
             </div>
            </v-container>
          <v-card-title>
            Toelichting natuurgebieden:
          </v-card-title>
          <v-card-text>
          (a) Grondwaterafhankelijke natuur is natuur die gebaat is bij hoge grondwaterstanden en vaak bij de aanwezigheid van kwel. In het kader van het project ‘Droogte in zandgebieden van Zuid-, Midden- en Oost-Nederland’  <a style="background-color: white; color:#008fc5 !important;" href="https://edepot.wur.nl/555352" >(Van den Eertwegh ea., 2021)</a> is een kaart ontwikkeld van grondwaterafhankelijke natuurgebieden in Nederland.
          <v-card-text>
          <v-card-text>
          (b) Nederland kent 162 Natura 2000-gebieden. Dit Natura 2000-netwerk bestaat uit gebieden die zijn aangewezen onder de Vogelrichtlijn en onder de Habitatrichtlijn. Beide Europese richtlijnen zijn belangrijke instrumenten om de Europese biodiversiteit te waarborgen. Alle gebieden zijn geselecteerd op grond van het voorkomen van soorten en habitattypen die vanuit Europees oogpunt bescherming nodig hebben. Meer informatie: <a style="background-color: white; color:#008fc5 !important;" href="https://www.natura2000.nl/gebieden" >https://www.natura2000.nl/gebieden</a>
          </v-card-text>

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
        <overlays-legends v-if="activeOverlaysLayers.length"/>

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
import overlays from '@/data/overlays.json';

import MapboxMap from '@/components/mapbox-map';
import RiskLegend from '@/components/legend';
import MapTitle from '@/components/map-title';
import OverlaysLegends from '@/components/overlays-legends';
import {mapGetters} from 'vuex';

export default {
  components: {
    MapboxMap,
    RiskLegend,
    MapTitle,
    OverlaysLegends
  },
  data: () => ({
    items: items_actueleTab,
    overlays: overlays,
    selectedOverlayId: null,
    layerOpacity: 1
  }),
  computed: { 
    ...mapGetters('mapbox', ['legendLayer', 'activeLayerTimestamp', 'activeOverlaysLayers']),
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
    loadOverlay(layer) {
      const layerExists = this.activeOverlaysLayers.some(storedLayer => storedLayer.id === layer.id);
      if (!layerExists) {
        this.$store.commit('mapbox/ADD_OVERLAY_LAYER', buildWmsLayer(layer));
      }else{
        this.$store.commit('mapbox/REMOVE_OVERLAY_LAYER', layer.id);
      }
    },
    setLayerOpacity(layer) {
     
      const layerExists = this.activeOverlaysLayers.some(storedLayer => storedLayer.id === layer.id);
      
      if(layerExists) {
        this.$store.commit('mapbox/REMOVE_OVERLAY_LAYER', layer.id);
        this.$store.commit('mapbox/ADD_OVERLAY_LAYER', buildWmsLayer(layer));
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
