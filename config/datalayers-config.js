
const app_name = "Droogte Radar Deltares";
const tab1 = "Introductie";
const tab2 = "Zomergrondwaterstanden";
const tab3 = "Maandelijkse grondwaterstanden";
const tab4 = "Tijdreeksen grondwaterstanden";


const items_tab2 = [
      { id: 'Zomergrondwaterstand droog', name: 'Zomergrondwaterstand droog' , layer: 'scenario_DROOG_gwl_diff2ref_month01-2020-07-22T00:00:00Z', time_stamp: '2020-05-01T00:00:00.000Z'},
      { id: 'Zomergrondwaterstand gemiddeld', name: 'Zomergrondwaterstand gemiddeld' , layer: 'scenario_DROOG_gwl_diff2ref_month01-2020-07-22T00:00:00Z', time_stamp: '2020-06-01T00:00:00.000Z'},
      { id: 'Zomergrondwaterstand net', name: 'Zomergrondwaterstand net' , layer: 'scenario_DROOG_gwl_diff2ref_month01-2020-07-22T00:00:00Z', time_stamp: '2020-08-01T00:00:00.000Z'}
    ]
  ;

const items_tab3 = [
  { id: 'Scenario droog', name: 'Scenario droog' , layer: '', time_stamp: ''},
  { id: 'Scenario gemiddeld', name: 'Scenario gemiddeld' , layer: '', time_stamp: ''},
  { id: 'Scenario net', name: 'Scenario net' , layer: '', time_stamp: ''}
];

export { app_name, tab1, tab2, tab3, tab4, items_tab2, items_tab3 };
