<template>
  <v-app>
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
        <v-tab :to="{ name: 'achtergrondinformatie' }">
          {{achtergrondinformatie}}
        </v-tab>
        <v-tab :to="{ name: 'actuele' }">
          {{actueleTab}}
        </v-tab>
        <v-tab :to="{ name: 'maandelijks' }" >
          {{maandelijksTab}}
        </v-tab>
        <v-tab :to="{ name: 'tijdreeksen' }">
          {{tijdreeksenTab}}
        </v-tab>
        <v-tab :to="{ name: 'zomer' }">
          {{zomerTab}}
        </v-tab>
      </v-tabs>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>


import WelcomeDialog from './welcome-dialog';
import { app_name,zomerTab,maandelijksTab,tijdreeksenTab,actueleTab, achtergrondinformatie} from "../../../config/datalayers-config.js";


export default {
  data: () => ({
    selectedTab: false,
    parameters: ''
  }),

  components: {
    WelcomeDialog,
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
    achtergrondinformatie () { 
      return achtergrondinformatie;
    },
    
  },
  mounted () {
    this.selectedTab = "first";
  },

};
</script>

<style src="@/assets/css/index.css">

</style>
