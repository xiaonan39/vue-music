<!--  -->
<template>
  <div class="user">
      <!-- 登录前 -->
      <User/>
      <div class="login-before">
          <i class="el-icon-user-solid"></i>
          <span>未登录</span>
      </div>
      <!-- 登陆后 -->
      <div class="login-after">

      </div>

      <!-- 登录框 -->
      
  </div>
</template>

<script>
import {menuRoutes} from '@/router';
import User from '@/components/user';

export default {
  props:{},
  data () {
    return {
        
    };
  },
  components: {
      User
  },

  computed: {},

  methods: {},
  mounted(){},
  created(){}
}

</script>
<style lang='scss' scoped>
@import '@/style/index.scss';

</style>