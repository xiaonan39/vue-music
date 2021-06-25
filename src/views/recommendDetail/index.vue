<!-- 二级导航吧--歌单详情页面，有图片有表格，是原作者的playlist-detail -->
<template>
  <div  class="recomm" v-if="recomm.id">
    <DetailHeader ref="detailHeader" :recomm="recomm" :songs="songs" />
  </div>
</template>

<script>
import DetailHeader from "./header";
import {getListDetail} from "@/api";//获取详情的接口
export default {
  metaInfo(){
    console.log(this.recomm);
    return {title:this.recomm.name};
  },
  data () {
    return {
      recomm:{},
      songs:[],
    };
  },
  components: {
    DetailHeader
  },
  computed: {
    id() {//从地址栏获取的id
      return Number(this.$route.params.id);
    }
  },
  watch: {
    id: {  //卧槽优秀，居然不是在create中获取数据。因为id是个对象，因此handler会自执行(其实不懂)；
      handler() {
        this.init();
      },
      immediate: true,//暂不知有何用
    }
  },
  mounted () {},
  methods: {
    async init() {
      const { playlist } = await getListDetail({id:this.id});
      this.recomm = playlist;
      this.getSonglist(playlist);
    },
    getSonglist(playlist) {
      const trackId = playlist.trackIds.map(id => id);
      console.log(trackId);
    }
  },
  created () {}

};

</script>
<style lang='scss' scoped>
</style>