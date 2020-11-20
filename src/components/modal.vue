<!--  -->
<template>
  <el-dialog
    title=title
    :visible.sync="dialogVisible"
    width=width
    :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>

</template>

<script>
export default {
  props:{
    title:{type:String,default:"眉间雪"},
    width:{type:Number,default:"30%"}
  },
  data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    },
  mounted(){},
  created(){}
}

</script>
<style lang='scss' scoped>
@import "@/style/index.scss";

</style>