
import moment from 'moment';

const app_name = "Droogte Radar Deltares";

const tab1 = "Zomergrondwaterstanden";
const tab2 = "Maandelijkse grondwaterstanden";
const tab3 = "Tijdreeksen grondwaterstanden";
const tab4 = "Achtergrond informatie";

//agree on fixed date for the summer map
const items_tab1 = [
  { id: '1', name: 'Zomergrondwaterstand droog' , layer: 'summerLG3_Scenario_droog'},
  { id: '2', name: 'Zomergrondwaterstand gemiddeld' , layer: 'summerLG3_Scenario_median'},
  { id: '3', name: 'Zomergrondwaterstand nat' , layer: 'summerLG3_Scenario_nat'}
]
  ;

//year needs to come from current date
const months_tab2 = [
  {id: '4', name: "Scenario droog", layer: 'GWmonthly_Scenario_droog'},
  {id: '5', name: "Scenario gemiddeld", layer: 'GWmonthly_Scenario_median'},
  {id: '6', name: "Scenario nat", layer: 'GWmonthly_Scenario_nat'},

];

const items_tab3 = [

];

const items_tab4 = [
  { id: '25', name: 'Huidige kaart' , layer: 'LHMpost_GWverschil_Masked_Historical'}
];

export { app_name, tab1, tab2, tab3, tab4, items_tab1, items_tab3, items_tab4, months_tab2};
