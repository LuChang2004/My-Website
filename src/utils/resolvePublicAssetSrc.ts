/** 本地 public 路径或 https 外链 → 最终可用的资源 URL */
export function resolvePublicAssetSrc(src: string): string {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const path = src.startsWith('/') ? src.slice(1) : src;
  return `${import.meta.env.BASE_URL}${path}`;
}
