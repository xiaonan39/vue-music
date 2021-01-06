<!--  -->
<template>
  <!-- <div class="ch_modal"> -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :width="width"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <p v-if="data">{{data}}</p>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  <!-- </div> -->

</template>

<script>
export default {
  name:"Chmodal",
  props:{
    title:{type:String,default:"眉间雪"},
    width:{type:String,default:"30%"},
  },
  data () {
      return {
        dialogVisible: false
      };
    },
  computed:{
    data () {
      console.log(this.dialogVisible);
      return this.dialogVisible;
    }
  },
  watch:{
    data () {
      console.log(this.dialogVisible);
      return this.dialogVisible;
    }
  },
  methods: {
      handleClose(done) {
        // this.$emit('dialogVisible')
      }
    },
  mounted () {},
  created () {
    console.log("有引用尼玛"+this.dialogVisible);
  }
}

</script>
<style lang='scss' scoped>
@import "@/style/index.scss";

</style>