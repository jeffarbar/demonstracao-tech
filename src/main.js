import Vue from 'vue'
import router from './router'

import BootstrapVue from "bootstrap-vue"

import App from './App'

import Default from './Layout/Wrappers/baseLayout.vue';
import Pages from './Layout/Wrappers/pagesLayout.vue';

import Notifications from 'vue-notification'

import VueExcelEditor from 'vue-excel-editor'
import money from 'v-money'

import VueMask from 'v-mask';

import Storage from 'vue-web-storage'; 


Vue.use(Storage); 

Vue.use(VueMask);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(Notifications)

Vue.use(VueExcelEditor)
Vue.use(money, {precision: 4})

Vue.component('default-layout', Default);
Vue.component('userpages-layout', Pages);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
