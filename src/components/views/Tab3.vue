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

  </div>
</template>

<script>
import arrayDiff from '@/lib/get-arrays-difference';
import { formatIdToLabel } from '@/lib/format-id-to-label';
import buildWmsLayer from '@/lib/build-wms-layer';
import { tab3, items_tab3 } from "../../../config/datalayers-config";

export default {
  data: () => ({
    visibleLayers: [],
    items: items_tab3
  }),
  computed:{
    tabname() {
      return tab3;
  }},

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
.v-card__text {
    width: 100%;
    text-align: justify;
}
</style>
