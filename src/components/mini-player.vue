<!-- 底部的播放组件 -->
<template>
  <div class="miniplayer">
    <!-- 歌曲内容 -->
    <div class="mini_song">
      <template v-if="hasCurrentSong">
        <!-- 盲猜是点击歌曲图像可以出现歌曲的详细信息页面 -->
        <div @click="togglePlayerShow" class="img_wrap">
          <!-- 遮罩层？ -->
          <div class="mask"></div>
          <img v-lazy="$utils.genImgUrl(currentSong.img,80)" />
        </div>
      </template>
    </div>
    <div class="mini_control"></div>
    <div class="mini_mode"></div>
    <div class="mini_progress"></div>
    <audio ref="audio" ></audio>
  </div>
</template>

<script>
import { mapState, mapGetters,mapActions,mapMutations} from "@/store/helper/music";
import {VOLUME_KEY, playModeMap, isDef} from "@/utils";
export default {
  data () {
    return {
      songReady:false
    };
  },
  components: {},
  computed: {
    hasCurrentSong() {
      console.log(this.currentSong);
      return isDef(this.currentSong.id);
    },
    audio() {
      return this.$refs.audio;
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
      console.log("有吗有吗");
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
      },1000)
    },
    playing(newPlaying) {
      this.$nextTick(() => {
        newPlaying ? this.play() : this.pause();
      })
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
    togglePlayerShow() {
      this.setPlayerShow(!this.isPlayerShow);
    },
    ...mapMutations(["setPlayerShow","setCurrentTime","setPlayingState","setPlayMode","setPlaylistShow"])
  },
  mounted () {},
  created () {}

}

</script>
<style lang='scss' scoped>
</style>