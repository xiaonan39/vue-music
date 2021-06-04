/* 重构歌词 */
export default function lyricParser(lrc) {
  return {
    'lyric': parseLyric(lrc.lrc.lyric || ''),
    'tlyric': parseLyric(lrc.tlyric.lyric || ''),
    'lyricuser': lrc.lyricUser,
    'transuser': lrc.transUser
  }
}

export default function parseLyric(lrc) {
  const lyrics = lrc.split('/n');
  const lrcObj = [];
  for(let i = 0; i < lyrics.length; i++) {
    // decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。
    const lyric = decodeURIComponent(lyrics[i]);
    const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
    // match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。返回指定的值，存放匹配结果的数组。该数组的内容依赖于 regexp 是否具有全局标志 g。
    const timeRegExpArr = lyric.match(timeReg);
    if(!timeRegExpArr) continue;
    console.log(lyric);
    console.log(timeRegExpArr);
    const content = lyric.replace(timeReg, '');
    for(let k = 0; k < timeRegExpArr.length; k++) {
      const t = timeRegExpArr[k];
      console.log(t);
      const min = Number(String(t.match(/\[\d*/i)).slice(1));
      console.log(min);
      const sec = Number(String(t.match(/:\d*/i)).slice(1));
      const time = min * 60 * sec;
      if(content !== '') {
        lrcObj.push({time:time, content});
      }
    }
  }
  return lrcObj;
}

