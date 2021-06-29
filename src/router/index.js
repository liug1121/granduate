import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";
import Register from "../views/register/Register.vue";
import Senior from "../views/senior/Senior.vue";
import Bind from "../views/bigflow/Bind.vue";
import PayRecord from "../views/bigflow/PayRecord.vue"
import UsageInfo from "../views/bigflow/UsageInfo.vue"
import UsageDetails from "../views/bigflow/UsageDetails.vue"
import Position from "../views/position/Home.vue"
import Material from '../views/position/Material.vue'
import Monitor from '../views/position/Monitor.vue'
import Travel from '../views/position/Travel.vue'
import Login from '../views/position/Login.vue'

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
    path: "/position/Login",
    name: "Login",
    component: Login
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
  },
  {
    path:"/payRecord",
    name:"PayRecord",
    component:PayRecord
  },
  {
    path:"/usageInfo",
    name:"UsageInfo",
    component:UsageInfo
  },
  {
    path:"/usageDetails",
    name:"UsageDetails",
    component:UsageDetails
  }
  
];

const router = new VueRouter({
  routes
});

export default router;
