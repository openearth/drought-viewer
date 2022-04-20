
import moment from 'moment';

const app_name = "Droogteradar - grondwaterprognoses";

const zomerTab = "Zomergrondwaterstanden";
const maandelijksTab = "Maandelijkse grondwaterstanden";
const tijdreeksenTab = "Tijdreeksen grondwaterstanden";
const actueleTab = "Actuele grondwaterstanden";
const achtergrondinformatie = "Achtergrondinformatie";

//agree on fixed date for the summer map
const items_zomerTab = [
  { id: '1', name: 'Zomergrondwaterstand droog' , layer: 'summerLG3_Scenario_droog'},
  { id: '2', name: 'Zomergrondwaterstand gemiddeld' , layer: 'summerLG3_Scenario_median'},
  { id: '3', name: 'Zomergrondwaterstand nat' , layer: 'summerLG3_Scenario_nat'}
]
  ;

//year needs to come from current date
const months_maandelijksTab = [
  {id: '4', name: "Scenario droog", layer: 'GWmonthly_Scenario_droog'},
  {id: '5', name: "Scenario gemiddeld", layer: 'GWmonthly_Scenario_median'},
  {id: '6', name: "Scenario nat", layer: 'GWmonthly_Scenario_nat'},

];
//TODO: tab_3 and tab_4 will show the same map.the external historical one. 
const items_tijdreeksenTab = [
  { id: '25', name: 'Huidige kaart' , layer: 'GWmonthly_ExternalHistorical'}
];

const items_actueleTab = [
  { id: '25', name: 'Huidige kaart' , layer: 'GWmonthly_ExternalHistorical'}
];

export { app_name, zomerTab, maandelijksTab, tijdreeksenTab, actueleTab, items_zomerTab, items_tijdreeksenTab, items_actueleTab, months_maandelijksTab, achtergrondinformatie};
