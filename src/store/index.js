import Vue from "vue";
import Vuex from "vuex";
import globalModule from "./modules/global";
import userModal from "./modules/user";
import musicModule from "./modules/music";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global: globalModule,
    user: userModal,
    music:musicModule,
  }
});
