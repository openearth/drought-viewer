<template>
  <v-card class="feature-details" min-width="400">
    <v-toolbar dense flat>
      <v-toolbar-title>
        {{ feature.locationkey }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="closeFeature" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container>
      <v-chart v-if="hasLoaded" :options="options" :autoresize="true"/>
      <p v-else>Loading feature data...</p>
      <!-- <p v-else>No data available for this feature</p> -->
    </v-container>
  </v-card>
</template>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/polar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/tooltip';
import moment from 'moment'
import _ from 'lodash'

const defaultUrl = process.env.VUE_APP_SERVER_BASE_URL;

export default {
  props: {
    feature: {
      type: Object,
      required: true,
    },
    parameters: {
      type: String,
    },
  },
  components: {
    'v-chart': ECharts,
  },
  data: () => ({
    featureDetails: [],
    hasLoaded: false,
    options: {
      toolbox: {
        feature: {
          dataZoom: {
              yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      title: {
        text: 'Grondwaterstanden',
      },
      legend: {
        type: 'scroll',
        bottom: '0'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        type: 'value',
      },
      series: [],
      animationDuration: 2000,
    },
  }),

  computed: {
    // htmlPlots() {
    //   // console.log("html plots", this.featureDetails)
    //   var result = this.featureDetails.filter(function (el) {
    //     return el.id &&
    //      el.name &&
    //      el.url;
    //     });
    //   return result;
    // },
  },

  methods: {
    closeFeature() {
      this.$store.commit('mapbox/SET_ACTIVE_FEATURE', null);
    },
    fetchDetails() {
      const { id } = this.feature;
      const end = '2021-08-13T00:00:00Z' // TODO: should be less hardcoded and dependent on the date
      const start = '2021-07-23T00:00:00Z' // TODO: should be less hardcoded and dependent on the date
      // const end = moment().add(1, 'days').format('YYYY-MM-DDTHH:mm:ssZ') //TODO: use something like this instead
      // const start = moment().subtract(10, 'days').format('YYYY-MM-DDTHH:mm:ssZ') //TODO: use something like this instead
      const parameters = ['LHMpost_Grid2Point_Historical', 'LHMpost_Grid2Point_Scenario_DROOG', 'LHMpost_Grid2Point_Scenario_NAT', 'LHMpost_Grid2Point_Scenario_MEDIAN']

      this.options.series = []
      this.options.title.text = `Grondwaterstanden - ${id}`;
      this.options.legend.data = parameters;

      parameters.forEach(parameter => {
        const url = `${defaultUrl}/rest/fewspiservice/v1/timeseries?documentFormat=PI_JSON&filterId=Grondwaterstanden_webservice&moduleInstanceIds=${parameter}&locationIds=${id}&startTime=${start}&endTime=${end}&convertDatum=false&useDisplayUnits=false&showThresholds=false&omitMissing=true`;
        fetch(url)
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            const events = _.get(response, 'timeSeries[0].events', []);
            const data = events.map((event) => {
              return [event.date, event.value];
            });
            this.options.series.push({
              name: parameter,
              data: data,
              type: 'line'
            });
            this.hasLoaded = true;
          });
      })

    },

    // async fetchDetails() {
    //   const { locationkey, layerId } = this.feature;
    //   const wpsIdentifier = this.wpsDictionary[layerId];
    //   try {
    //     this.featureDetails = await featureDetailsRepo.getReport(wpsIdentifier, locationkey);
    //     this.hasLoaded = true;
    //   }
    //   catch(err) {
    //     console.error('Error getting feature XML: ', err);
    //   }
    // }
  },

  created() {
    this.fetchDetails();
  },

  watch: {
    feature() {
      this.fetchDetails();
    },
  },
};
</script>

<style>
.feature-details {
  position: absolute;
  bottom: 2rem;
  left: 0.5rem;
}

.echarts {
  width: 400px;
  height: 500px;
}
</style>
