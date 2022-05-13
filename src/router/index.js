import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';



import actueleTab from '../components/views/actueleTab'; 
import achtergrondinformatie from '../components/views/achtergrondinformatie';
import maandelijksTab from '../components/views/maandelijksTab';
import tijdreeksenTab from '../components/views/tijdreeksenTab';
import zomerTab from '../components/views/zomerTab';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/actuele',
    component: actueleTab
  },
  {
    path: '/achtergrondinformatie',
    name: 'achtergrondinformatie',
    component: achtergrondinformatie
  },
  {
    path: '/actuele',
    name: 'actuele',
    component: actueleTab
  },
  {
    path: '/maandelijks',
    name: 'maandelijks',
    component: maandelijksTab
  },
  {
    path: '/tijdreeksen',
    name: 'tijdreeksen',
    component: tijdreeksenTab
  },
  {
    path: '/zomer',
    name: 'zomer',
    component: zomerTab
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  store.commit('mapbox/RESET_ALL');
  next();
});

export default router;
