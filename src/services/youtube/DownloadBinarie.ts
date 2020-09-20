import os from 'os';
import fs from 'fs';
import { resolve } from 'path';
import YoutubeDlWrap from 'youtube-dl-wrap';

export default async (): Promise<void> => {
  if (os.platform().includes('win')) {
    const fileName = 'youtube-dl.exe';
    const youtubeDlBinPath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'bin',
      fileName,
    );
    if (!fs.existsSync(youtubeDlBinPath)) {
      await fs.promises.mkdir(resolve(__dirname, '..', '..', '..', 'bin'));
      console.log('Downloading youtube-dl binarie for Windows...');
      await YoutubeDlWrap.downloadYoutubeDl(youtubeDlBinPath);
      console.log('Download finished!');
    }
  }
};
