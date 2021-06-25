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
            active-class="menu_item_active"
          >
            <span class="item_title">{{item.meta.title}}</span>
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
        : this.menus;
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
  // width: 250px;
  font-size: $icon-l;
  overflow: auto;
  .menu_wrap {
    overflow: hidden;
    // overflow-y: auto;
    .menu_title {
      padding: 12px 18px 12px 35px;
      font-size: $icon-m;
      color: $font_color_grey2;
    }
    .menu_list {
      .menu_item {
        padding: 12px 18px 12px 35px;
        cursor: pointer;
        &:hover {
          background: $menu_item_hover_bg;
          color: $color_red;
        }
        &-active {
          //是选中时的状态
          color: $color_red;
          background: $menu_item_active_bg;
        }
        .item_title {
          font-size: $font-xs;
          @include text-ellipsis;
        }
      }
    }
  }
}
</style>