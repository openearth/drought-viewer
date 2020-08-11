import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Tab1 from '@/views/Tab1';
import Tab2 from '@/views/Tab2';
import Tab3 from '@/views/Tab3';
import Tab4 from '@/views/Tab4';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/intro'
  },
  {
    path: '/intro',
    name: 'intro',
    component: Tab1
  },
  {
    path: '/zommer',
    name: 'zommer',
    component: Tab2
  },
  {
    path: '/maandelijk',
    name: 'maandelijk',
    component: Tab3
  },
  {
    path: '/tijdreeksen',
    name: 'tijdreeksen',
    component: Tab4
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
