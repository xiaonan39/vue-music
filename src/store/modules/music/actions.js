import storage from "good-storage";
import {PLAY_HISTORY_KEY,getSongImg} from "@/utils";

export default{
  // 整合歌曲信息并且开始播放
  async startSong({commit,state},rawSong) {
    // 浅拷贝一份改变引用
    // 不污染原数据
    // 单曲循环为了触发watch
    const song = Object.assign({},rawSong);//assign方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象;应该是浅拷贝
    if(!song.img) {
      if(song.albumId) {//getSongImg返回的是picUrl
        song.img = await getSongImg(song.id,song.albumId);
      }
    }
    commit("setCurrentSong",song);
    commit("setPlayingState",true);
    // 历史记录
    const {playHistory} = state;//slice抽取当前数组中的一段元素组合成一个新数组。
    const playHistoryCopy = playHistory.slice();
    const findedIndex = playHistoryCopy.findIndex(({id}) => song.id === id);
    if(findedIndex !== -1) {
      // 删除旧那一项，插入到最前面
      playHistoryCopy.splice(findedIndex,1);
    }
    playHistoryCopy.unshift(song);
    commit("setPlayHistory",playHistoryCopy);
    storage.set(PLAY_HISTORY_KEY,playHistoryCopy);
  },
  clearCurrentSong({commit}){
    commit("setCurrentSong",{});
    commit("setPlayingState");
    commit("setCurrentTime",0);
  },
  clearPlaylist({commit,dispatch}) {
    commit("setPlaylist",[]);
    dispatch("clearCurrentSong");
  },
  clearHistory({commit}){
    const history = [];
    commit("setPlayHistory",history);
    storage.set(PLAY_HISTORY_KEY,history);
  },
  addToPlaylist({commit,state},song) {
    const{playlist} = state;//slice抽取当前数组中的一段元素组合成一个新数
    const copy = playlist.slice();
    if(!copy.find(({id}) => id === song.id)) {//find找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。
      copy.unshift(song); //unshift在数组的开头增加一个或多个元素，并返回数组的新长度。
      commit("setPlaylist",copy);
    } 
  }
};