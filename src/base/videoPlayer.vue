<!-- 视频播放器 -->
<template>
  <div ref="player">

  </div>
</template>

<script>
import Xgplayer from "xgplayer";
export default {
  name: "VideoPlayer",
  data () {
    return {
    };
  },
  props: [
    "url","poster"],
  computed: {},
  methods: {
    initPlayer() {
      if(!this.url) return;
      this.Xgplayer = new Xgplayer({
        el: this.$refs.player,
        url: this.url,
        poster: this.poster,
        videoInit: true,
        lang: "zh-cn",
        width: "100%",
      });
    }
  },
  mounted() {
    this.initPlayer();
  },
  created () {
  }

};

</script>
<style lang='scss' scoped>


</style>