<template>
  <v-dialog
    max-width="700px"
    v-model="showWelcomeDialog">

    <v-card light max-width="700px">

      <v-card-title>
        <span class="headline">
          Droogteradar - grondwaterprognoses
        </span>
      </v-card-title>
      <v-card-text>
        Droogteradar is een onderzoeksproject van Deltares. De grondwaterprognoses zijn ontwikkeld om beschikbare kennis op het gebied van vooruitzichten van grondwaterstanden bij elkaar te brengen en de toepassing hiervan te onderzoeken.
      </v-card-text>
      <v-card-text>
        Deze web-viewer toont, op basis van het huidige meteorologische toestand en berekeningen met het nationaal hydrologisch model (LHM4.1), de ontwikkeling van het grondwater in de loop van het groeiseizoen voor drie meteorologische scenario's: droog, gemiddeld en nat. Ook wordt voor ieder scenario de verwachte gemiddelde laagste grondwaterstand van het lopende jaar in beeld gebracht. Deze zomergrondwaterstand is een belangrijke droogte indicator voor onder andere natuur en landbouw.
      </v-card-text>
      <v-card-text>
        Doel is om de prognoses samen met partners verder te ontwikkelen tot een nationaal droogtevoorspellingssysteem dat zowel waterbeheerders als watergebruikers van waardevolle informatie voorziet om tijdig droogtemaatregelen in te kunnen zetten.
      </v-card-text>
      <v-card-text>
De website is met de grootst mogelijke zorgvuldigheid opgezet. Echter, de website dient slechts voor informatieve doeleinden. Er kunnen geen rechten aan de informatie op de website worden ontleend en het gebruik van de website en de aangeboden informatie is voor uw eigen rekening en risico. Deltares aanvaart geen enkele vorm van aansprakelijkheid - uit welke hoofde dan ook - voor enige vorm van schade die op enigerlei wijze voortvloeit uit de werking van en/of het gebruik van (informatie op) de website. Deltares kan niet garanderen dat de website virusvrij is of zonder fouten en/of onderbrekingen zal functioneren. De website kan te allen tijde worden gewijzigd door Deltares. Op de website alsmede op deze voorwaarden is Nederlands recht van toepassing.
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
