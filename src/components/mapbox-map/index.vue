<template>
  <v-mapbox
    :access-token="mapBoxToken"
    :map-style="mapConfig.style"
    :center="mapConfig.center"
    :zoom="mapConfig.zoom"
    :max-zoom="mapConfig.maxZoom"
    @mb-created="onMapCreated"
    id="map"
    ref="map"
    >

      <!-- Map Controls -->
      <v-mapbox-geocoder />
      <v-mapbox-navigation-control position="bottom-right" />
      <map-control-baselayer
        :layers="mapBaseLayers"
        position="bottom-right"
      />

      <!-- Clickable GeoJSON layers -->
      <map-layer
        v-for="layer in geoJsonLayers"
        :key="layer.id"
        :options="layer"
        :clickable="true"
        @click="layerClick"
      />

      <!-- Raster layers -->

      <map-layer
        v-for="layer in rasterLayers"
        :key="layer.id"
        :options="layer"
      />
      
      <map-layer
        v-for="layer in activeOverlaysLayers" 
        :key="layer.id" 
        :options="layer"
        :opacity="layer.opacity"
        />
    
  </v-mapbox>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { MAP_CENTER, MAP_ZOOM, MAX_MAP_ZOOM, MAP_BASELAYER_DEFAULT, MAP_BASELAYERS} from '../../../config/constants';
import MapLayer from './map-layer';
import MapControlBaselayer from './map-control-baselayer';
// import MapControlFitbounds from './map-control-fitbounds';

import provinces from '@/data/provinces.json';


export default {
  data:() => ({

  }),

  components: {
    MapLayer,
    MapControlBaselayer,
    // MapControlFitbounds,
  },

  computed: {
    mapBoxToken() {
      return process.env.VUE_APP_MAPBOX_TOKEN;
    },
    mapConfig() {
      return {
        center: MAP_CENTER,
        zoom: MAP_ZOOM,
        maxZoom: MAX_MAP_ZOOM,
        style: MAP_BASELAYER_DEFAULT.style
      };
    },
    mapBaseLayers() {
      return MAP_BASELAYERS;
    },

    geoJsonLayers() {
      return this.$store.getters['mapbox/geoJsonLayers'];
    },
    rasterLayers() {
      return this.$store.getters['mapbox/rasterLayers'];
    },
    activeOverlaysLayers() {
      return this.$store.getters['mapbox/activeOverlaysLayers'];
    }
  },

  methods: {
    onMapCreated(map) {
      this.$root.map = map;
      map.on('load', ()  => {
        this.$root.mapLoaded = true;
        this.fakeRequestToBuildLayer ();
      });
    },
    fitToBounds() {
      // @REFACTOR :: We do a simple flyto at the moment, we could also fit to actual bounds of layers
      this.$root.map.flyTo({
        center: this.mapConfig.center,
        zoom: this.mapConfig.zoom
      });
    },
    fakeRequestToBuildLayer() {
      setTimeout(() => {
        this.$root.map.addSource('provinces', {
          'type': 'geojson',
          'data': provinces
        });
        this.$root.map.addLayer({
          'id': 'wtf',
          'type': 'line',
          'source': 'provinces',
          'layout': {},
          'paint': {
            'line-width': 1.5
          }
        }); 
      }, 2000);

    },
    layerClick(e) {
      var features = this.$root.map.queryRenderedFeatures(e.point, { layers: [e.features[0].layer.source] });
      var feature = features[0];
      this.$store.commit('mapbox/SET_ACTIVE_FEATURE', feature.properties);
    }
  }
};
</script>

<style>
#map {
  height: 100%;
  width: 100%;
}
</style>
