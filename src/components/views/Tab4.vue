<template>
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
        Deze kaart toont de afwijking van de actuele grondwaterstand ten opzichte van de langjarig gemiddelde grondwaterstand voor deze week (beide modelresultaten LHM).
      </v-card-text>
      </v-sheet>

    <v-card-title>
      {{tabname}}
    </v-card-title>
      <v-card-title>
        Webviewer
      </v-card-title>

      <v-card-text class="text-align: justify">
        Deze web-viewer geeft waterbeheerders en watergebruikers inzicht in de toekomstige toestand van het grondwater aan de hand van drie meteorologische scenario’s:

        <v-card-text>
          <div>1.	Het is komende zes maanden <strong>erg droog</strong> (scenario droog);</div>
          <div>2.	De komende zes maanden is het neerslagtekort <strong>gemiddeld</strong> (scenario gemiddeld);</div>
          <div>3.	Het is komende zes maanden <strong>erg nat</strong> (scenario nat).</div>
        </v-card-text>

      </v-card-text>
      <v-card-title >
        Achtergrondinformatie
      </v-card-title>
      <v-card-text>
        Het jaar 2018 was extreem droog, met grote economische schade tot gevolg. Het daaropvolgende jaar 2019 was vooral regionaal een erg droog jaar en ook het voorjaar van 2020 was erg droog.
      </v-card-text>
      <v-card-text >
        De droogte van de afgelopen jaren resulteerde in lage tot zeer lage grondwaterstanden. Dit heeft negatieve gevolgen voor de landbouw en natuur. Er zijn een aantal maatregelen mogelijk om de droogteschade te beperken, zoals het neerslagwater langer vasthouden op perceelniveau of het instellen van beperkingen voor beregening uit lokale waterlopen en grondwater. Bij zulke maatregelen is het van belang om vooruit te kunnen blikken en de ontwikkeling van de droogte en de grondwaterstanden goed in te kunnen schatten. Dat kan met behulp van deze webviewer.
      </v-card-text>
      <v-card-text>
       De drie meteorologische scenario’s (erg droog, gemiddeld, nat) worden wekelijks doorgerekend met het Landelijk Hydrologisch Model (LHM; meer informatie via www.nhi.nu). Eerst wordt de actuele toestand van het grondwater bepaald door het LHM door te rekenen met meteorologische gegevens (bron: KNMI) tot op de dag van de update. Vervolgens worden de drie volgende scenario’s doorgerekend voor de zes maanden daarna:
        <v-card-text>
          <div>1.	Scenario droog: 5-percentiel van het langjarig gemiddeld neerslagtekort;</div>
          <div>2.	Scenario gemiddeld: 50-percentiel van het langjarig gemiddeld neerslagtekort;</div>
          <div>3.	Scenario nat: 95-percentiel van het langjarig gemiddeld neerslagtekort.</div>
        </v-card-text>
      </v-card-text>


      <v-card-title>
        Meer informatie?
      </v-card-title>
      <v-card-text class="justify">
       Wil je meer weten over de scenarioberekeningen in deze web-viewer? Of ben je geïnteresseerd in meer informatie over droogte en grondwater in Nederland?
        Neem dan contact op met Deltares via  <a href="mailto:droogteradar@deltares.nl?subject=Droogte Radar Deltares">Deltares contact</a>

      </v-card-text>


  </div>
</template>

<script>
// import { formatIdToLabel } from '@/lib/format-id-to-label';
import buildWmsLayer from '@/lib/build-wms-layer';
import { tab4, items_tab4 } from "../../../config/datalayers-config";
import buildCapabilitiesUrl from '@/lib/build-capabilities-url';
import _ from 'lodash';

export default {
  data: () => ({
    visibleLayers: [],
    items: items_tab4
  }),
  computed: {
    tabname() {
      return tab4;
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
    removeLayer(layerId) {
      this.$store.commit('mapbox/REMOVE_RASTER_LAYER', layerId);
    },
  }

};
</script>
<style>
.v-card__text {
    width: 100%;
    text-align: justify;
}
</style>
