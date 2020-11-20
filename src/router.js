import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Mv from "./views/mv";
import Music from "./views/music";
import Recommended from "./views/recommended/index";
import Discovery from "./views/discovery";


Vue.use(Router);

export const menuRoutes=[
  {
    path: "/discovery",
    name: "discovery",
    component: Discovery,
    meta:{
      title:"发现音乐",
      icon:"discovery"
    }
  },
  {
    path: "/mv",
    name: "mv",
    component: Mv,
    meta:{
      title:"最新MV",
      icon:"mv"
    }
  },
  {
    path: "/recommended",
    name: "recommended",
    component: Recommended,
    meta:{
      title:"推荐歌单",
      icon:"recommended"
    }
  },
  {
    path: "/Music",
    name: "music",
    component: Music,
    meta:{
      title:"最新音乐",
      icon:"Music"
    }
  },
]
// 此处添加了路由后，下方的routes中就不必再添加了

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/discovery",
    },
    
    ...menuRoutes
  ]
});
