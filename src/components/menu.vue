<!--  -->
<template>
  <div>
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
    
</style>