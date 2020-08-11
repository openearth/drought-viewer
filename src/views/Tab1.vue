<template>
  <div>

      <v-sheet class="mt-2">

          <v-img
            aspect-ratio="1.3"
            contain
            src="~@/assets/img/dry.jpg"
          ></v-img>

      </v-sheet>

    <v-card-title>
      {{tabname}}
    </v-card-title>

      <v-card-text class="text--primary">
          <div>Het jaar 2018 was extreem droog, met grote economische schade tot gevolg. Het daaropvolgende jaar 2019 was vooral regionaal een erg droog jaar en ook het voorjaar van 2020 was erg droog.</div>
      </v-card-text>

      <v-card-text>
          <div> De droogte van de afgelopen jaren resulteerde in lage tot zeer lage grondwaterstanden. Dit heeft negatieve gevolgen voor de landbouw en natuur. Er zijn een aantal maatregelen mogelijk om de droogteschade te beperken, zoals het neerslagwater langer vasthouden op perceelniveau of het instellen van beperkingen voor beregening uit lokale waterlopen en grondwater. Bij zulke maatregelen is het van belang om vooruit te kunnen blikken en de ontwikkeling van de droogte en de grondwaterstanden goed in te kunnen schatten.</div>
      </v-card-text>

      <v-card-text>
        Deze web-viewer geeft waterbeheerders en watergebruikers inzicht in de toekomstige toestand van het grondwater aan de hand van drie meteorologische scenario’s:

        <v-card-text>
          <div>1.	Het is komende zes maanden <strong>erg droog</strong> (scenario droog);</div>
          <div>2.	De komende zes maanden is het neerslagtekort <strong>gemiddeld</strong> (scenario gemiddeld);</div>
          <div>3.	Het is komende zes maanden <strong>erg nat</strong> (scenario nat).</div>
        </v-card-text>

        Deze drie scenario’s worden wekelijks doorgerekend met het Landelijke Hydrologisch Model*. De volgende pagina’s tonen de verwachte grondwaterstanden van de komende maanden voor deze drie scenario’s.
      </v-card-text>

      <v-card-title>
        Achtergrondinformatie
      </v-card-title>
      <v-card-text>
        * De scenario’s zijn doorgerekend met het Landelijk Hydrologisch Model (LHM; meer informatie via www.nhi.nu). Eerst wordt de actuele toestand van het grondwater bepaald door het LHM door te rekenen met meteorologische gegevens (bron: KNMI) tot op de dag van de update. Vervolgens worden de drie volgende scenario’s doorgerekend voor de zes maanden daarna:
        <v-card-text>
          <div>1.	Scenario droog: 5-percentiel van het langjarig gemiddeld neerslagtekort;</div>
          <div>2.	Scenario gemiddeld: 50-percentiel van het langjarig gemiddeld neerslagtekort;</div>
          <div>3.	Scenario nat: 95-percentiel van het langjarig gemiddeld neerslagtekort.</div>
        </v-card-text>
      </v-card-text>

      <v-card-title>
        Meer informatie?
      </v-card-title>
      <v-card-text>
       Wil je meer weten over de scenarioberekeningen in deze web-viewer? Of ben je geïnteresseerd in meer informatie over droogte en grondwater in Nederland? Neem dan contact op met Deltares via droogteradar@deltares.nl
      </v-card-text>
    <!-- <v-sheet class="pa-5"> -->
    <!-- <v-treeview
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
    ></v-treeview> -->
    <!-- </v-sheet> -->

  </div>
</template>

<script>
import arrayDiff from '@/lib/get-arrays-difference';
import { formatIdToLabel } from '@/lib/format-id-to-label';
import buildWmsLayer from '@/lib/build-wms-layer';
import { tab1 } from "../../config/datalayers-config.js";

export default {
  data: () => ({
    visibleLayers: [],
  }),
  computed:{
    tabname() {
      return tab1;
  }},


};
</script>
