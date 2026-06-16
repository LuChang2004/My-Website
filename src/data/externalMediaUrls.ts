/**
 * 视频外链配置
 *
 * 支持 B 站页面链接（bilibili.com/video/BV...）或 CDN 直链（https://...mp4）。
 * 留空则回退到 public/ 下的本地文件（开发环境可用，大文件需外链才能部署）。
 */
export const externalVideoUrls = {
  stylingInspirationBook: {
    /** Styling Inspiration Book 展示视频 */
    display: 'https://www.bilibili.com/video/BV1xejg6mE6G/',
  },
  solarSpecial: {
    start: 'https://www.bilibili.com/video/BV1aHjg6dEjv/',
    dayOff: 'https://www.bilibili.com/video/BV1QWjg6sEgc/',
    envelop: 'https://www.bilibili.com/video/BV1hWjg6sEhU/',
    solidStation: 'https://www.bilibili.com/video/BV1aHjg6dEnm/',
    liquidArea: 'https://www.bilibili.com/video/BV1aHjg6dEVi/',
    gasStation: 'https://www.bilibili.com/video/BV1xejg6mEqc/',
  },
} as const;

export function pickVideoSrc(externalUrl: string, localPath: string): string {
  return externalUrl || localPath;
}
