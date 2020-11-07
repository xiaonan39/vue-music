import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Mv from "./views/mv";
import Music from "./views/music";
import Recommended from "./views/recommended/index";
import Discovery from "./views/discovery";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "discovery",
      component: Discovery
    },
    {
      path: "/mv",
      name: "mv",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/mv")
    },
    {
      path: "/",
      name: "recommended",
      component: Recommended
    },
    {
      path: "/",
      name: "music",
      component: Music
    },
  ]
});
