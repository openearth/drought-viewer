import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import zomerTab from '../components/views/zomerTab';
import maandelijksTab from '../components/views/maandelijksTab';
import tijdreeksenTab from '../components/views/tijdreeksenTab';
import actueleTab from '../components/views/actueleTab';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/actuele'
  },
  {
    path: '/actuele',
    name: 'actuele',
    component: actueleTab
  },
  {
    path: '/zomer',
    name: 'zomer',
    component: zomerTab
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

];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  store.commit('mapbox/RESET_ALL');
  next();
});

export default router;
