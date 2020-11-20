<!--  -->
<template>
  <div class="menu">
    <router-link to="/discovery">Discovery</router-link>
    <router-link to="/recommended">Recommended</router-link>
    <router-link to="/music">Music</router-link>
    <router-link to="/mv">Mv</router-link>
  </div>
</template>

<script>
import Mv from "@/views/mv";
import Music from "@/views/music";
import Recommended from "@/views/recommended";
import Discovery from "@/views/discovery";
export default {
    name:"ch-menu",
    data () {
      return {
        menu:[{type:"root",children:menuRoutes}]
      };
    },

    components: {Mv,Music,Recommended,Discovery},

    computed: {},

    mounted(){},

    methods: {}
}

</script>
<style lang='scss' scoped>
@import "@/style/index.scss";
.menu{
  display: flex;
  flex-direction: column;
  font-size: $icon-xxl;
  margin: 15px 20px 0;
}
.menu>a{
  
}
    
</style>