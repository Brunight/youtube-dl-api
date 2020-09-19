import youtubeDlWrap from '../../config/youtube-dl';

export default async function getInfo(id: string): Promise<object> {
  /* const info = await youtubeDlWrap.getVideoInfo(
    `https://www.youtube.com/watch?v=${id}`,
  ); */

  const info = await youtubeDlWrap.execPromise([
    '-g',
    '-f',
    'bestaudio',
    `https://www.youtube.com/watch?v=${id}`,
  ]);

  console.log(info);

  return info;
}
