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
      </v-card-text>
        <v-card-text>
          <div>1.	Het is komende zes maanden <strong>erg droog</strong> (scenario droog);</div>
          <div>2.	De komende zes maanden is het neerslagtekort <strong>gemiddeld</strong> (scenario gemiddeld);</div>
          <div>3.	Het is komende zes maanden <strong>erg nat</strong> (scenario nat).</div>
        </v-card-text>

      <v-card-text>
        Deze kaarten tonen, voor ieder van de drie scenario’s, de afwijking van de grondwaterstand voor een specifieke maand ten opzichte van de langjarig gemiddelde grondwaterstand van die maand.
      </v-card-text>

      <v-card-text>
        N.B. Deze kaarten worden elke week geüpdatet.
      </v-card-text>


    <v-row justify="center" class="pl-4 ml-4" >
      <v-container fluid justify="center" class="pl-4 ml-4">
        <v-radio-group v-model="selectedScenario" :mandatory="false">
          <v-radio label="Scenario droog" value="1"></v-radio>
          <v-radio label="Scenario gemiddeld" value="2"></v-radio>
          <v-radio label="Scenario nat" value="3"></v-radio>
        </v-radio-group>
      </v-container>

      <v-card-text class="text-center">
        Geselecteerde maand: {{this.monthName}}
      </v-card-text>
      <range-slider
        :disabled="disabled"
        class="slider"
        min="0"
        :max="this.items[0].children.length-1"
        step="1"
        v-model="sliderValue">
      </range-slider>
    </v-row>

  </div>
</template>

<script>
import { formatIdToLabel } from '@/lib/format-id-to-label';
import buildWmsLayer from '@/lib/build-wms-layer';
import { tab2, months_tab2 } from "../../../config/datalayers-config";
import RangeSlider from 'vue-range-slider';
import 'vue-range-slider/dist/vue-range-slider.css';

export default {
  data: () => ({
    scenarios:[
      {id:1, name:"Scenario droog"},
      {id:2, name:"Scenario gemiddeld"},
      {id:3, name:"Scenario nat"}],
    visibleLayers: [],
    selectedScenario:[],
    items: months_tab2,
    sliderValue: 0,
    disabled:true,
    monthName:""
  }),
  components: {
    RangeSlider

  },
  computed:{
    tabname() {
      return tab2;
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
    selectedScenario(newScenario) {
      this.$store.commit('mapbox/REMOVE_ALL_LAYERS');
      this.monthName='';
      this.sliderValue=0;
      this.selectedScenario=newScenario;
      this.disabled= false;
    },

    sliderValue(newArray, oldArray) {
      const removeLayerId = newArray < oldArray;
      if(removeLayerId) {
        const layerToRemoveId = this.items[this.selectedScenario-1].children[oldArray].id;
        this.monthName=this.items[this.selectedScenario-1].children[oldArray-1].name;
        this.removeLayer(layerToRemoveId);
        this.$store.commit('mapbox/SET_LEGEND_LAYER', null);
      }
      else {
        const layerToAdd= this.items[this.selectedScenario-1].children[newArray];
        this.monthName=layerToAdd.name;
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
