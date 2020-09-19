import path from 'path';
import ffmpeg from 'fluent-ffmpeg';

import youtubeDlWrap from '../../config/youtube-dl';

import FileMetadata from '../../utils/FileMetadata';

interface AudioData extends FileMetadata {
  id: string;
}

async function download(data: AudioData): Promise<string> {
  console.log(`🔗 Getting stream link of '${data.id}'`);

  const rawFileDir = await youtubeDlWrap.execPromise([
    '-g',
    '-f',
    'bestaudio',
    `https://www.youtube.com/watch?v=${data.id}`,
  ]);

  const isManifest = rawFileDir.includes('manifest');

  console.log(
    `    Is manifest? ${
      isManifest
        ? 'Yes, slower but high quality'
        : 'No, faster but normal quality'
    }`,
  );

  const outputDir =
    process.env.APP_SERVER_FILES_DIR ||
    path.resolve(__dirname, '..', '..', '..', 'tmp');

  const outputFilename = `${data.artist}${data.artist && ' - '}${
    data.title
  }.mp3`.replace(/[/\\?%*:|"<>]/g, ' ');
  const outputPath = path.resolve(outputDir, outputFilename);

  console.log(`💾 Will be saved in '${outputPath}'`);

  const ffmpegBinPath = process.env.APP_SERVER_FFMPEG_BIN_PATH;
  if (ffmpegBinPath) {
    ffmpeg.setFfmpegPath(ffmpegBinPath);
  }

  const ffmpegCommand = ffmpeg()
    .input(rawFileDir.trim())
    .addOption(`-map 0:${isManifest ? 'a:2' : '0'}`)
    .videoCodec('copy')
    // .audioFrequency(44100)
    // .audioBitrate('192k')
    .audioFilters([
      'volume=1.0',
      'silenceremove=start_periods=1:start_duration=1:start_threshold=-60dB:detection=peak,aformat=dblp,areverse,silenceremove=start_periods=1:start_duration=1:start_threshold=-60dB:detection=peak,aformat=dblp,areverse',
    ])
    .format('mp3')
    .on('error', console.error)
    .addOutputOption('-metadata', `title=${data.title}`)
    .addOutputOption('-metadata', `artist=${data.artist}`)
    .addOutputOption('-metadata', `album=${data.album}`)
    .addOutputOption('-metadata', `comment=${data.comment}`)
    .output(outputPath);

  if (data.startTime) {
    ffmpegCommand.seekInput(data.startTime);
  }
  if (data.duration) {
    ffmpegCommand.setDuration(data.duration);
  }

  if (data.cover && data.cover !== '') {
    ffmpegCommand
      .addInput(data.cover)
      .addOption('-map 1:0')
      .addOutputOption('-metadata:s:v', 'title="Album cover"')
      .addOutputOption('-metadata:s:v', 'comment="Cover (front)"')
      .addOutputOption('-id3v2_version', '3');
  }

  ffmpegCommand.run();

  console.log(`💥 Processing has started!`);
  console.log(`📝 Data will be:`);
  console.log(`  🎵 Title: ${data.title}`);
  console.log(`  🎤 Artist: ${data.artist}`);
  console.log(`  💿 Album: ${data.album}`);
  console.log(`  💬 Comment: ${data.comment}`);
  console.log(`  🎨 Cover: ${data.cover}`);

  await new Promise(resolve => {
    ffmpegCommand.on('end', () => resolve());
  });

  console.log(`\n💽 Processing has finished!`);
  return outputFilename;
}

export default download;
