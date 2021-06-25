export default {
  setUser(state, user) {    //此访问成功后会执行，返回的user是state中的user键；另外一个键是userPlaylist
    state.user = user;
  },
  setUserPlaylist(state, playlist) {
    state.userPlaylist = playlist;
  }
};
  