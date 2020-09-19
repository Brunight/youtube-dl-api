import path from 'path';
import ffmetadata from 'ffmetadata';

import FileMetadata from '../utils/FileMetadata';

export default async function readFileMetadata(
  dir: string,
  filename: string,
): Promise<FileMetadata> {
  const filePath = path.resolve(dir, filename);
  const coverPath = path.resolve(dir, 'covers', `${filename}.jpeg`);

  const read = new Promise((resolve, refuse) => {
    ffmetadata.read(filePath, function (err, data) {
      if (err) refuse(err);
      else resolve(data);
    });
  });

  const { title, artist, album, comment } = (await read) as FileMetadata;

  const cover = (await new Promise((resolve, refuse) => {
    ffmetadata.read(filePath, { coverPath }, function (err, data) {
      if (err) resolve('');
      else {
        resolve(coverPath);
      }
    });
  })) as string;

  const metadata = {
    title: title || '',
    artist: artist || '',
    album: album || '',
    comment: comment || '',
    cover,
  };

  return metadata;
}
