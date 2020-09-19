import 'dotenv/config';
import path, { resolve } from 'path';
import cors from 'cors';
import express, { Request, Response } from 'express';
import multer from 'multer';

import uploadMusicConfig, { tmpFilesFolder } from './config/uploadMusic';
import uploadCoverConfig, { tmpCoversFolder } from './config/uploadCover';
import downloadAudio from './services/youtube/DownloadAudio';
import getInfo from './services/youtube/GetInfo';
import readFileMetadata from './services/ReadFileMetadata';

const app = express();

app.use(cors());

app.use(express.json());

const musicDir =
  process.env.APP_SERVER_FILES_DIR || path.resolve(__dirname, '..', 'tmp');

app.use('/tmp', express.static(tmpFilesFolder));
app.use('/musics', express.static(musicDir));
app.use('/covers', express.static(tmpCoversFolder));

const uploadMusic = multer(uploadMusicConfig);
const uploadCover = multer(uploadCoverConfig);

app.post(
  '/music',
  uploadMusic.single('music'),
  async (request: Request, response: Response) => {
    const details = await readFileMetadata(
      resolve(tmpFilesFolder),
      request.file.filename,
    );

    return response.json(details);
  },
);

app.post(
  '/cover',
  uploadCover.single('cover'),
  (request: Request, response: Response) =>
    response.json({
      filename: request.file.filename,
      url: `http://localhost:3333/covers/${request.file.filename}`,
    }),
);

app.post('/youtube', async (request: Request, response: Response) => {
  const {
    id,
    title,
    artist,
    album,
    cover,
    comment,
    startTime,
    endTime,
    duration,
  } = request.body;
  const videoData = {
    id,
    title,
    artist,
    album,
    cover,
    comment,
    startTime,
    endTime,
    duration,
  };

  const fileName = await downloadAudio(videoData);
  return response.json({ fileName });
});

app.get('/info', async (request: Request, response: Response) => {
  const { id } = request.query;

  const info = await getInfo(id);
  return response.json(info);
});

app.post('/shutdown', async (request: Request, response: Response) => {
  response.json({ message: 'Ok' });
  return process.exit();
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
