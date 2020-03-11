import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router/router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(VueRouter);
Vue.use(VueMaterial);
new Vue({
  render: h => h(App),
  router: router
}).$mount("#app");
