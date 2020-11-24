<!--  -->
<template>
  <div class="dis_wrap">
    <banner></banner>
  </div>
</template>

<script>
import Banner from '@/components/banner';

export default {
    name: "discovery",   
    data () {
        return {
        };
    },
    components: {
      Banner
    },
    computed: {},
    mounted(){},
    methods: {}
}

</script>
<style lang='scss' scoped>
  .dis_wrap{
    background: red;
    
  }
</style>