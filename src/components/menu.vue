<!--  -->
<template>
  <div class="menu">
    <user></user>
    <div class="menu_wrap">
      <div class="menu_block" v-for="(menu,index) in menuList" :key="index">
        <p class="menu_title" v-if="menu.title">{{ menu.title }}</p>
        <ul class="menu_list">
          <router-link
            v-for="(item , key) in menu.children"
            :key="key"
            :to="item.path"
            tag="li"
            class="menu_item"
          >
            <span>{{item.meta.title}}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/* import Mv from "@/views/mv";
import Music from "@/views/music";
import Recommended from "@/views/recommended";
import Discovery from "@/views/discovery"; */
import User from "@/components/user"; //在com中注册时首字母大写，但是在标签中用时不必大写
import { menuRoutes } from "@/router";
import {
  mapState as mapUserState,
  mapGetters as mapUserGetters
} from "@/store/helper/user";
export default {
  name: "ch-menu",
  data () {
    return {
      menus: [{ type: "root", children: menuRoutes }]
    };
  },
  components: { User },
  computed: {
    menuList () {
      return this.isLogin && this.userMenus.length
        ? this.menus.concat(this.userMenus)
        : this.menus
    },
    ...mapUserState(["userPlaylist"]),
    ...mapUserGetters(["isLogin", "userMenus"])
  },
  mounted () {},
  methods: {},
  created () {
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/index.scss";
.menu {
  font-size: $icon-xl;
  overflow: auto;
  .menu_wrap {
    overflow: hidden;
    // overflow-y: auto;
    .menu_list {
      .menu_item {
        padding: 12px 18px 12px 35px;
        cursor: pointer;
        &:hover {
          background: $menu_item_hover_bg;
          color: $color_red;
        }
        &:active {
          //是选中时的状态
          background: $menu_item_active_bg;
        }
      }
    }
  }
}
</style>