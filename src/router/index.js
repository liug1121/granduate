import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";
import Register from "../views/register/Register.vue";
import Senior from "../views/senior/Senior.vue";
import Bind from "../views/bigflow/Bind.vue";
import Position from "../views/position/Home.vue"
import Material from '../views/position/Material.vue'
import Monitor from '../views/position/Monitor.vue'
import Travel from '../views/position/Travel.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/position/Home",
    name: "Position",
    component: Position
  },
  {
    path: "/position/Material",
    name: "Material",
    component: Material
  },
  {
    path: "/position/Monitor",
    name: "Monitor",
    component: Monitor
  },
  {
    path: "/position/Travel",
    name: "Travel",
    component: Travel
  },
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
  },
  {
    path:"/bind",
    name:"Bind",
    component:Bind
  }
];

const router = new VueRouter({
  routes
});

export default router;
