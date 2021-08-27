import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";
import Register from "../views/register/Register.vue";
import Senior from "../views/senior/Senior.vue";
import Bind from "../views/bigflow/Bind.vue";
import PayRecord from "../views/bigflow/PayRecord.vue";
import UsageInfo from "../views/bigflow/UsageInfo.vue";
import UsageDetails from "../views/bigflow/UsageDetails.vue";
import ToCertified from "../views/bigflow/ToCertified";
import Position from "../views/position/Home.vue";
import Material from "../views/position/Material.vue";
import Monitor from "../views/position/Monitor.vue";
import Travel from "../views/position/Travel.vue";
import Login from "../views/position/Login.vue";

import { Const } from "@/common"
import store from '../store'
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
    path: "/h5/bind",
    name: "Bind",
    component: Bind
  },
  {
    path: "/h5/payRecord",
    name: "PayRecord",
    component: PayRecord
  },
  {
    path: "/h5/usageInfo",
    name: "UsageInfo",
    component: UsageInfo
  },
  {
    path: "/h5/usageDetails",
    name: "UsageDetails",
    component: UsageDetails
  },
  {
    path: "/h5/toCertified",
    name: "ToCertified",
    component: ToCertified
  }
];

const router = new VueRouter({
  routes
});

export default router;

function rgetUrlParam(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}
router.beforeEach((to,from,next)=>{
  let code = rgetUrlParam("code");
  console.log('code:' + code)
  if (!code) {
    let local = window.location.href;
    console.log('local:' + local)
    let appid = Const.wechatAppId
    console.log('appId:' + appid)
    window.location.href =
      `https://open.weixin.qq.com/connect/oauth2/authorize?appid=` +
      appid +
      `&redirect_uri=${encodeURIComponent(
        local
      )}&response_type=code&scope=snsapi_base&state=1#wechat_redirect`;
  } else {
    if(store.state.user.token == ''){
      store.dispatch("user/login", code).then(response => {
            if(response.data.resultCode == 0){
              next();
              console.log('登录成功')
            }
      }, error => {
        console.log('登录失败'+ error)
      });
    }else{
      next();
    }
  }
})

// router.beforeEach((to,from,next)=>{
//   console.log(to.path)
//   console.log('token:' + store.state.positionUser.token)
//   if(store.state.positionUser.token != null || to.path === '/position/Login'){
//     next()
//   }else{
//     next({
//       path:'/position/Login'
//     })
//   }
// })
