
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
  // {
  //   id: 1,
  //   name: 'Leaf Area Index',
  //   children: [
  //     { id: 'LAI00000_01', name:'LAI00000 01', layer: 'rhine:LAI00000_01' },
  //     { id: 'LAI00000_02', name:'LAI00000 02', layer: 'rhine:LAI00000_02' },
  //     { id: 'LAI00000_03', name:'LAI00000 03', layer: 'rhine:LAI00000_03' },
  //     { id: 'LAI00000_04', name:'LAI00000 04', layer: 'rhine:LAI00000_04' },
  //     { id: 'LAI00000_05', name:'LAI00000 05', layer: 'rhine:LAI00000_05' },
  //     { id: 'LAI00000_06', name:'LAI00000 06', layer: 'rhine:LAI00000_06' },
  //     { id: 'LAI00000_07', name:'LAI00000 07', layer: 'rhine:LAI00000_08' },
  //     { id: 'LAI00000_09', name:'LAI00000 09', layer: 'rhine:LAI00000_09' },
  //     { id: 'LAI00000_10', name:'LAI00000 10', layer: 'rhine:LAI00000_10' },
  //     { id: 'LAI00000_11', name:'LAI00000 11', layer: 'rhine:LAI00000_11' },
  //     { id: 'LAI00000_12', name:'LAI00000 12', layer: 'rhine:LAI00000_12' },
  //   ],
  // }
];

export { app_name, tab1, tab2, tab3, tab4, items_tab2, items_tab3 };
