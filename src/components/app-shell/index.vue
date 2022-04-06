<template>
  <v-app>

    <sidebar />
    <v-app-bar
      class="app-header"
      app
      color="primary"
      dark
    >

      <v-toolbar-title
       style= 'width:250px'>
       {{appname}}
       </v-toolbar-title>

      <welcome-dialog />
      <v-tabs
        background-color="primary"
        dark
        right
        grow
        style="500px"
        v-model="selectedTab"
      >
        <v-tab :to="{ name: 'actuele' }">
          {{actueleTab}}
        </v-tab>
        <v-tab :to="{ name: 'maandelijks' }" >
          {{maandelijksTab}}
        </v-tab>

        <v-tab :to="{ name: 'tijdreeksen' }">
          {{tijdreeksenTab}}
        </v-tab>
        <v-tab :to="{ name: 'zomer' }" >
          {{zomerTab}}
        </v-tab>

      </v-tabs>
    </v-app-bar>

    <v-content>
      <map-title v-if="activeLayerTimestamp" :title="activeLayerTimestamp"></map-title>
      <risk-legend
        v-if="legendLayer"
        :legendLayer="legendLayer"
      />
      <mapbox-map />
      <feature-details
        v-if="!!activeFeature"
        :feature="activeFeature"
        :parameters="parameters"
      />
      <requestData
        v-if="!!requestData"
        :feature="requestData"
      />
    </v-content>

  </v-app>
</template>

<script>
// import json_config from '@/config'
import Sidebar from './sidebar';
import MapboxMap from '@/components/mapbox-map';
import WelcomeDialog from './welcome-dialog';
import FeatureDetails from '@/components/feature-details';
import requestData from '@/components/transect-popup';
import RiskLegend from '@/components/legend';
import MapTitle from '@/components/map-title';
import { app_name,zomerTab,maandelijksTab,tijdreeksenTab,actueleTab} from "../../../config/datalayers-config.js";

const defaultUrl = process.env.VUE_APP_SERVER_BASE_URL;

export default {
  data: () => ({
    selectedTab: false,
    parameters: ''
  }),

  components: {
    Sidebar,
    MapboxMap,
    WelcomeDialog,
    FeatureDetails,
    requestData,
    RiskLegend,
    MapTitle,
  },

  computed: {
    appname () {
      return app_name;
    },
    zomerTab () {
      return zomerTab;
    },
    maandelijksTab () {
      return maandelijksTab;
    },
    tijdreeksenTab () {
      return tijdreeksenTab;
    },
    actueleTab () {
      return actueleTab;
    },
    activeFeature() {
      return this.$store.getters['mapbox/activeFeature'];
    },
    requestData() {
      return this.$store.getters['mapbox/requestData'];
    },
    legendLayer() {
      return this.$store.getters['mapbox/legendLayer'];
    },
    activeLayerTimestamp() {
      return this.$store.getters['mapbox/activeLayerTimestamp'];
    }
    
  },
  mounted () {
    this.selectedTab = "first";
    this.getParameters();
  },
  methods: {
    getParameters() {
      fetch(`${defaultUrl}/rest/fewspiservice/v1/archive/parameters?documentFormat=PI_JSON`)
        .then(res => {
          return res.json();
        })
        .then(response => {
          // TODO: uncomment this when fewspiservice is properly filled
          this.parameters = response.parameters[0].parameterId;
          // let parameters = response.parameters.map(param => param.parameterId)
          // this.parameters = parameters.join(';')
        });
    }
  }
};
</script>

<style src="@/assets/css/index.css">

</style>
