<template>
  <div class="scroller"
    ref="scroller">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ScrollBar from "@better-scroll/scroll-bar";//是否开启滚动条：fade为true表示当滚动停止的时候滚动条是否需要渐隐，interactive 表示滚动条是否可以交互。
import MouseWheel from "@better-scroll/mouse-wheel";//开启鼠标滚轮，上方两者皆需单独下载。但0604尚未下载，却能引用BScroll?  两者皆需被use
BScroll.use(MouseWheel);
BScroll.use(ScrollBar);


const defaultOptions = {
  mouseWheel: true,
  scrollY: true,
  scrollbar: true,
  probeType: 3
}
export default {
  name: "Scroller",
  props: {
    data: {default: () => []},
    options: {type: Object,default: ()=>({})}
  },
  methods: {
    getScroller() {
      return this.scroller;
    },
    refresh() {
      this.scroller.refresh();
    }
  },
  watch: {
    data: {
      handler() {
        this.$nextTick(() => {
          if(!this.scroller) {
            this.scroller = new BScroll(
              this.$refs.scroller,
              Object.assign({},defaultOptions,this.options)
            );
          this.$emit("init", this.scroller);
          }
          else {
            this.scroller && this.scroller.refresh();
          }
        })
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.scroller {
  position: relative;
  overflow: hidden;
  height: 100%;

  .bscroll-indicator {
    border: none !important;
  }
}
</style>
