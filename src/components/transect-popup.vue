<template>
  <v-card class="wpsResponse" min-width="600" max-height="600">
    <v-toolbar dense flat>
      <v-toolbar-title>{{ "Time-series plot"}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="closeFeature" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container>
      <div v-if="wpsResponse.length" class="d-flex">
        <!-- HTML Plots -->
        <template v-if="htmlPlots.length">
          <div v-for="plot in htmlPlots" :key="plot.url" class="wpsResponse__column">
            <iframe class="wpsResponse__iframe" :src="plot.url" />
          </div>
        </template>
      </div>
      <!-- <p v-else-if="!this.htmlPlots">No data available for this feature.  </p>
      <p v-else>Loading feature data... <img src="@/assets/img/loading.gif" ></p>-->
      <p v-if="this.loading==true">Loading feature data...<img src="@/assets/img/loading.gif" /></p>
      <p v-if="no_data == true">No data available for this feature.</p>
      <p v-if="too_big == true">'The maximum allowed distance is 10 km. Please, try again.'</p>
    </v-container>
  </v-card>
</template>

<script>
import { compose, split, last, equals, trim } from "ramda";
import transectRepo from "@/repo/transect.repo";

export default {
  data: () => ({
    hasLoaded: false,
    wpsResponse: [],
    loading: false,
    no_data: false,
    too_big: false
  }),

  computed: {
    htmlPlots() {
      return this.wpsResponse.filter(({ url }) => hasExtension("html")(url));
    },

    requestData() {
      return this.$store.getters["mapbox/requestData"];
    }
  },

  methods: {
    closeFeature() {
      this.$store.commit("mapbox/SET_REQUEST_DATA", null);
    },

    async getSection() {
      try {
        this.loading = true;
        this.wpsResponse = await transectRepo.getTransect(this.requestData);
        this.loading = false;
        if (this.wpsResponse[0].url == 'No data available for this area.'){
          this.no_data = true;
        }
        else if (this.wpsResponse[0].url == 'The maximum allowed distance is 10 km. Please, try again.'){
          this.too_big = true;
        }

        this.hasLoaded = true;
      } catch (err) {
        console.error("Error getting transect: ", err);
      }
    }
  },

  created() {
    this.getSection();
  }
};
const hasExtension = extension =>
  compose(equals(extension), trim, last, split("."));
</script>
<style>
.wpsResponse {
  position: absolute;
  bottom: 2rem;
  left: 0.5rem;
}

.wpsResponse__column img {
  display: block;
}

.wpsResponse__column:not(:last-child) {
  margin-right: 12px;
}

.wpsResponse__iframe {
  display: block;
  border: 0;
  width: 550px;
  height: 530px;
}
</style>
