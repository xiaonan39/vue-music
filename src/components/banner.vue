<!--  -->
<template>
  <div class="banner">
    <el-carousel trigger="click"  type="card">
      <el-carousel-item v-for="(item,key) in banners" :key="key">
        <img :src="item.imageUrl" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getBanner } from "@/api";
export default {
  data () {
    return {
      banners: []
    };
  },
  async created () {
    const { banners } = await getBanner();
    this.banners = banners;
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/index.scss";
.banner{
  // height: 200px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>