/* 可以控制左侧边栏及底部播放器的显示与否 */

import store from "@/store";

export const hideMenuMixin = {
  created() {
    store.commit("music/setMenuShow",false);
  },
  beforeDestory() {
    store.commit("music/setMenuShow",true);
  }
};

export const hideMiniPlayerMixin = {
  created() {
    store.commit("music/setMiniPlayerShow",false);
  },
  beforeDestory() {
    store.commit("music/setMiniPlayerShow",true);
  }
};