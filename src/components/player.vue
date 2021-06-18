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
          <Scroller 
            class="song_lyric"
            v-else
            :data="lyric"
            :options="{disableTouch: true}"
            ref="scroller"
            @init="initScroller"
          >
          <!-- 子元素中需要包一个div，否则会报：The wrapper need at least one child element to be content element to scroll -->
            <div>
              <!-- 不写activeClass的话歌词是全部出现在一块的 -->
              <div
                :class="activeClass(index)"
                class="song_lyric_item"
                ref="lyric"
                v-for="(item,index) in lyricWithTranslation"
                :key="index"
              >
                <p
                  v-for="(content,contentIndex) in item.contents"
                  :key="contentIndex"
                  class="lyric_text">
                  {{content}}
                </p>
              </div>
            </div>
          </Scroller>
        </div>
      </div>
      <!-- 下方的是评论 -->
      <div class="player_bottom">

      </div>
    </div>
  </div>
</template>

<script>
/* scroll.vue在global中全局注册了 */
import { getLyric, getSimiSongs, getSimiPlaylists } from "@/api";
import { mapState, mapMutations, mapActions, mapGetters } from "@/store/helper/music";
import {isDef } from "@/utils";
import lyricParser from "@/utils/lrcParse";

const WHEEL_TYPE = "wheel";
const SCROLL_TYPE = "scroll";
const AUTO_SCROLL_RECOVER_TIME = 1000;

export default {
  data() {
    return {
      lyric:[],
      nolyric: false
    };
  },
  props: {

  },
  components: {

  },
  computed: {
    ...mapGetters(["hasCurrentSong"]),
    ...mapState(["currentSong", "currentTime", "playing", "isPlayerShow"]),
    // 歌词内容吧？
    lyricWithTranslation() {
      let arr = [];
      // 空内容去除,this.lyric为包含众多对象的一个数组，每个子对象中有两个字段：content和time;
      const lyricFilter = this.lyric.filter(({content}) =>  Boolean(content));
      if(lyricFilter.length) {//正常是总的这个
        lyricFilter.forEach(lyr => {
          const {time,content} = lyr;
          const lyricItem = {time,content,contents:[content]};
          const sameTimeLyric = this.tlyric.find(({time:tLyricTime}) => {
            tLyricTime === time;
          });
          // 如果存在时间一样的
          if(sameTimeLyric) {
            const {content:tLyricContent} = sameTimeLyric;
            if(content) {
              lyricItem.contents.push(tLyricContent);
            }
          }
          arr.push(lyricItem);
        });
      }
      else {
        arr = lyricFilter.map(({time,content}) => 
          ({time,content,contents:[content]})
        );
      }
      return arr;
    },
    // 每行歌词的下标
    activeLyricIndex() {
      console.log(this.lyricWithTranslation);
      return this.lyricWithTranslation ? this.lyricWithTranslation.findIndex((item,index) => {
        const nextLyric = this.lyricWithTranslation[index +1];
        return (this.currentTime >= item.time && (nextLyric ? this.currentTime < nextLyric.time : true));
      }) : -1;
    }
  },
  watch: {
    isPlayerShow(show) {
      if(show) {
        // return true
      }
    },
    currentSong(newSong,oldSong) {
      if(!newSong.id) {
        this.setPlayerShow(false);
        return;
      }
      if(newSong.id === oldSong.id) {
        return;
      }
      // 如果歌曲详情显示状态切歌，需要拉取歌曲相关信息
      if(this.isPlayerShow) {
        this.updateSong();
      }
      else {//否则只更新歌词
        this.updateLyric();
      }
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
        const {lyric, tlyric} = lyricParser(result);
        this.lyric = lyric;
        this.tlyric = tlyric;
      }
    },
    initScroller(scroll) {//歌词滚动
      const scrollStart = type => {
        this.clearTimer(type);
        this.lyricScrolling[type] = true;
      };
      const scrollEnd = type => {
        /* 说的是滚动结束后两秒，歌词开始自动滚动
        之前每行歌词中的time属性值赋值错误，导致歌词初始化时字体加粗错误 */
        this.clearTimer(type);
        this.lyricTimer[type] = setTimeout(() => {
          this.lyricScrolling[type] = false;
        },AUTO_SCROLL_RECOVER_TIME);
      };
      /* mousewheelStart/mousewheelMove/mousewheelEnd都是BetterScroll中的事件，scrollStart倒没找到*/
      scroll.on("scrollStart",scrollStart.bind(null,SCROLL_TYPE));
      scroll.on("mousewheelStart",scrollStart.bind(null,WHEEL_TYPE));
      scroll.on("scrollEnd",scrollEnd.bind(null,SCROLL_TYPE));
      scroll.on("mousewheelEnd",scrollEnd.bind(null,WHEEL_TYPE));
    },
    clearTimer(type) {
      this.lyricTimer[type] && clearTimeout(this.lyricTimer[type]);
    },

    activeClass(index) {
      console.log(index);
      console.log(this.activeLyricIndex);
      return this.activeLyricIndex === index ? "active" : "";
    },
    ...mapMutations(["setPlayerShow"])
  },
  mounted() {
    console.log(this.currentSong);
  },
  created() {
    this.lyricScrolling = {
      [WHEEL_TYPE]: false,
      [SCROLL_TYPE]: false
    };
    this.lyricTimer = {
      [WHEEL_TYPE]: null,
      [SCROLL_TYPE]: null
    };
  }

};
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
              // padding:3px 2px;
              margin-left:10px;
              line-height: 26px;
            }
            
          }
        }

/*mask-image CSS属性用于设置元素上遮罩层的图像。 
linear-gradient() 函数用于创建一个表示两种或多种颜色线性渐变的图片。创建一个线性渐变，需要指定两种颜色，还可以实现不同方向（指定为一个角度）的渐变效果，如果不指定方向，默认从上到下渐变。 
hsla() 函数使用色相、饱和度、亮度、透明度来定义颜色。
HSLA 即色相、饱和度、亮度、透明度（英语：Hue, Saturation, Lightness, Alpha ）。1、色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色、黄色等。2、饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取 0-100% 的数值。3、亮度（L） 取 0-100%，增加亮度，颜色会向白色变化；减少亮度，颜色会向黑色变化。4、透明度（A） 取值 0~1 之间， 代表透明度。*/
        .song_lyric {
          width:380px;
          height: 350px;
          // 切记linear-gradient是mask-image中的值，而非background
          mask-image: linear-gradient(180deg,
          hsla(0, 0%, 100%, 0) 0,
          hsla(0, 0%, 100%, 0.6) 15%,
          #fff 25%,
          #fff 75%,
          hsla(0, 0%, 100%, 0.6) 85%,
          hsla(0, 0%, 100%, 0)
          );
          .song_lyric_item {
            margin-bottom: 16px;
            font-size: $font-xxs;

            &.active {
              font-size: $font-l;
              color: $font_color_black;
              font-weight: 700;
            }
            .lyric_text {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
  }
}

</style>