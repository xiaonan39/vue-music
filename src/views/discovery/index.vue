<!--  -->
<template>
  <div class="dis_wrap">
    <banner></banner>
    <playlist-card :image="list" :title="playlist_title"></playlist-card>
    <!-- <new-songs ></new-songs> -->
    <NewSongs :title="new_title"/>
  </div>
</template>

<script>
import Banner from '@/components/banner';
import PlaylistCard from "@/components/playlist-card";
import { getPersonalized } from "@/api";
import NewSongs from "./newsongs";
// import Imagvue from 'imagvue';

export default {
    name: "discovery",   
    data () {
      return {
        playlist_title:"最新歌单",
        new_title:"最新音乐",
        list:null,
      };
    },
    components: {
      Banner,
      PlaylistCard,
      NewSongs
    },
    computed: {
      
    },
    methods: {},
    mounted(){},
    async created(){
      const {result} = await getPersonalized({ limit: 10 })
      this.list = result;
    }
}

</script>
<style lang='scss' scoped>
  .dis_wrap{
    // background: red;
    overflow-y:auto; 
    
  }
</style>