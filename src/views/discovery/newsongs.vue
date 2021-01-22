<!-- discover中的第三部分：最新歌曲,这个地方不用跳转，直接播放哈哈哈 -->
<template>
  <div class="newsong">
    <span>{{ title }}</span>
    <div class="song_wrap">
      <div class="song_column" v-for="(column, index) in songList" :key="index">
        <div class="song_card" v-for="(item, itemIndex) in column" :key="item.id" @click="clickSong(item,itemIndex)">
          <div class="song_Serial_wrap">
            <span class="song_Serial">{{order(index, itemIndex)}}</span>
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

export default {
  props: {
    title:{type:String,default:"音乐"}
  },
  data () {
    return {
      songData: [],
      songLength: ''
    };
  },

  components: {},

  computed: {
    songList () {
      return [
        this.songData.slice(0, this.songLength),
        this.songData.slice(this.songLength, this.songData.length)
      ];
    },
  },
  methods: {
    getSongOrder(listIndex, index) {
      return listIndex * this.column + index + 1;
    },
    clickSong (item,index) {
      console.log(item);
      const nomalizedSongIndex = this.getSongOrder(item, index) - 1;
      console.log(nomalizedSongIndex);
      const nomalizedSong = this.normalizedSongs[nomalizedSongIndex];
      this.startSong(nomalizedSong);
    },
    // ...mapActions(["startSong"]),
    order (index, itemIndex) {
      let order = index * this.songLength + itemIndex + 1;
      return this.$utils.pad(order); //序号
    }
  },
  mounted () {

  },
  async created () {
    const { result } = await getNewSongs();
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
