import login from "../Pages/login/Login";
import VueRouter from "vue-router";
const routes = [
  {
    path: "/",
    name: "login",
    component: login
  }
];

export default new VueRouter({
  routes
});
