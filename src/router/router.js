import login from "../Pages/login/Login";
import myCards from "../Pages/MyCards/MyCards";
import VueRouter from "vue-router";
const routes = [
  {
    path: "/",
    name: "login",
    component: login
  },
  {
    path: "/MyCards",
    name: "MyCards",
    component: myCards
  }
];

export default new VueRouter({
  routes
});
