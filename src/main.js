import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload);
Vue.config.productionTip = false;
fastclick.attach(document.body);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});

// document.body.style.fontSize = document.body.clientWidth/375*100 + 'px';