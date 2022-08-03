export default {
  namespaced: true,

  state: {
    geoJsonLayers: [],
    rasterLayers: [],
    overlayLayer: null,
    activeFeature: null,
    requestData:null,
    legendLayer: null,
  },

  getters: {
    geoJsonLayers: state => state.geoJsonLayers,
    rasterLayers: state => state.rasterLayers,
    overlayLayer: state => state.overlayLayer,
    activeFeature: state => state.activeFeature,
    requestData: state => state.requestData,
    legendLayer: state => state.legendLayer,
    activeLayerTimestamp: getters => {
      const rasterLayers = getters.rasterLayers;
      if (!rasterLayers.length) {
        return;
      }
      const activeLayer = rasterLayers[rasterLayers.length -1];
    
      const { time } = activeLayer;
      return time.substr(0, 10);
    }
  },

  mutations: {
    ADD_GEOJSON_LAYER(state, newLayer) {
      const layerExists = state.geoJsonLayers.some(storedLayer => storedLayer.id === newLayer.id);
      if(!layerExists) {
        state.geoJsonLayers = [
          ...state.geoJsonLayers, Object.freeze({
            ...newLayer
          })
        ];
      }
    },
    REMOVE_GEOJSON_LAYER(state, id) {
      state.geoJsonLayers = state.geoJsonLayers.filter(layer => layer.id !== id);
    },
    ADD_RASTER_LAYER(state, newLayer) {
      const layerExists = state.rasterLayers.some(storedLayer => storedLayer.id === newLayer.id);
      if(!layerExists) {
        state.rasterLayers = [
          ...state.rasterLayers, Object.freeze({
            ...newLayer
          })
        ];
      }
    },
    REMOVE_RASTER_LAYER(state, id) {
      state.rasterLayers = state.rasterLayers.filter(layer => layer.id !== id);
    },
    REMOVE_ALL_LAYERS(state) {
      state.rasterLayers = state.rasterLayers=[];
    },
    ADD_OVERLAY_LAYER(state, newLayer) {
      state.overlayLayer = newLayer;
    },
    REMOVE_OVERLAY_LAYER(state) {
      state.overlayLayer = null;
    },
    SET_ACTIVE_FEATURE(state, feature) {
      state.activeFeature = Object.freeze(feature);
    },
    SET_REQUEST_DATA(state, requestData) {
      state.requestData = requestData;
    },

    SET_LEGEND_LAYER(state,layer) {
      state.legendLayer = layer;
    },
    SET_ACTIVE_LAYER_TIMESTAMP(state, timestamp) {
      state.activeLayerTimestamp = timestamp;
    },
    RESET_ALL(state) {
      state.geoJsonLayers = [];
      state.rasterLayers = [];
      state.activeFeature = null;
      state.requestData = null;
      state.legendLayer = null;
      state.activeLayerTimestamp = null;
    },


  },

  actions: {

  }
};
