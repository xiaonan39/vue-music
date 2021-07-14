<!--  mv详情页（点击mv后进入的页面，有评论的）-->
<!-- 先判断mv详情的id是否存在；-->
<template>
  <div class="mvDetail" v-if="$utils.isDef(mvDetail.id)">
    <div class="mvDetail_Content">
      <div class="mvDetail_left">
        <p class="title">mv详情</p>
        <div class="mvDetail_player">
          <!-- 用的西瓜播放器 -->
          <VideoPlayer
            :url="mvPlayInfo.url"
            :poster="mvDetail.cover"
            ref="video"
          />
        </div>
        <!-- mv作者 -->
        <div class="mvDetail_author">
          <div>
            <img src="">
          </div>
          <p></p>
        </div>
        <!-- mv详细信息 -->
        <div class="mvDetail_desc">
          <p></p>
          <div></div>
        </div>
        
        <!-- 评论，暂未写 -->
        <div class="mvDetail_comment"></div>
      </div>

      <div class="mvDetail_right">
        <p class="title">相关推荐</p>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMvDetail, getMvUrl, getArtists, getSimiMv} from "@/api";
import { hideMenuMixin } from "@/utils";
import { mapMutations } from "@/store/helper/music";


export default {
  name: "mv",
  mixins: [hideMenuMixin],
  data () {
    return {
      mvDetail: {},
      mvPlayInfo: {},
      simiMvs: {},
      videoList: []
    };
  },
  props: {
    id: {type: Number,required: true}
  },
  computed: {},
  watch: {
    id: "init"
  },
  methods: {
    // 初始化请求数据
    async init() {
      // Promise返回的有三条数据，第一、二条主要的数据为data,第三条主要的是mvs
      const [{data: mvDetail}, {data: mvPlayInfo}, {mvs: simiMvs}] = await Promise.all([
        getMvDetail(this.id),
        getMvUrl(this.id),
        getSimiMv(this.id)
      ]);
      const { videoList } = await getArtists(mvDetail.artistId);
      this.mvDetail = mvDetail;
      this.mvPlayInfo = mvPlayInfo;
      this.videoList = videoList;
      this.simiMvs = simiMvs;

      /* 不写$nextTick的话会获取不到$refs*/
      this.$nextTick(() => {
        const player = this.$refs.video.Xgplayer;
        player.on("play", () => {
          // 停止播放歌曲
          this.setPlayingState(false);
        });
      });
    },
    ...mapMutations(["setPlayingState"]),
  },
  mounted () {},
  created() {
    this.init();
    // console.log(hideMenuMixin);
  }
};

</script>
<style lang='scss' scoped>
@import "@/style/index.scss";

.mvDetail_Content {
  display: flex;

  .title {
    font-size: $font-l;
    font-weight: $font_weight_l;
    margin-bottom: 16px;
  }
  .mvDetail_left {

  }

  .mvDetail_right {
    margin-left: 32px;

  }
}
</style>