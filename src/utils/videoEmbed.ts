const BILIBILI_BV_RE = /\/video\/(BV[a-zA-Z0-9]+)/i;
const BILIBILI_HOST_RE = /bilibili\.com/i;

export function isBilibiliVideoUrl(url: string): boolean {
  return BILIBILI_HOST_RE.test(url) && (BILIBILI_BV_RE.test(url) || /\/video\/av\d+/i.test(url));
}

export function getBilibiliEmbedUrl(url: string): string | null {
  const bvMatch = url.match(BILIBILI_BV_RE);
  if (bvMatch) {
    const page = new URL(url).searchParams.get('p') || '1';
    const params = new URLSearchParams({
      bvid: bvMatch[1],
      isOutside: 'true',
      danmaku: '0',
      autoplay: '0',
      p: page,
    });
    return `https://player.bilibili.com/player.html?${params.toString()}`;
  }

  const avMatch = url.match(/\/video\/av(\d+)/i);
  if (avMatch) {
    const params = new URLSearchParams({
      aid: avMatch[1],
      isOutside: 'true',
      danmaku: '0',
      autoplay: '0',
    });
    return `https://player.bilibili.com/player.html?${params.toString()}`;
  }

  return null;
}

export function getBilibiliWatchUrl(url: string): string | null {
  if (!isBilibiliVideoUrl(url)) return null;
  try {
    const parsed = new URL(url);
    parsed.hash = '';
    return parsed.toString();
  } catch {
    return url;
  }
}
