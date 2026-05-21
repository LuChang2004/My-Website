#!/bin/bash
set -e
cd "$(dirname "$0")/../public/images"

echo "优化作品插画 (最大宽/高 1600px)..."
for f in work_*.png frame*.png; do
  [ -f "$f" ] || continue
  w=$(sips -g pixelWidth "$f" 2>/dev/null | awk '/pixelWidth/{print $2}')
  if [ -n "$w" ] && [ "$w" -gt 1600 ]; then
    sips -Z 1600 "$f" >/dev/null
    echo "  ✓ $f"
  fi
done

echo "优化横幅 group3.png (最大宽 2400px)..."
if [ -f group3.png ]; then
  w=$(sips -g pixelWidth group3.png 2>/dev/null | awk '/pixelWidth/{print $2}')
  if [ -n "$w" ] && [ "$w" -gt 2400 ]; then
    sips -Z 2400 group3.png >/dev/null
    echo "  ✓ group3.png"
  fi
fi

echo "完成。当前资源体积："
du -sh .
