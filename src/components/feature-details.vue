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
import { none } from 'ramda';

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
          dataZoom: {},
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
        nameGap: 30,
        scale: true
      },
      series: [],
      animationDuration: 2000,
    },
  }),

  methods: {
    closeFeature() {
      this.$store.commit('mapbox/SET_ACTIVE_FEATURE', null);
    },
    getSeriesLabel(timeSerie, parameter) {
      const labelConversion = {
        Scenario_MEDIAN: 'Median',
        Scenario_DROOG: 'Droog',
        Scenario_NAT: 'Nat',
        LHMpost_Grid2Point_Historical: 'Historie',
      }
      const q =_.get(timeSerie, 'header.qualifierId[0]', parameter);
      return labelConversion[q] || parameter
    },
    addLineToGraph(timeSerie, parameter) {
      const events = _.get(timeSerie, 'events', []);
      let data = events.map((event) => {
        return [event.date, event.value];
      });
      data = data.sort((colA, colB) => {
        return moment(colA[0]) - moment(colB[0]);
      });
      const name = this.getSeriesLabel(timeSerie, parameter);
      this.options.legend.data.push(name);
      this.options.series.push({
        name:  name,
        data: data,
        type: 'line',
        symbol: 'none'
      });
      this.hasLoaded = true;
    },
    addAreaToGraph(serieA, label, color=null) {
      const eventsA = _.get(serieA, 'events', []);
      let dataA = eventsA.map((event) => {
        return [event.date, event.value];
      });
      dataA = dataA.sort((colA, colB) => {
        return moment(colA[0]) - moment(colB[0]);
      });

      const series = {
        name:  label,
        data: dataA,
        type: 'line',
        symbol: 'none',
        lineStyle: {
          opacity: 0
        },
        z: -1
      }
      if (color) {
        series['areaStyle'] = {
          color: color,
          origin: "start",
          opacity: 0.3
        }
      } else {
        series['areaStyle'] = {
          color: 'white',
          opacity: 1,
          origin: "start"
        }
      }
      this.options.series.push(series);
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

            if (parameter === 'Import_GroundwaterStatistics') {
              const serie05 = response.timeSeries.find(serie => serie.header.parameterId === 'G.fmf.P05')
              const serie25 = response.timeSeries.find(serie => serie.header.parameterId === 'G.fmf.P25')
              const serie50 = response.timeSeries.find(serie => serie.header.parameterId === 'G.fmf.P50')
              const serie75 = response.timeSeries.find(serie => serie.header.parameterId === 'G.fmf.P75')
              const serie95 = response.timeSeries.find(serie => serie.header.parameterId === 'G.fmf.P95')
              this.addAreaToGraph(serie75, 'P75','#a3a3a3');
              this.addAreaToGraph(serie25, 'P25');
              this.addAreaToGraph(serie95, 'P95', '#ccc');
              this.addAreaToGraph(serie05, 'P05');
              this.addLineToGraph(serie50, 'P50');

            } else {
              response.timeSeries.forEach(serie => {
                this.addLineToGraph(serie, parameter);
              });
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
