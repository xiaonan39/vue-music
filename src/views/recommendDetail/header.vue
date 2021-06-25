<!-- 歌单详情的头部 -->
<template>
  <div class="recomm_header" v-if="recomm.id">
    <div class="recomm_header_wrap">
      <img  />
      <template>
        <p></p>
        <template>
          <img>
          <span></span>
          <span></span>
        </template>
        <div></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props:{
    recomm:{type:Object,default:() =>{}},
    songs:{type:Array,default:() =>{}}
  },
  components: {},

  computed: {},
  
  mounted () {},
  methods: {},
  created () {
  }

};

</script>
<style lang='scss' scoped>
</style>