<template>
  <v-card
    color="rgba(0, 0, 0, 0)"
    rounded
    outlined
    dark
    class="news-card"
  >
    <v-list class="news-list">
      <v-list-item v-for="newsItem in newsItems" :key="newsItem.title">
        <v-list-item-content>
          <v-list-item-title>{{ newsItem.title }}</v-list-item-title>
        </v-list-item-content>

      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: {
    newsItems: {
      type:Array,
      required:true
    }
  }
};
</script>
<style>

.news-card {
  border-color: black !important;
  margin-bottom: 10px;
  border-width: medium !important;
  background-color: #008fc5 !important;
}

.news-list {
  background-color: #008fc5 !important;
}

</style>

