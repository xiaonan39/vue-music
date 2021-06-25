
/* 
业务工具方法
有discover中的最新音乐中会用到createSong
 */
import { getAlbum, getMvDetail } from "@/api";
import router from "@/router";
import { isDef, notify } from "./common";

export function createSong(song) {
  const { id, name, img, artists, duration, albumId, albumName, mvId, ...rest } = song;
  return {
    id,
    name,
    img,
    artists,
    duration,
    albumName,
    url: genSongPlayUrl(song.id),
    artistsText: genArtistisText(artists),
    durationSecond: duration / 1000,
    // 专辑 如果需要额外请求封面的话需要加上
    albumId,
    // mv的id,如果有的话会在songTable组件中加上mv链接
    mvId,
    ...rest
  };
}

function genSongPlayUrl(id) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

export function genArtistisText(artists) {
  return (artists || []).map(({name}) => name).join("/");
}

export async function getSongImg(id, albumId) {
  if(!isDef(albumId)) { //throw抛出用户自定义异常，抛出的数据会被传递到调用堆栈中的第一个catch模块
    throw new Error("need albumId");
  }
  const { songs } = await getAlbum(albumId);
  const { al:{picUrl}} = songs.find(({id:songId}) => songId === id) || {};
  return picUrl;
}

/* 跳转mv */
export async function goMvWithCheck(id) {
  try{
    await getMvDetail(id);
    goMv(id);
  }
  catch(error){
    notify("mv获取失败");
  }
}

export function goMv(id) {
  router.push(`/mv/${id}`);
}