<template>
<!-- 歌曲详情 -->
<!-- 控制歌曲详情页的有底部的图像，header中的折叠按钮。 -->
  <div v-if="hasCurrentSong && isPlayerShow" class="player">
    <div class="player_content">
      <div class="player_top">
        <div class="player_top_left"><!--模仿唱片的图像 -->
          <img src="@/assets/play-bar-support.png" />
          <img src="@/assets/play-bar.png"  :class="{playing}" />
          <div class="img_outer"
            :class="{paused: !playing}">
            <div class="img_wrap">
              <!-- 人家写的是v-lazy但是咱没弄 -->
              <img :src="$utils.genImgUrl(currentSong.img, 400)"/>
            </div>
          </div>
        </div>
        <div class="player_top_right">
          <div class="song_info">
            <div class="song_info_desc">
              <h2>{{currentSong.name}}</h2>
              <span>MV</span>
            </div>
            <dl>
              <dt>歌手：</dt>
              <dd>{{currentSong.artistsText}}</dd>
              <!-- <dt>所属专辑：</dt>
              <dd>{{}}</dd>网易云有专辑，但是没在信息里边找到啊 -->
            </dl>
          </div>
          <div v-if="nolyric">还没有歌词哦~</div>
          <Scroller class="song_lyric"
            v-else
            :data="lyric"
            :options="{disableTouch: true}"
            >
            <div
              :class="activeClass(index)"
              class="song_lyric_item"
              ref="lyric"
              v-for="(item,index) in lyricWithTranslation"
              :key="index">
              <p
                v-for="(content,contentIndex) in item.contents"
                :key="contentIndex"
                class="lyric_text">
                {{content}}
              </p>
            </div>
          </Scroller>
        </div>
      </div>
      <div class="player_bottom">

      </div>
    </div>
  </div>
</template>

<script>
/* scroll.vue在global中全局注册了 */
import { getLyric, getSimiSongs, getSimiPlaylists } from "@/api";
import { mapState, mapMutations, mapActions, mapGetters } from "@/store/helper/music"
export default {
  data() {
    return {
      lyric:[],
      nolyric: false
    }
  },
  props: {

  },
  components: {

  },
  computed: {
    ...mapGetters(["hasCurrentSong"]),
    ...mapState(["currentSong", "currentTime", "playing", "isPlayerShow"]),
    lyricWithTranslation() {

    }
  },
  watch: {
    isPlayerShow(show) {
      if(show) {
        // return true
      }
    },
    currentSong() {
      console.log(this.currentSong);
    }
  },
  methods: {
    async updateSong() {
      this.updateLyric();
      // this.updateSimi();
    },
    async updateLyric() {//getLyric是api中获取歌词的接口
      const result = await getLyric(this.currentSong.id);
      this.nolyric = !isDef(result.lrc) || !result.lrc.lyric;
      if(!this.nolyric) {
        console.log(result);
        const {lyric, tlyric} = lyricParser(result);
        this.lyric = lyric;
        this.tlyric = tlyric;
      }
    },
    onInitScroller(scroll) {

    }
  },
  mounted() {
    console.log(this.currentSong);
  },
  created() {

  }

}
</script>

<style lang="scss" scoped>
@import '@/style/index.scss';
dt {
  float: left;
  min-width: 4rem;
  text-align: left;
  padding-right: 16px;
  clear: both;
  color: $font_color_grey;
}

dd {
  margin-left: 5rem;
  background-color: #fff;
  margin-bottom: 0.75rem;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(1turn);
  }
}
$img_outer_border: 320px;

.player {
  background: $player_detail_back;
  position: fixed;
  top:$header-height;
  bottom: $footer-height;
  left: 0;
  right: 0;
  overflow: hidden;
  overflow-y: auto;
  // margin: 0 100px;
  .player_content {
    max-width: 870px;
    height: 100%;
    margin: auto;
    background: $player_detail_content_back;

    .player_top {
      display: flex;

      .player_top_left {
        flex: 2;
        position: relative;
        $support-d: 30px;
        $support_d_half: $support-d/2;
        >:first-child {
          position: absolute;
          top:-$support-d-half;
          left: $img_outer_border/2;
          width: $support-d;
          height: $support-d;
        }
        >:nth-child(2) {
          position: absolute;
          top:0;
          left: $img_outer_border/2+15px;
          width: 100px;
          height: 100px;
          transform-origin: 0 0;
          transform: rotate(-20deg);
          transform: all 0.3s;
          // &代表上一级选择器
          &.playing {
            transform: rotate(0deg);
          }
          z-index: 1;
        }
        
        .img_outer {
          /* linear-gradient()：
            函数用于创建一个表示两种或多种颜色线性渐变的图片。创建一个线性渐变，需要指定两种颜色，还可以实现不同方向（指定为一个角度）的渐变效果，如果不指定方向，默认从上到下渐变。 
          */
          width: 300px;
          height: 300px;
          border-radius: 50%;
          display: flex;
          // 下方三行代码让两个圆合并在一起了
          flex-direction: row;
          align-items: center;
          justify-content: center;
          margin: 30px 0 0 20px;
          background: linear-gradient(-45deg, #333540, #070708, #333540);
          /* animation 属性是一个简写属性，用于设置六个动画属性：
            animation-name:规定需要绑定到选择器的 keyframe 名称
            animation-duration:规定完成动画所花费的时间，以秒或毫秒计。
            animation-timing-function:规定动画的速度曲线
            animation-delay:规定在动画开始之前的延迟。
            animation-iteration-count:规定动画应该播放的次数。
            animation-direction:规定是否应该轮流反向播放动画。 
            请始终规定 animation-duration 属性，否则时长为 0，就不会播放动画了。*/
          animation: rotate 20s linear infinite;
          // animation-play-state:paused|running 属性规定动画正在运行还是暂停。
          &.paused{
            animation-play-state: paused;
          }
          .img_wrap {
            @include img-wrap(200px);
            img {
              border-radius: 50%;
            }
          }
        }
      }
      .player_top_right {
        flex: 3;
        margin: 30px;

        .song_info {
          .song_info_desc {
            display: flex;
            margin-bottom: 16px;
            >:nth-child(2) {
              border: 1px solid red;
              padding:3px 2px;
              margin-left:10px;
            }
            
          }
        }

        .song_lyric {

        }
      }
    }
  }
}

</style>
