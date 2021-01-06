<!-- discover中的第三部分：最新歌曲 -->
<template>
  <div class="newsong">
    <span>{{title}}</span>
    <div class="song_wrap">
      <div class="song_column" v-for="(column,index) in songList" :key="index">
        <div class="newsong_card" v-for="(item,itemIndex) in column" :key="item.id">
          <span>{{order(index,itemIndex)}}</span>
          <div>
            <img />
            <!-- <PlayIcon></PlayIcon> -->
          </div>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getNewSongs} from '@/api';

export default {
  props:{
      title:{type:String,default:"音乐"}
  },
  data () {
    return {
      songData:[],
      songLength:''
    };
  },

  components: {},

  computed: {
    songList(){
      return [
        this.songData.slice(0,this.songLength),
        this.songData.slice(this.songLength,this.songData.length)
      ];

    },
    
  },
  methods: {
    songOrder(){
      return 
    },
    order(index,itemIndex){
      let order = index * this.songLength + itemIndex + 1;
      return this.$utils.pad(order);
    }
  },
  mounted(){},
  async created(){
    const {result} = await getNewSongs();
    this.songData = result;
    this.songLength = Math.ceil(result.length/2);
  }
}

</script>
<style lang='scss' scoped>
@import '@/style/index.scss';
.newsong{
    margin-top:20px; 
    .song_wrap{
      display: flex;
      .song_column{
        flex: 1;
      }
    }
}
</style>