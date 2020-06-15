import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router/router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "./theme.scss";
import axios from "axios";
import VueCookies from "vue-cookies";
Vue.prototype.$http = axios;
Vue.use(VueRouter);
Vue.use(VueMaterial);
Vue.use(VueCookies);
const globalConfig = {
  baseUrl: "https://ibm-ar-card.herokuapp.com",
};

globalConfig.install = function() {
  Object.defineProperty(Vue.prototype, "$globalConfig", {
    get() {
      return globalConfig;
    },
  });
};

Vue.use(globalConfig);

const globalData = {
  userData: {},
  modalList: [
    "ManInSuit",
    "BusinessWomanPFB",
    "TestMale",
    "Luffy",
    "FitFemale",
    "Jiraiya",
    "YodaRigged",
    "BusinessMale",
    "BusinessFemale",
    "SmartMale",
    "UnityChan",
    "SmartFemale",
  ],
};

globalData.install = function() {
  Object.defineProperty(Vue.prototype, "$globalData", {
    get() {
      return globalData;
    },
  });
};

Vue.use(globalData);

Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount("#app");
