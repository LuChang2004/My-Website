const BILIBILI_BV_RE = /\/video\/(BV[a-zA-Z0-9]+)/i;
const BILIBILI_HOST_RE = /bilibili\.com/i;

export function isBilibiliVideoUrl(url: string): boolean {
  return BILIBILI_HOST_RE.test(url) && (BILIBILI_BV_RE.test(url) || /\/video\/av\d+/i.test(url));
}

export function getBilibiliEmbedUrl(url: string): string | null {
  const bvMatch = url.match(BILIBILI_BV_RE);
  if (bvMatch) {
    const page = new URL(url).searchParams.get('p');
    const base = `https://player.bilibili.com/player.html?bvid=${bvMatch[1]}&high_quality=1&danmaku=0`;
    return page ? `${base}&page=${page}` : base;
  }

  const avMatch = url.match(/\/video\/av(\d+)/i);
  if (avMatch) {
    return `https://player.bilibili.com/player.html?aid=${avMatch[1]}&high_quality=1&danmaku=0`;
  }

  return null;
}
