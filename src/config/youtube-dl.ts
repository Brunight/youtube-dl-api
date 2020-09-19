import YoutubeDlWrap from 'youtube-dl-wrap';

const youtubeDlBinPath = process.env.APP_SERVER_YOUTUBEDL_BIN_PATH;
export default new YoutubeDlWrap(youtubeDlBinPath);
