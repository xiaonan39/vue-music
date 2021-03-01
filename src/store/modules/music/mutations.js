import {shallowEqual} from '@/utils';
export default{
  setCurrentSong(state,song) {
    state.CurrentSong = song;
  },
  setCurrentTime(state,time) {
    state.currentTime = time;
  },
  setPlayingState(state,playing) {
    state.playing = playing;
  },
  setPlayMode(state,mode) {
    state.playmode = mode; 
  },
  setPlaylistShow(state,show) {
    state.isPlayerShow = show;
  },
  setPlaylistPromptShow(state,show) {
    state.isPlaylistPromptShow = show;
  },
  setPlaylist(state,playlist) {
    const {isPlayerShow,playlist:oldPlaylist} = state;
    state.playlist = playlist;
    // 播放列表未显示，并且两次播放列表不一样则弹出提示
    if(!isPlaylistShow && !shallowEqual(oldPlaylist,playlist,'id')) {
      state.isPlaylistPromptShow = true;
      setTimeout(() =>{
        state.isPlaylistPromptShow = false
      },2000)
    }
  },
  setMenuShow(state,show) {
    state.isMenuShow = show;
  }
}