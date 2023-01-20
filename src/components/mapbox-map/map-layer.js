
import { isNil } from '@/lib/helpers.js';
export default {
  name: 'map-layer',
  inject: ['getMap'],
  render() {
    return null;
  },

  props: {
    options: {
      default: () => ({}),
      type: [Object, String]
    },
    // allows to place a layer before another
    before: {
      type: String,
      default: null
    },
    clickable: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      required: false,
      validator: val => val >= 0 && val <= 1,
    },

  },

  data: () => ({
    isInitialized: false
  }),

  methods: {
    deferredMountedTo() {
      if(!this.isInitialized) {
        this.renderLayer();
        this.isInitialized = true;
      }
    },

    addLayer() {
      const map = this.getMap();

      map.addLayer(this.options, this.before);


      if(this.clickable) {
        const layerId = this.options.id;
        map.on('click', layerId, this.clickFn);
        map.on('mouseenter', layerId, this.mouseEnterFn);
        map.on('mouseleave', layerId, this.mouseLeaveFn);
      }
      if (!isNil(this.opacity)) {
        this.setOpacity();
      }
    },

    clickFn(e) {
      this.$emit('click', e);
      var features = this.$root.map.queryRenderedFeatures(e.point, { layers: [e.features[0].layer.source] });
      if (!features.length) {
        return;
      }
      if (typeof this.$root.map.getLayer('selectedFeature') !== "undefined" ){
        this.$root.map.removeLayer('selectedFeature');
        this.$root.map.removeSource('selectedFeature');
      }
      var feature = features[0];
      //I think you could add the vector tile feature to the map, but I'm more familiar with JSON
      this.$root.map.addSource('selectedFeature', {
        "type":"geojson",
        "data": feature.toJSON()
      });

      if (e.features[0].layer.type == "line") {
        this.$root.map.addLayer({
          "id": "selectedFeature",
          "type": e.features[0].layer.type,
          "source": "selectedFeature",
          "paint": {
            'line-color': '#FFFF00',
            'line-width': 4,
          } });
      } else {
        this.$root.map.addLayer({
          "id": "selectedFeature",
          "type": e.features[0].layer.type,
          "source": "selectedFeature",
          "paint": {
            'circle-radius': 6,
            'circle-color': '#FFFF00',
          }
        });
      }
    },

    mouseEnterFn() {
      const map = this.getMap();
      map.getCanvas().style.cursor = 'pointer';
    },

    mouseLeaveFn() {
      const map = this.getMap();
      map.getCanvas().style.cursor = '';
    },
    setOpacity() {
      const map = this.getMap();
      const { id, type } = this.options;
      map.setPaintProperty(id, `${ type }-opacity`, this.opacity);
    },

    removeLayer() {
      const map = this.getMap();
      if(map) {
        const layerId = this.options.id;
        const layer = map.getLayer(layerId);
        if(layer) {
          map.removeLayer(layerId);
          map.removeSource(layer.source);
          if(this.clickable) {
            map.off('click', layerId, this.clickFn);
            map.off('mouseenter', layerId, this.mouseEnterFn);
            map.off('mouseleave', layerId, this.mouseLeaveFn);
          }
        }
      }
    },

    renderLayer() {
      this.removeLayer();
      this.addLayer();
    }
  },

  mounted() {
    const map = this.getMap();
    // We can immediately initialize if we have the map ready
    if(map && map.isStyleLoaded()) {
      this.renderLayer();
      this.isInitialized = true;
    }
  },

  destroyed() {
    this.removeLayer();
    if (typeof this.$root.map.getLayer('selectedFeature') !== 'undefined'){
      this.$root.map.removeLayer('selectedFeature');
      this.$root.map.removeSource('selectedFeature');
    }

  },

  watch: {
    options: {
      deep: true,
      handler() {
        this.renderLayer();
      }
    },
    opacity() {
      this.setOpacity();
    },
  }
};
