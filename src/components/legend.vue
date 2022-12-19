<template>
  <div class="layer-legend">
    <img
      :src="legendUrl"
      class="layer-legend__image"
      alt="risk legend"
    >
    <small>{{legendText}}</small>
  </div>
</template>

<script>
import buildLegendUrlFews from '@/lib/build-legend-url-fews';
import { LEGEND_TEXT } from '../../config/constants';

export default {
  props: {
    legendLayer: {
      type: String,
      required: true
    }
  },
  computed: {
    legendUrl() {
      return buildLegendUrlFews({layers: this.legendLayer});
    }
  },
  data() {
    return {
      legendText: LEGEND_TEXT
    };
  }
};
</script>

<style>
  .layer-legend {
    position: absolute;
    width: 160px;
    bottom: 2rem;
    left: .5rem;
    background-color: white;
    outline: 0;
    border: 0;
    border-radius: 4px;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
  .layer-legend__image {
    justify-content: flex-start;
    border-radius: 4px;
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
