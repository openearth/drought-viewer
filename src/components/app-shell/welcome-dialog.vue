<template>
  <v-dialog
    max-width="700px"
    v-model="showWelcomeDialog">

    <v-card light max-width="700px">

      <v-card-title>
        <span class="headline">
          Disclaimer:
        </span>
      </v-card-title>

      <v-card-text>
        This viewer is generated with the purpose of informing the general public....
      </v-card-text>

      <v-card-actions>
        <v-row justify="center" class="pa-0 ma-0">
             <v-btn
                class="primary "
                text
                @click="onStartClick"
                >Accepteer en naar website
              </v-btn>
          <!-- <v-btn tutorialDialog=true" round color="primary" dark>Decline</v-btn> -->
        </v-row>
      </v-card-actions>
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
