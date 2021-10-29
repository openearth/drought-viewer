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
        <v-tab :to="{ name: 'zomer' }" >
          {{tab1}}
        </v-tab>
        <v-tab :to="{ name: 'maandelijks' }" >
          {{tab2}}
        </v-tab>
        <v-tab :to="{ name: 'tijdreeksen' }">
          {{tab3}}
        </v-tab>
        <v-tab :to="{ name: 'intro' }">
          {{tab4}}
        </v-tab>

      </v-tabs>
    </v-app-bar>

    <v-content>
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
import { app_name,tab1,tab2,tab3,tab4} from "../../../config/datalayers-config.js";

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
    RiskLegend
  },

  computed: {
    appname () {
      return app_name;
    },
    tab1 () {
      return tab1;
    },
    tab2 () {
      return tab2;
    },
    tab3 () {
      return tab3;
    },
    tab4 () {
      return tab4;
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
          console.log(response, this.parameters);
        });
    }
  }
};
</script>

<style src="@/assets/css/index.css">

</style>
