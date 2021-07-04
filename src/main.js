import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "lib-flexible";
import store from "./store";
import VueClipboard from "vue-clipboard2";

import pdSelect from "pd-select";
import VCharts from 'v-charts'
import VConsole from 'vconsole'

Vue.use(pdSelect);

Vue.use(VueClipboard);

Vue.use(VCharts)

Vue.config.productionTip = false;
new VConsole()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");



