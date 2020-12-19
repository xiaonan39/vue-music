<!-- discover中的第三部分：最新歌曲 -->
<template>
  <div class="newsong">
    <span>{{title}}</span>
    <div class="newsong_card">
      <span></span>
      <div>
        <img />
        <!-- <PlayIcon></PlayIcon> -->
      </div>
      <div>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
      title:{type:String,default:"音乐"}
  },
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
@import '@/style/index.scss';
.newsong{
    margin-top:20px; 
}
</style>