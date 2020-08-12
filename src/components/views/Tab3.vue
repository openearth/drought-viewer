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

        Deze kaarten tonen, voor ieder van de drie scenario’s, de afwijking van de grondwaterstand voor een specifieke maand ten opzichte van de langjarig gemiddelde grondwaterstand van die maand.
      </v-card-text>

      <v-card-text>
        N.B. Deze kaarten worden elke week geüpdatet.
      </v-card-text>
    <v-sheet class="pa-5">
    <v-treeview
      selectable
      rounded
      hoverable
      transition
      on-icon='mdi-checkbox-multiple-marked-circle'
      off-icon = 'mdi-circle-outline'
      color="blue"
      dense
      :items="items"
      v-model="visibleLayers"
    ></v-treeview>
    </v-sheet>

    <!-- <v-row justify="center" class="pa-4 ma-4" >
      <v-card-text class="text-center">
        Time Slider
      </v-card-text>
      <range-slider
        class="slider"
        min="1"
        max="12"
        step="1"
        v-model="sliderValue">
      </range-slider>
    </v-row> -->

  </div>
</template>

<script>

import arrayDiff from '@/lib/get-arrays-difference';
import { formatIdToLabel } from '@/lib/format-id-to-label';
import buildWmsLayer from '@/lib/build-wms-layer';
import { tab3, items_tab3 } from "../../../config/datalayers-config";
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'





export default {
  data: () => ({
    visibleLayers: [],
    items: items_tab3,
    sliderValue: 1,
  }),
  components: {
    // RangeSlider

  },
  computed:{
    tabname() {
      return tab3;
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
    addLayer(layer, time_stamp) {
      const wmsLayer = buildWmsLayer(layer, time_stamp);
      console.log("1",wmsLayer)
      this.$store.commit('mapbox/ADD_RASTER_LAYER', wmsLayer);

    },

    removeLayer(layerId) {
      this.$store.commit('mapbox/REMOVE_RASTER_LAYER', layerId);

    },

    formatIdToLabel(id) {
      return formatIdToLabel(id);
    }
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
        var layerToAdd;
        for (var i=0; i < this.items.length; i++) {
          console.log('loop',this.items.length)
          var child = this.items[i].children;
          console.log('loop2',child)
          for (var m=0; m < child.length; m++) {
            console.log('loop3',child.length)
            if (child[m].id == layerToAddId){
               layerToAdd = child[m];
            }
          }
        }
        // const layerToAdd = layers_to_show.find(({ id }) => id === layerToAddId);
        console.log(layerToAdd)
        this.addLayer(layerToAdd);
        this.$store.commit('mapbox/SET_LEGEND_LAYER', layerToAdd.layer);
      }
    }
  }
};
</script>
<style>

.slider {
  /* overwrite slider styles */
  height: 30px;
  width: 300px;
}
.range-slider-rail {
  height: 10px;
}
.range-slider-fill {
    background-color: #49a5e2;
}
</style>
