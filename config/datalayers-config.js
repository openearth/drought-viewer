
const app_name = "Droogte Radar Deltares";

const tab1 = "Zomergrondwaterstanden";
const tab2 = "Maandelijkse grondwaterstanden";
const tab3 = "Tijdreeksen grondwaterstanden";
const tab4 = "Achtergrond informatie";

//agree on fixed date for the summer map
const items_tab1 = [
      { id: '1', name: 'Zomergrondwaterstand droog' , layer: 'monthly_scenario_droog', time_stamp: '2020-05-01T00:00:00.000Z'},
      { id: '2', name: 'Zomergrondwaterstand gemiddeld' , layer: 'monthly_scenario_gemiddeld', time_stamp: '2020-06-01T00:00:00.000Z'},
      { id: '3', name: 'Zomergrondwaterstand nat' , layer: 'monthly_scenario_nat', time_stamp: '2020-08-01T00:00:00.000Z'}
    ]
  ;

//year needs to come from current date
const available_months = ["April", "Mei", "Juni", "Juli", "Aug", "Sept"]
const months_tab2 = [
  {
    id: 1,
    name: 'Droog',
    children: [
      {id: '2', name: "April", layer: 'monthly_scenario_droog', time_stamp: '2020-04-01T00:00:00.000Z' },
      {id: '3', name: "Mei", layer: 'monthly_scenario_droog', time_stamp: '2020-05-01T00:00:00.000Z' },
      {id: '4', name: "Juni", layer: 'monthly_scenario_droog', time_stamp: '2020-06-01T00:00:00.000Z' },
      {id: '5', name: "Juli", layer: 'monthly_scenario_droog', time_stamp: '2020-07-01T00:00:00.000Z' },
      {id: '6', name: "Augustus", layer: 'monthly_scenario_droog', time_stamp: '2020-08-01T00:00:00.000Z' },
      {id: '7', name: "September", layer: 'monthly_scenario_droog', time_stamp: '2020-09-01T00:00:00.000Z' },
      // {id: '8', name: "Oktober", layer: 'monthly_scenario_droog', time_stamp: '2020-10-01T00:00:00.000Z' },
    ],
  },
  {
    id: 9,
    name:'Gemiddeld',
    children:[
      {id: '10', name: "April", layer: 'monthly_scenario_gemiddeld', time_stamp: '2020-04-01T00:00:00.000Z' },
      {id: '11', name: "Mei", layer: 'monthly_scenario_gemiddeld', time_stamp: '2020-05-01T00:00:00.000Z' },
      {id: '12', name: "Juni", layer: 'monthly_scenario_gemiddeld', time_stamp: '2020-06-01T00:00:00.000Z' },
      {id: '13', name: "Juli", layer:'monthly_scenario_gemiddeld', time_stamp: '2020-07-01T00:00:00.000Z' },
      {id: '14', name: "Augustus", layer: 'monthly_scenario_gemiddeld', time_stamp: '2020-08-01T00:00:00.000Z' },
      {id: '15', name: "September", layer: 'monthly_scenario_gemiddeld', time_stamp: '2020-09-01T00:00:00.000Z' },
      // {id: '16', name: "Oktober", layer: 'monthly_scenario_gemiddeld', time_stamp: '2020-10-01T00:00:00.000Z' },
    ]
  },
  {
    id: 17,
    name:'Nat',
    children:[
      {id: '18', name: "April", layer: 'monthly_scenario_nat', time_stamp: '2020-04-01T00:00:00.000Z' },
      {id: '19', name: "Mei", layer: 'monthly_scenario_nat', time_stamp: '2020-05-01T00:00:00.000Z' },
      {id: '20', name: "Juni", layer: 'monthly_scenario_nat', time_stamp: '2020-06-01T00:00:00.000Z' },
      {id: '21', name: "Juli", layer:'monthly_scenario_nat', time_stamp: '2020-07-01T00:00:00.000Z' },
      {id: '22', name: "Augustus", layer: 'monthly_scenario_nat', time_stamp: '2020-08-01T00:00:00.000Z' },
      {id: '23', name: "September", layer: 'monthly_scenario_nat', time_stamp: '2020-09-01T00:00:00.000Z' },
      // {id: '24', name: "Oktober", layer: 'monthly_scenario_nat', time_stamp: '2020-10-01T00:00:00.000Z' },
    ]
  }
];


const items_tab4 = [

];

export { app_name, tab1, tab2, tab3, tab4, items_tab1, items_tab4, months_tab2, available_months};
