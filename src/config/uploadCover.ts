import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';

export const tmpCoversFolder =
  process.env.APP_SERVER_TMP_COVERS_DIR ||
  resolve(__dirname, '..', '..', 'tmp', 'covers');

export default {
  directory: tmpCoversFolder,

  storage: multer.diskStorage({
    destination: tmpCoversFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}.jpg`.replace(' ', '_');

      return callback(null, fileName);
    },
  }),
};
