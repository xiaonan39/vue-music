<!--  -->
<template>
  <div class="newMv">
    <span>{{ title }}</span>
    <div class="newMv_wrap" v-if="mv">
      <div class="newMv_list" v-for="(item , index) in mv" :key="index">
        <div class="newMv_Video">
          <img :src="$utils.genImgUrl(item.picUrl,270,160)" />
        </div>
        <p class="newMv_name">{{ item.name }}</p>
        <p class="newMv_er">{{ item.artistName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonalizedMv } from "@/api";
export default {
  data () {
    return {
      mv: []
    };
  },
  props: {
    title:{type:String,defalut:"mv"}
  },
  components: {},

  computed: {},

  mounted () {},

  methods: {
    async getMv() {
      const { result } = await getPersonalizedMv();
      this.mv = result;
    }
  },

  created () {
    this.getMv();
  }

};

</script>
<style lang='scss' scoped>
@import '@/style/index.scss';
.newMv{
  margin-top: 20px;
  >span{
    font-size: $font-xxxl;
    padding: 10px 0;
    display: inline-block;
  }
  .newMv_wrap{
    display: flex;
    justify-content: space-between;
    .newMv_list{
      cursor: pointer;
      width: 24%;
      margin-bottom: 70px;
      // padding: 0 20px 70px;
      .newMv_Video{
        img{
          width: 100%;
        }
      }
      >p{
        margin-top: 10px;
      }
      >:last-child{
        color: $font_color;
      }
      .newMv_name{
        @include text-ellipsis;//单行显示，多行…
      }
    }
  }
}

</style>