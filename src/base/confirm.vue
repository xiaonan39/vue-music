<template>
  <el-dialog
    :modal="false"
    :visible.sync="visible"
    :width="width"
    class="confirm-dialog"
  >
    <div slot="title">{{ title || "提示" }}</div>
    <div class="comfirm-body">{{ text }}</div>
    <span slot="footer">
      <el-button @click="confirmClose" type="primary"> 确认 </el-button>
    </span>
  </el-dialog>
</template>

<script>
import Vue from "vue";
const Confirm = {
  name: "Confirm",
  props: ["visible", "text", "title", "onConfirm"],
  methods: {
    confirmClose() {
      //下边这种语句搞不太懂啊
      console.log("此处报错？");
      this.onConfirm && this.onConfirm();
      this.visible = false;
    },
  },
};
export default Confirm;

// 单例减少开销   --虽然听不懂
let instanceCache;
// 命令式调用；  这种写法不太明白啊  0122日出错了，因为onConfirm写成了confirm,但不知道为何走了这；
export const confirm = function (text, title, onConfirm = () => {}) {
  if (typeof title === "function") {
    onConfirm = title;
    title = undefined;
  }
  const ConfirmCtor = Vue.extend(Confirm);
  const getInstance = () => {
    if (!instanceCache) {
      instanceCache = new ConfirmCtor({
        propsData: {
          text,
          title,
          onConfirm,
        },
      });
      // 生成dom,因为是extend生成的，而不是我们平时常写的组件实例，所以不可以通过 new Vue({ components: testExtend }) 来直接使用，需要通过 new Profile().$mount('#mount-point') 来挂载到指定的元素上。
      instanceCache.$mount();
      document.body.appendChild(instanceCache.$el);
    } else {
      // 更新属性
      instanceCache.text = text;
      instanceCache.title = title;
      instanceCache.onConfirm = onConfirm;
    }
    return instanceCache;
  };
  const instance = getInstance();
  // 确保更新的prop渲染到dom;
  // 确保动画效果
  Vue.nextTick(() => {
    instance.visible = true;
  });
};
</script>
<style lang="scss" scoped>
.confirm-dialog {
  /deep/.el-dialog__body {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .confirm-body {
    line-height: 20px;
  }
  .confirm-btn {
    width: 100%;
  }
}
</style>