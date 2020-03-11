import Home from "../Pages/Home/home.vue";
import VueRouter from "vue-router";
const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  }
];

export default new VueRouter({
  routes
});
