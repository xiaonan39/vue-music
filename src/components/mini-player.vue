<!--  -->
<template>
  <div class="miniplayer">
    <div class="mini_song">
      <template v-if="hasCurrentSong">

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
      return isDef(this.currentSong.id);
    },
    audio() {
      return this.$refs.audio;
    }
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
    }
  },
  mounted () {},

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
    }
  },

  created () {}

}

</script>
<style lang='scss' scoped>
</style>