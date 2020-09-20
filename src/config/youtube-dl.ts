import os from 'os';
import { resolve } from 'path';
import YoutubeDlWrap from 'youtube-dl-wrap';

const ytdlBinPath = os.platform().includes('win')
  ? resolve(__dirname, '..', '..', 'bin', 'youtube-dl.exe')
  : process.env.APP_SERVER_YOUTUBEDL_BIN_PATH || '';

export default new YoutubeDlWrap(ytdlBinPath);
