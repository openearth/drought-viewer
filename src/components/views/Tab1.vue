<template>
  <div>
    <v-card-title>
      {{tabname}}
    </v-card-title>
      <v-card-text class="text--primary">
          <div>De lage grondwaterstanden van de afgelopen jaren hebben negatieve gevolgen gehad voor de landbouw en natuur. Bij het nemen van maatregelen tegen droogte is het van belang om de ontwikkeling van het grondwater goed in te kunnen schatten.</div>
      </v-card-text>

      <v-card-text>
        De ontwikkeling van het grondwater wordt daarom in beeld gebracht voor de volgende scenario’s:

        <v-card-text>
          <div>1.	Het is komende zes maanden <strong>erg droog</strong> (scenario droog);</div>
          <div>2.	De komende zes maanden is het neerslagtekort <strong>gemiddeld</strong> (scenario gemiddeld);</div>
          <div>3.	Het is komende zes maanden <strong>erg nat</strong> (scenario nat).</div>
        </v-card-text>

        Deze drie kaarten tonen, voor ieder van de drie scenario’s, de afwijking van de berekende zomergrondwaterstand ten opzichte van de langjarig gemiddelde zomergrondwaterstand.
        De zomergrondwaterstand wordt bepaald als het gemiddelde van de drie laagste grondwaterstanden geregistreerd in de periode van 1 april tot 1 oktober. Hierbij worden alleen grondwaterstanden op de 14de en 28ste dag van de maand meegenomen.
      </v-card-text>
      <v-card-text>
        N.B. Deze kaarten worden elke week geüpdatet. Aan het eind van de zomer is de zomergrondwaterstand niet langer een blik op de toekomst maar een terugblik. Alle drie de kaarten geven dan dezelfde informatie.
      </v-card-text>

    <v-sheet class="ps-12">
      <v-spacer/>
       <v-switch
        multiple="false"
        v-for="layer in layers"
        :key="layer.id"
        :label="formatIdToLabel(layer.id)"
        :value="layer.id"
        v-model="visibleLayers"
        inset
        hide-details
        />
    </v-sheet>
  </div>
</template>

<script>

import arrayDiff from '@/lib/get-arrays-difference';
import formatIdToLabel from '@/lib/format-id-to-label';
import buildWmsLayer from '@/lib/build-wms-layer';
import { tab1, items_tab1 } from "../../../config/datalayers-config";

export default {
  data: () => ({
    layers: items_tab1,
    visibleLayers: [],

  }),

  computed: {
    tabname() {
      return tab1;
    },
    rasterLayers() {
      return this.$store.getters['mapbox/rasterLayers'];
    },
     legendLayer() {
      return this.$store.getters['mapbox/legendLayer'];
    }
  },

  methods: {
    async addLayer(layer) {
      const wmsLayer = buildWmsLayer(layer);
      this.$store.commit('mapbox/ADD_RASTER_LAYER', wmsLayer);
    },

    removeLayer(layerId) {
      this.$store.commit('mapbox/REMOVE_RASTER_LAYER', layerId);
    },

    formatIdToLabel(id) {
      return formatIdToLabel(id);
    },
  },

  watch: {
    visibleLayers(newArray, oldArray) {
      const removeLayerId = newArray.length < oldArray.length;
      if(removeLayerId) {
        const layerToRemoveId = arrayDiff(oldArray, newArray)[0];
        this.removeLayer(layerToRemoveId);
        this.$store.commit('mapbox/SET_LEGEND_LAYER', null);
      }
      else {
        const layerToAddId = arrayDiff(newArray, oldArray)[0];
        const layerToAdd = this.layers.find(({ id }) => id === layerToAddId);
        // var layerToAdd;
        // for (var i=0; i < this.items.length; i++) {
        //   var child = this.items[i].children;
        //   for (var m=0; m < child.length; m++) {
        //     if (child[m].id == layerToAddId){
        //        layerToAdd = child[m];
        //     }
        //   }
        // }
        // const layerToAdd = layers_to_show.find(({ id }) => id === layerToAddId);
        this.addLayer(layerToAdd);
        this.$store.commit('mapbox/SET_LEGEND_LAYER', layerToAdd.layer);
      }
    }

  }
};
</script>
