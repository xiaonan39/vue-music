<!--  -->
<template>
  <div class="user">
    <!-- 登录前 -->
    <div class="login_before" @click="openModal" v-if="!isLogin">
      <i class="el-icon-user-solid"></i>
      <span>未登录</span>
    </div>
    <!-- 登陆后 -->
    <div class="login_after" v-else @click="onLogout">
      <img :src="user.avatarUrl" />
      <span>{{ user.nickname }}</span>
    </div>

    <!-- 登录框 -->
    <el-dialog
      :title="title"
      :modal="false"
      :visible.sync="visible"
      width="20%"
      :before-close="handleClose"
    >
      <el-input placeholder="请输入您的网易云id" v-model="uid" />
      <div class="login_help">
        <!--  target不添加_blank时会从-->
        <p>
          1、请<a href="http://music.163.com" target="_blank"
            >点我(http://music.163.com)</a
          >打开网易云音乐官网
        </p>
        <p>2、点击页面右上角的“登录”</p>
        <p>3、点击您的头像，进入我的主页</p>
        <p class="help">
          4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onLogin(uid)" class="login_btn"
          >确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  mapActions as mapUserActions,
  mapState as mapUserState,
  mapGetters as mapUserGetters,
} from "@/store/helper/user";
import Chmodal from "./modal";
import storage from "good-storage";
import { UID_KEY, isDef } from "@/utils";

export default {
  name: "user",
  props: {},
  data() {
    return {
      title: "登录",
      visible: false,
      uid: "",
      loading: false,
    };
  },
  components: {
    Chmodal,
  },
  computed: {
    ...mapUserState(["user"]), //此应该是获取的user的数据
    ...mapUserGetters(["isLogin"]),
  },
  watch: {},
  methods: {
    openModal() {
      this.visible = true;
    },
    handleClose(done) {
      done();
    },
    async onLogin(uid) {
      this.visible = true;
      const success = await this.login(uid).finally(() => {
        this.loading = false;
      });
      if (success) {
        this.closeModal();
      }
    },
    closeModal() {
      this.visible = false;
    },
    onLogout() {},
    ...mapUserActions(["login", "logout"]), //此触发的是store中的user中的actions.js中的login
  },
  mounted() {},
  created() {
    //自动登录
    const uid = storage.get(UID_KEY);
    if (isDef(uid)) {
      this.onLogin(uid);
    }
  },
};
</script>
<style lang='scss' scoped>
@import "@/style/index.scss";
.user {
  margin: 20px 15px 0;
  padding-bottom: 15px;
  height: 60px;
  .login_before {
    padding: 20px;
    cursor: pointer;
    font-size: $font-xxl;
  }
  .login_btn {
    width: 100%;
  }
  .login_help {
    font-size: $font-l;
  }
  .login_after {
    height: 100%;
    display: flex;
    cursor: pointer;
    img {
      height: 100%;
      border-radius: 50px;
    }
    span {
      // align-items: center
      margin-left: 10px;
      line-height: 60px;
    }
  }
}
</style>