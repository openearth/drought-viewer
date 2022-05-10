<template>
  <v-content>
    <v-flex class= "blog-page pl-15">
      <v-row>
        <v-col cols="8" class="pa-4">
          <v-container>
            <h2 class="h2 card-title" >
              Achtergrondinformatie
            </h2>
            <div v-for="info in backgroundInformation" :key="info.title">
               <informationLayout :title="info.title" :text="info.text" :icon="info.icon"></informationLayout>
            </div>
           
          
          </v-container>
        </v-col>
        <v-col cols="4" class="pa-4">
          <v-container>
            <h2 class="h2 card-title">
              Nieuws - updates
            </h2>
            <news-layout :newsItems="news"></news-layout>
          </v-container>
        </v-col>
      </v-row>
    </v-flex>
  </v-content>
</template>

<script>
import informationLayout from '@/components/informationLayout';
import backgroundInformation from '@/data/backgroundInformation.json';
import news from '@/data/news.json';
import newsLayout from '@/components/newsLayout';


export default { 
  components: { 
    informationLayout,
    newsLayout
  },
  data () { 
    return { 
      backgroundInformation,
      news
    };
  }
};


</script>

<style scoped>
.blog-page {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-color: white;
}

.card-title {
  color: white;
}
</style>
