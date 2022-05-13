<template>
  <v-card
    color="rgba(0, 0, 0, 0)"
    rounded
    outlined
    dark
    class="information-card"
    >
      <v-card-title>
        <span><strong>{{ title }}</strong></span>
      </v-card-title>
      <v-row align="center" >
        <v-col cols="2" class="pa-8">
          <v-avatar size="130">
             <img
                :src="cover(icon)"
              >
          </v-avatar>
        </v-col>
        <v-col cols="10" class="mb-4">
          <span >{{ text }}</span>
        </v-col>
      </v-row>
    </v-card>
</template>
<script>
export default { 
  props: { 
    title: { 
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String, 
      required: true
    }
  },
  methods: {
    cover(url) {
      if (url !== ''){ // You can check any matching expression.
        try {
          url = require('@/assets/img/' + url);
        } catch (e) {
          url = require('@/assets/img/dry.jpg'); 
        }
      }
      else
        url = require('@/assets/img/dry.jpg');  
      return url;
    }
  }
  
};
</script>
<style>

.information-card {
  border-color: black !important;
  margin-bottom: 10px;
  border-width: medium !important;
  background-color:  #008fc5 !important;
}

</style>
