<!-- 播放图标悬浮按钮中的图标

字符串模板的代替方案。该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。

如果组件是一个函数组件，渲染函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息。

Vue 选项中的 render 函数若存在，则 Vue 构造函数不会从 template 选项或通过 el 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。-->


<script>
import { toRem } from "@/utils";
export default {
  name:"Icon",
  data () {
    return {
    };
  },
  props: {
    size: {type: Number, default: 16},
    // 可以使用required选项来声明这个参数是否必须传入。
    type: {type: String, required: true},
    color: {type: String, default: ""},
    backdrop: {type: Boolean, default: false}
  },

  methods: {
    getIconCls() {
      let oClass = `icon-${this.type}`;
      if(this.color) {
        oClass += `icon-color-${this.color}`;
      }
      return oClass;
    },
    onClick(e) {
      this.$emit("click",e);
    },
    getIconStyle() {
      const chromeMinSize = 12;
      const getStyle = { fontSize: toRem(this.size)};
      if(this.size < chromeMinSize) {
        const radio = this.size / chromeMinSize;
        getStyle.transform = `scale(${radio})`;
      }
    }
  },

  render() {
    const Icon = (<i onclick={this.onClick} class={`iconfont icon-component ${this.getIconCls()}`}  style={this.getIconStyle()}></i>);
    // backdrop猜测是白色的圆形的遮罩层
    if(this.backdrop) {
      const backDropSizeRatio = 1.56;
      const backDropSize = toRem(backDropSizeRatio * this.size);
      return (<span style={{width: backDropSize, height: backDropSize}} class="backdrop">{Icon}</span>);
    }
    return Icon;
  },
};

</script>
<style lang='scss' scoped>
@import '@/style/index.scss';

.backdrop {
  @include flex_center;
  border-radius: 50%;

  .icon-component {
    cursor: pointer;
  }

  .icon-color {
    // 通过props传入的字段可以使用默认的颜色
    &-theme {
      color: $theme_color;
    }
    &-white {
      color: $font_color_write;
    }
    &-grey {
      color: $font_color_grey;
    }
  }
}

</style>