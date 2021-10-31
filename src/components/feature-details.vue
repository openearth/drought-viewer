<template>
  <v-card class="feature-details" min-width="600">
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
      <v-chart
        v-if="hasLoaded"
        :option="options"
        :autoresize="true"/>
      <p v-else>Loading feature data...</p>
      <!-- <p v-else>No data available for this feature</p> -->
    </v-container>
  </v-card>
</template>

<script>
import VChart from 'vue-echarts';

// import ECharts modules manually to reduce bundle size
import {
  SVGRenderer,
  CanvasRenderer
} from 'echarts/renderers';
import {
  LineChart,
  ScatterChart,
  LinesChart
} from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  MarkLineComponent,
  MarkPointComponent,
  DataZoomComponent,
  TimelineComponent,
  ToolboxComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components';
import { use } from 'echarts/core';
use([
  ScatterChart,
  CanvasRenderer,
  LineChart,
  GridComponent,
  TooltipComponent,
  MarkLineComponent,
  MarkPointComponent,
  DataZoomComponent,
  TimelineComponent,
  LinesChart,
  ToolboxComponent,
  TitleComponent,
  LegendComponent
]);
use([CanvasRenderer]);
use([SVGRenderer]);

import moment from 'moment';
import _ from 'lodash';

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
    VChart,
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
          saveAsImage: {}
        }
      },
      title: {
        text: 'Grondwaterstanden',
      },
      grid: {
        left: '10%',
        right: '15%',
        bottom: '10%'
      },
      legend: {
        type: 'scroll',
        orient: 'vertial',
        top: 50,
        right: 10
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      xAxis: {
        type: 'time',
        axisLine: {
          onZero: false,
          show: false
        },
        splitLine: {
          show: true
        },
        axisLabel: {
          formatter: '{dd}-{MM}-{yy}'
        }
      },
      yAxis: {
        type: 'value',
        name: 'Berekende grondwaterstanden (m + maaiveld)',
        nameLocation: 'middle',
        nameRotate: 90,
        nameGap: 30
      },
      series: [],
      animationDuration: 2000,
    },
  }),

  methods: {
    closeFeature() {
      this.$store.commit('mapbox/SET_ACTIVE_FEATURE', null);
    },
    addToGraph(timeSerie, parameter) {
      const events = _.get(timeSerie, 'events', []);
      let data = events.map((event) => {
        return [event.date, event.value];
      });
      data = data.sort((colA, colB) => {
        return moment(colA[0]) - moment(colB[0]);
      });
      const name = _.get(timeSerie, 'header.qualifierId[0]', parameter);
      this.options.legend.data.push(name);
      this.options.series.push({
        name:  name,
        data: data,
        type: 'line',
        symbol: 'none'
      });
      this.hasLoaded = true;
    },
    fetchDetails() {
      const { id } = this.feature;
      const end = moment().add(6, 'months').format('YYYY-MM-DDTHH:mm:ss');
      const start = moment().subtract(6, 'months').format('YYYY-MM-DDTHH:mm:ss');
      const parameters = ['LHMpost_Grid2Point_Historical', 'LHMpost_Grid2Point_Scenario_DROOG', 'LHMpost_Grid2Point_Scenario_NAT', 'LHMpost_Grid2Point_Scenario_MEDIAN', 'Import_GroundwaterStatistics'];

      this.options.series = [];
      this.options.title.text = `Grondwaterstanden - ${id}`;
      this.options.legend.data = [];

      parameters.forEach(parameter => {
        const url = `${defaultUrl}/rest/fewspiservice/v1/timeseries?documentFormat=PI_JSON&filterId=Grondwaterstanden_webservice&moduleInstanceIds=${parameter}&locationIds=${id}&startTime=${start}Z&endTime=${end}Z&convertDatum=false&useDisplayUnits=true&showThresholds=false&omitMissing=true`;
        fetch(url)
          .then((res) => {
            return res.json();
          })
          .then(response => {
            response.timeSeries.forEach(serie => {
              this.addToGraph(serie, parameter);
            });
            if (parameter === 'Import_GroundwaterStatistics') {
              // this.options.series.push({
              //   name: 'confidence',
              //   type: 'line',
              //   data: data.map(function (item) {
              //     return item.u - item.l;
              //   }),
              //   lineStyle: {
              //     opacity: 0
              //   },
              //   areaStyle: {
              //     color: '#ccc'
              //   },
              //   stack: 'confidence-band',
              //   symbol: 'none'
              // });
            }
          });
      });
    }
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
  width: 600px;
  height: 500px;
}
</style>
