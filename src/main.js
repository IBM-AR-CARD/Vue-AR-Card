import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router/router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "./theme.scss";
import axios from "axios";
var VueCookie = require("vue-cookie");
Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(VueCookie);
const globalConfig = {
  baseUrl: "http://henryz.co:8080"
};

globalConfig.install = function() {
  Object.defineProperty(Vue.prototype, "$globalConfig", {
    get() {
      return globalConfig;
    }
  });
};

Vue.use(globalConfig);

const globalData = {
  userData: {}
};

globalData.install = function() {
  Object.defineProperty(Vue.prototype, "$globalData", {
    get() {
      return globalData;
    }
  });
};

Vue.use(globalData);

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  render: h => h(App),
  router: router
}).$mount("#app");
