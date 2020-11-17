<!--  -->
<template>
  <div class="top">
      <div class="header_left">
          <div class="header_button">
              <div>
                <i class="el-icon-s-home"></i>
              </div>
              <div>
                <i class="el-icon-remove"></i>
              </div>
              <div>
                <i class="el-icon-s-home"></i>
              </div>
          </div>
      </div>
      <div class="header_right"></div>
  </div>
</template>

<script>
export default {
  name:"top",
  prop:{},
  data () {
    return {
    };
  },

  components: {},

  computed: {},


  methods: {},
  mounted(){},
  created(){}
}

</script>
<style lang='scss' scoped>
.top{
  height:100%;
  width:100%;
}
.header_left{
    height:100%;
    padding:15px 15px;
}
.header_button{
  height: 100%;
}
.header_button>div{
  width:5px;
  height:5px;
}
</style>