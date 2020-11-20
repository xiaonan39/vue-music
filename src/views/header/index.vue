<!--  -->
<template>
  <div class="top">
      <div class="header_left">
          <div class="header_button">
            <i class="el-icon-s-home"></i>
            <i class="el-icon-remove"></i>
            <i class="el-icon-d-caret"></i>
          </div>
          <div class="header_router">
            <span >
              <i class="el-icon-arrow-left color-green"></i>
            </span>
            <span >
              <i class="el-icon-arrow-right color-green"></i>
            </span>
          </div>
      </div>
      <div class="header_right">
        lalalal
      </div>
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
<style lang="scss" scoped>
@import "@/style/index.scss";



.top{
  height:100%;
  width:100%;
  display: flex;
  justify-content: space-between;
}
.top i{
  height:15px;
  font-size: 15px;
  border-radius:15px;
  margin-left:15px; 
  cursor: pointer;
}
.header_left{
  margin:15px 0;
  display: flex;
  width: 12%;
  justify-content:space-between
}
.header_button{
  display: flex;
  transform: translateY(25%);//可以让它垂直居中
}

.header_button>:nth-child(1){
  background: $color_red;
}
.header_button>:nth-child(2){
  background: $color_yellow;
}
.header_button>:nth-child(3){
  background: $color_green;
}
.header_router{
  margin-right: 10%;
}

</style>