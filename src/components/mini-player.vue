<!-- 底部的播放组件 -->
<template>
  <div class="miniplayer">
    <!-- 底部的歌曲内容 -->
    <div class="mini_song">
      <template v-if="hasCurrentSong">
        <!-- 别的地方点击了歌曲后该部分就会显示出来 -->
        <div @click="togglePlayerShow" class="img_wrap">
          <!-- 蒙层，现未用。网易云本身貌似也没用 -->
          <!-- <div class="mask"></div> -->
          <!-- v-lazy懒加载插件0520并未下载 -->
          <img :src="$utils.genImgUrl(currentSong.img,80)" />
        </div>
        <div class="mini_song_content">
          <p>
            <span>{{currentSong.name}}</span>
            <span>-</span>
            <span>{{currentSong.artistsText}}</span>
          </p>
          <p>
            <span>{{$utils.formatTime(currentTime)}}</span>
            <span>/</span>
            <span>{{$utils.formatTime(currentSong.duration / 1000)}}</span>
          </p>
        </div>
      </template>
    </div>
    <div class="mini_control">
      <!-- 更改代码保存后页面的歌曲会暂停，但是图标还是播放的状态，不过用户应该不会有该体验 -->
      <div class="mini_control_wrap">
        <span>
          <i class="fa fas fa-step-backward"></i>
        </span>
        <span @click="switchVontrol">
          <!-- <i v-if="!flagControl" class="fa fas fa-play-circle"></i>
          <i v-else class="fa fas fa-pause-circle"></i> -->
          <i :class="['fa', 'fas',flagControl ? 'fa-pause-circle' : 'fa-play-circle']"></i>
        </span>
        <span>
          <i class="fa fas fa-step-forward"></i>
        </span>
      </div>
    </div>
    <div class="mini_mode">
      <div></div>
    </div>
    <div class="mini_progress"></div>

    <!-- 下方的是进度条, 当浏览器能够开始播放指定的音频/视频时，发生 canplay 事件-->
    <audio ref="audio"
      :src="currentSong.url"
      @canplay="startSong"
      ></audio>
  </div>
</template>

<script>
import { mapState, mapGetters,mapActions,mapMutations} from "@/store/helper/music";
import {VOLUME_KEY, playModeMap, isDef} from "@/utils";
export default {
  data () {
    return {
      songReady:false,
      volume: 0.2
    };
  },
  components: {},
  computed: {
    hasCurrentSong() {//应该是控制歌词页显示的
      return isDef(this.currentSong.id);
    },
    audio() {
      return this.$refs.audio;
    },
    flagControl() {
      return this.playing ? true : false;
    },
    
    ...mapState([
      "currentSong",
      "currentTime",
      "playing",
      "playMode",
      "isPlaylistShow",
      "isPlaylistPromptShow",
      "isPlayerShow"
    ]),
    ...mapGetters(["nextSong","prevSong"]),
    /* prevSong() {//这种方法无效，可能和命名空间有关系
      return this.$store.getters.prevSong;
    } */
  },
  watch: {
    currentSong(newSong, oldSong){  //是template中传入的参数吗？
      if(!newSong.id) { //是清空了歌曲？
        this.audio.pause();
        this.audio.currentTime = 0;
        return;
      }
      if(oldSong && newSong.id === oldSong.id) {//单曲循环
        this.setCurrentTime(0);  //触发的mutation中的？
        this.audio.currentTime = 0;
        this.play();//methods中的事件
        return;
      }
      this.songReady = false;
      if(this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(()=> {
        this.play();
      },1000);
    },
    playing(newPlaying) {//控制暂停或播放的
      this.$nextTick(() => {
        newPlaying ? this.play() : this.pause();
      });
    }
  },
  methods: {
    async play() {
      if(this.songReady) {
        try {
          await this.audio.play();
          if(this.isPlayErrorPromptShow) {
            this.isPlayErrorPromptShow = false;
          }
        }
        catch(error) {
          // 提示用户手动播放
          this.isPlayErrorPromptShow = true;
          this.setPlayingState(false);
        }
      }
    },
    startSong() {
      this.songReady =  true;
    },
    togglePlayerShow() {
      this.setPlayerShow(!this.isPlayerShow);
    },
    switchVontrol() {//点击播放按钮时的事件,不宜在下方如此更改图标，会报“Computed property "XXX" was assigned to but it has no setter”的错误
      // this.flagControl = !this.flagControl;
      if(!this.currentSong.id) {
        return;
      }
      this.setPlayingState(!this.playing);
    },
    pause() {//暂停
      this.audio.pause();
    },
    ...mapMutations(["setPlayerShow","setCurrentTime","setPlayingState","setPlayMode","setPlaylistShow"])
  },
  mounted () {
    this.audio.volume = this.volume;
  },
  created () {
  }

};

</script>
<style lang='scss' scoped>
@import '@/style/index.scss';

.miniplayer {
  position: relative;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding:8px 16px;

  .mini_song {
    display: flex;
    flex: 2;
    overflow: hidden;
    .img_wrap {
      position: relative;
      cursor: pointer;
      border-radius: 6px;
      height: 100%;
      .mask {
        @include abs-stretch;
        background: rgba(0, 0, 0, 0.5);
      }
      img {
        height: 100%;
      }
    }
    .mini_song_content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size:12px;
      >p:first-child span,p:nth-child(2){
        margin-left: 10px;
      }
      >p:first-child span:first-child{
        color: #fff;
        font-size: 16px;
      }
      >p :nth-child(3) {
        font-size:12px;
      }
    }
  }

  .mini_control {
    position: absolute;
    width: 200px;
    top:0;
    left: 50%;
    color: white;
    flex: 1;
    transform: translateX(-50%);
    .mini_control_wrap {
      display: flex;
      font-size: 1.5rem;
      height: 100%;
      margin: 0 2rem;
      line-height: 5.5rem;
      :nth-of-type(2) {
        font-size: 3.5rem;
        flex: 1;
        text-align: center;
      }
    }
  }

  .mini_modo {
    flex: 2;
  }
}

</style>