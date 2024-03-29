<template>
    <v-card class="map-legend" :class="{ 'map-legend--open': showLegend }" elevation="4" :max-height="maxLegendHeight"
        width="360" :max-width="maxLegendWidth">
        <v-card-title class="map-legend__title subtitle-2" @click="toggleLegend">
            Overlays Legends
            <v-icon class="map-legend__button" :class="{ 'map-legend__button--active': showLegend }">
                mdi-chevron-down
            </v-icon>
        </v-card-title>
        <div v-if="showLegend">
            <v-card-text v-if="activeOverlaysInfo.length >= 2" class="map-legend__content">
                <v-expansion-panels multiple>
                    <v-expansion-panel v-for="(layer, index) in activeOverlaysInfo" :key="index">
                        <v-expansion-panel-header>
                            {{ layer.name }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content eager>
                            <img class="map-legend__image" alt="" :src="legendUrl(layer)">
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
    
            <v-card-text  v-else class="map-legend__content">
                <p class="body-1 mb-2">
                    {{ activeOverlaysInfo[0].name }}
                </p>
                <img class="map-legend__image" alt="" :src="legendUrl(activeOverlaysInfo[0])">
            </v-card-text>
        </div>

    </v-card>
</template>
  
<script>
import buildLegendUrl from '@/lib/build-legend-url';
import { mapGetters } from 'vuex';
import overlays from '@/data/overlays.json';


export default {
  data: () => ({
    maxLegendHeight: 'calc(100vh - 106px)', // subtracts toolbar, margin and padding.
    maxLegendWidth: 'calc(100vw - 32px)', // subtracts padding.
    showLegend: false,
    overlays: overlays
  }),
  computed: {
    ...mapGetters('mapbox', ['activeOverlaysLayers']),
    activeOverlaysInfo () { 
      return this.activeOverlaysLayers.map(layer => this.overlays.find(overlay => overlay.id === layer.id ));
    }
  },

  methods: {
    legendUrl(activeOverlay) {
      const overlayInfo = this.overlays.find(overlay => overlay.id === activeOverlay.id);
      return buildLegendUrl({layer: overlayInfo.id, url: overlayInfo.url});
    },

    toggleLegend() {
      this.showLegend = !this.showLegend;
    },
  },
};
</script>
  
<style lang="scss">
.map-legend {
    bottom: 2rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: absolute;
    right: 3rem;
    transform: translateY(calc(100% - 48px + 4px));
    transition: transform .3s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 2;
}

.map-legend--open {
    transform: translateY(0%);
}

.map-legend__button {
    transform: rotate(-180deg);
    transition: transform .4s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.map-legend__button--active {
    transform: rotate(0deg);
}

.map-legend__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 3px;
    padding-bottom: 3px;
    height: 40px;
}

.map-legend__content.v-card__text {
    padding-top: 2px;
    overflow-y: auto;
}

.map-legend__image {
    height: auto;
    max-width: 100%;
    width: auto;
}
</style>
  