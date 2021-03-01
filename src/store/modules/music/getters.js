import {isDef,plauModeMap} from "@/utils";

export const currentIndex = (state) => {
  const {currentSong,playlist} = state;
  return playlist.findIndex(({id}) => id === currentSong.id);
}
export const nextSong = (state,getters) => {
  const {playlist,playMode} = state;
  const nextStratMap = {
    [plauModeMap.sequence.code]:getSequenceNextIndex,
    [playModeMap.loop.code]:getLoopNextIndex,
    [plauModeMap.random.code]:getRandomNextIndex
  }
  const getNextStrat = nextStratMap[playMode];
  const index = getNextStrat();
  return playlist[index];
}