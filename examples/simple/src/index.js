import Vue from 'vue';
import Vuex from 'vuex'
import VueModal from '../../../index'
import storeConfig from './store'
import App from './App.vue';

Vue.use( Vuex )
Vue.use(VueModal)

const store = new Vuex.Store( storeConfig )

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});