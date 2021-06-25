<!-- 页面中播放图标浮窗 -->
<template>
  <div
    :style="wrapStyle"
    class="play-icon-wrap"
  >
    <Icon
      :size="iconSize"
      class="play-icon"
      type="play"></Icon>
  </div>
</template>

<script>
export default {
  // name记得写，newmv中一开始没找到该部分
  name:"PlayIcon",
  data () {
    return {
      
    };
  },
  props: {
    size: {type: Number, default: 24}
  },
  components: {},

  computed: {
    wrapStyle() {
      return {width: `${this.size}px`,height:`${this.size}px`};
    },
    iconSize() {
      const iconSize = this.size * 0.6;
      return iconSize;
    },
  },

  mounted () {},

  methods: {},

  created () {
  }

};

</script>
<style lang='scss' scoped>
@import '@/style/index.scss';
.play-icon-wrap {
  @include flex_center();
  border-radius: 50%;
  @include colorWriteRgba;

  .play-icon {
    color: $theme_color;
  }
}

</style>