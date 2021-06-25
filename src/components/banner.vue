<!--  -->
<template>
  <div class="banner">
    <!-- :interval="4000" 为走马灯的自动切换的时间间隔-->
    <!-- 样式最开始按照自己的想法写的，但是页面宽度缩小时图像有些失真，0624按照作者的来写，看着好多了，但是感觉还是有些失真 -->
    <el-carousel trigger="click"  type="card" :interval="4000" class="banner_wrap">
      <el-carousel-item v-for="(item,key) in banners" :key="key">
        <img :src="$utils.genImgUrl(item.imageUrl,1000,400)" class="banner_img"/>
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
.banner_wrap{//>>>作用于css？
  /deep/.el-carousel__container{
  height: 200px;
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
.banner_img{
  width: 100%;
  height: 100%;
}
}


</style>