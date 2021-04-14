<template>
  <legal-dialog
     :title="title"
     :body="body"
     :buttonText="buttonText"
     :checkboxes="checkboxes"
     storage="session"
  />
</template>

<script>
import { LegalDialog } from '@deltares/vue-components';

export default {
  components: {
    LegalDialog
  },
  data: () => ({
    title: "Disclaimer",
    body: `
De website is met de grootst mogelijke zorgvuldigheid opgezet. Echter, de website dient slechts voor informatieve doeleinden.
Er kunnen geen rechten aan de informatie op de website worden ontleend en het gebruik van de website en de aangeboden informatie is voor uw eigen rekening en risico.
Deltares aanvaart geen enkele vorm van aansprakelijkheid - uit welke hoofde dan ook - voor enige vorm van schade die op enigerlei wijze voortvloeit uit de werking van en/of het gebruik van (informatie op) de website.
Deltares kan niet garanderen dat de website virusvrij is of zonder fouten en/of onderbrekingen zal functioneren.
De website kan te allen tijde worden gewijzigd door Deltares.
Op de website alsmede op deze voorwaarden is Nederlands recht van toepassing.
    `,
    buttonText: 'Doorgaan',
    checkboxes: ['Ik heb de disclaimer gelezen en ga ermee akkoord']
  }),
};
</script>
