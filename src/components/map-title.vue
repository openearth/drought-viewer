<template>
  <v-card class="map-title" flat>
    <p class="map-title-text text-body-2">
      {{ title }}
    </p>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
  .map-title {
    position: absolute;
    z-index: 1;
    top: 14px;
    left: 14px;
    padding: 8px 12px;
    background-color: #ffffff;
    user-select: none;
  }

  .map-title .map-title-text {
    margin: 0;
  }
</style>
 