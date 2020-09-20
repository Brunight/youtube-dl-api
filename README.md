# 🎈 About
This is a REST API for converting Youtube videos to mp3 files with metadata (tags) and album cover art using **youtube-dl** and **ffmpeg**. Please use alongside with [@brunight/youtube-dl-web](https://github.com/brunight/youtube-dl-web).

# 📝 Requirements
- Windows or Linux OS;
- NodeJS and NPM or Yarn;
- [youtube-dl](https://youtube-dl.org) ([Github](https://github.com/ytdl-org/youtube-dl));
- [ffmpeg 4.0+](https://ffmpeg.org) ([Github](https://github.com/ffmpeg/ffmpeg));

# 🛠 Installation
With npm do:
```bash
npm install
```
Or with yarn do:
```bash
yarn install
```

# ⚙ Configuration
You can set the directories where files will be generated and the path for youtube-dl and ffmpeg binaries with Environment Variables. Create a file named **.env** in project root and put there your configuration. For examples, check **.env.example**. If no temp directory is provided, it'll be created at project root.

# 🚀 Usage
To start with npm do:
```bash
npm run dev:server
```
Or with yarn do:
```bash
yarn dev:server
```
You really should use the React web interface recommended above with this API, directly accessing it can be troublesome at the time.

The API's main route is POST /youtube, with parameters:
- id: Youtube video id.
- title: Music title.
- artist: Music artist.
- album: Music album.
- comment: Music comment (usually original video's link).
- cover (optional): Url of album cover art.
- startTime (optional): Start time. Ex: 00:00:30.000.
- endTime (optional): End time. Ex: 00:04:30.000.
- duration (optional): End time - start time. Ex: 00:04:00.000.

If successful, filename will be returned:
```json
{
  "fileName": "Artist - Title.mp3"
}
```

You can also use POST /cover route to upload album cover art to server with parameter *cover*.

# 👨‍💻 Technologies
- TypeScript;
- Express;
- Multer;
- [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg);
- [youtube-dl-wrap](https://github.com/ghjbnm/youtube-dl-wrap);
- [ffmetadata](https://github.com/parshap/node-ffmetadata) (file metadata reading only);
- ESLint;
- Prettier;
- DotEnv;

# 📜 Planned features
Check in [@brunight/youtube-dl-web](https://github.com/brunight/youtube-dl-web#planned-features).

# 📃 License
MIT. Not recommended to use with copyrighted content. Developed by [Bruno Rodrigues](https://github.com/brunight/).
