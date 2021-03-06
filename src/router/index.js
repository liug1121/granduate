import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";
import Register from "../views/register/Register.vue";
import Senior from "../views/senior/Senior.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/senior",
    name: "Senior",
    component: Senior
  }
];

const router = new VueRouter({
  routes
});

export default router;
