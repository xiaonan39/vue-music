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
  props: {
    size: {type: Number, default: 24}
  },
  computed: {
    wrapStyle() {
      return {width: `${this.size}px`,height:`${this.size}px`};
    },
    iconSize() {
      const iconSize = this.size * 0.6;
      return iconSize;
    },
  },
};

</script>
<style lang='scss' scoped>
@import '@/style/index.scss';
.play-icon-wrap {
  @include flex_center();
  border-radius: 50%;
  @include colorWriteRgba;

  .play-icon {
    // 使用灰色显示的不明显
    color: $font_color_red;
  }
}

</style>