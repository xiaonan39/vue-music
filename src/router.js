import Vue from "vue";
import Router from "vue-router";
/* import Home from "./views/Home.vue";
import Mv from "./views/mv";
import Music from "./views/music";
import Recommended from "./views/recommended/index";
import Discovery from "./views/discovery"; */

// 下方的写法显示出来的是函数？
const Discovery = () =>import('@/views/discovery');
const Mv = () =>import('@/views/mv');
const Music = () => import('@/views/music');
const Recommended = () => import('@/views/recommended')
// import PlaylistDetail from "@/page"




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
  /* {  mmp这个地方获取不到component会导致页面的二级导航出不来
    path:'/playlist/:id',
    name:'playlist',
    // component:'PlaylistDetail',
  }, */
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
Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: '/',
      redirect: '/discovery',
    },
    {
      path: "/mv",
      name: "mv",
      component: Mv,
    },
    {
      path: "/recommended",
      name: "recommended",
      component: Recommended,
    },
    {
      path: "/Music",
      name: "music",
      component: Music,
    },
    ...menuRoutes
  ]
});
