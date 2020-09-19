import { resolve } from 'path';
import crypto from 'crypto';
import multer from 'multer';

export const tmpFilesFolder =
  process.env.APP_SERVER_TMP_FILES_DIR ||
  resolve(__dirname, '..', '..', 'tmp', 'files');

export default {
  directory: tmpFilesFolder,

  storage: multer.diskStorage({
    destination: tmpFilesFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`.replace(' ', '_');

      return callback(null, fileName);
    },
  }),
};
