<!-- discover中的第三部分：最新歌曲,这个地方不用跳转，直接播放哈哈哈 


-->
<template>
  <div class="newsong">
    <span>{{ title }}</span>
    <div class="song_wrap">
      <!-- 服气，点击函数中传入的参数是第一个遍历的列的下标和该条在列中的下标 -->
      <div class="song_column" v-for="(column, listIndex) in songList" :key="listIndex">
        <div class="song_card" v-for="(item, itemIndex) in column" :key="item.id" @click="clickSong(listIndex,itemIndex)">
          <div class="song_Serial_wrap">
            <span class="song_Serial">{{order(listIndex, itemIndex)}}</span>
          </div>
          <div class="song_img_wrap">
            <img :src="$utils.genImgUrl(item.picUrl, 80)"/>
            <!-- <PlayIcon></PlayIcon> -->
          </div>
          <div class="song_text">
            <p class="song_name">{{ item.name }}</p>
            <p class="song_er">{{ item.song.artists[0].name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewSongs } from '@/api';
import {mapActions,mapMutations} from "@/store/helper/music";
import { createSong } from "@/utils"
export default {
  props: {
    title:{type:String,default:"音乐"}
  },
  data () {
    return {
      // column:Math.ceil(songsLimit / 2),
      songData: [],
      songLength: ''
    };
  },

  components: {},

  computed: {
    songList () {//songData是人家的list
      return [
        this.songData.slice(0, this.songLength),
        this.songData.slice(this.songLength, this.songData.length)
      ];
    },
    normalizedSongs() {
      return this.songData.map(song => this.nomalizeSong(song))
    }
  },
  methods: {
    getSongOrder(listIndex, index) { //是上方传入的该条的列的下标和在该列中的下标
      return listIndex * this.songLength + index + 1;
    },
    clickSong (item,index) {//两个参数应该是列的下标及在列中的下标()
      const nomalizedSongIndex = this.getSongOrder(item, index) - 1;
      const nomalizedSong = this.normalizedSongs[nomalizedSongIndex];
      console.log(nomalizedSong);
      console.log(this.normalizedSongs);
      this.startSong(nomalizedSong);
      this.setPlaylist(this.normalizedSongs);
    },
    order (index, itemIndex) {
      let order = index * this.songLength + itemIndex + 1;
      return this.$utils.pad(order); //序号
    },
    nomalizeSong(song) {//从utils中获取了些逻辑
      const {id,name,
      song:{mvid,artists,album:{blurPicUrl},duration}} = song;
      return createSong({id,name,img:blurPicUrl,artists,duration,mvId:mvid});
    },
    ...mapMutations(["setPlaylist"]),
    ...mapActions(['startSong'])
    /* startSong() {//用此方法会找不到actions中的startSong函数，貌似是因为命名空间的原因
      console.log("===============");
      this.$store.dispatch("startSong");
    } */
  },
  mounted () {

  },
  async created () {
    const { result } = await getNewSongs();
    // 为了和人家的不一样，特意改的……
    this.songData = result;
    this.songLength = Math.ceil(result.length / 2);
  }
};

</script>
<style lang='scss' scoped>
@import '@/style/index.scss';
.newsong {
  margin-top: 20px;
  > span {
    font-size: $font-xxxl;
  }
  .song_wrap {
    display: flex;
    .song_column {
      flex: 1;
    }
    .song_card {
      padding: 20px;
      display: flex;
      cursor: pointer;
      &:hover {
        background: $hover_bgcolor;
      }
      .song_Serial_wrap {
        display: flex;
        align-items: center;
        .song_Serial {
          padding-right: 20px;
        }
      }
      .song_img_wrap {
        margin-right: 20px;
      }
      .song_text {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
  }
}
</style>
