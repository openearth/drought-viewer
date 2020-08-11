<template>

  <v-dialog
    max-width="700px"
    v-model="showWelcomeDialog">

   <v-card
   max-width="700px"
   >

      <v-card-title></v-card-title>
      <v-spacer
        class="title text-center"
      >

       DISCLAIMER:
      </v-spacer>
      <v-spacer
        class="title text-center"
      >
       This viewer is generated with the purpose of informing the general public....
      </v-spacer>
      <v-card-title></v-card-title>

      <v-layout align-end justify-center>
          <v-flex xs6>
            <!--- v-flex is centered now, but we need to center button inside v-flex -->
            <div class="text-center">
              <v-btn
               class="primary "
               text
               @click="onStartClick"
               >Let's get started

               </v-btn>
              <v-card-title></v-card-title>
            </div>
          </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>

</template>

<script>
const LOCALSTORAGE_KEY = 'intro_seen';


export default {
  data: () => ({
    showWelcomeDialog: true
  }),

  beforeMount() {
    const seen = window.localStorage.getItem(LOCALSTORAGE_KEY);

    if(seen) {
      this.showWelcomeDialog = true;
    }
  },

  methods: {
    onStartClick() {
      this.showWelcomeDialog = false;

      window.localStorage.setItem(LOCALSTORAGE_KEY, true);

    }
  }
};
</script>
