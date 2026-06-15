/**
 * Solar Special — 排版规范
 * 中文：思源黑体（Source Han Sans SC）
 * 英文：Futura / Futura PT
 * 设计画布宽度 1920px；网页通过 --ss-scale 等比缩放
 */
export const SOLAR_DESIGN_WIDTH = 1920;

export const solarFonts = {
  en: '"Futura PT", Futura, "Century Gothic", "Trebuchet MS", sans-serif',
  enCondensed: '"Futura PT Condensed", "Futura Condensed", "Arial Narrow", sans-serif',
  helvetica: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  cn: '"Source Han Sans SC", "Noto Sans SC", "PingFang SC", sans-serif',
} as const;

export const solarColors = {
  text: '#ffffff',
  keywordPill: '#525FDA',
} as const;

/** PDF 字号 / 字重映射（设计稿像素值） */
export const solarType = {
  /** 封面主标题 Solar Special — Futura Bold */
  coverTitleEn: { fontFamily: solarFonts.en, fontSize: 116, fontWeight: 700, lineHeight: 1.05 },
  /** 封面中文题 太阳系特调 */
  coverTitleCn: { fontFamily: solarFonts.cn, fontSize: 55, fontWeight: 700, lineHeight: 1.15 },
  /** 章节主标题 核心概念 — Futura Bold */
  sectionTitleCn: { fontFamily: solarFonts.en, fontSize: 42, fontWeight: 700, lineHeight: 1.15 },
  /** 章节英文 Core Concept — Futura Bold */
  sectionTitleEn: {
    fontFamily: solarFonts.en,
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  /** 关键词 / 小标题 */
  label: { fontFamily: solarFonts.cn, fontSize: 36, fontWeight: 500, lineHeight: 1.3 },
  /** 英文标签 Key Words */
  labelEn: { fontFamily: solarFonts.enCondensed, fontSize: 36, fontWeight: 700, lineHeight: 1.3 },
  /** 正文 — 24px */
  body: { fontFamily: solarFonts.cn, fontSize: 24, fontWeight: 400, lineHeight: 1.65 },
  /** 元信息 2025 Fall */
  meta: { fontFamily: solarFonts.en, fontSize: 24, fontWeight: 400, lineHeight: 1.4 },
  /** 元信息中文 */
  metaCn: { fontFamily: solarFonts.cn, fontSize: 24, fontWeight: 400, lineHeight: 1.4 },
  /** 子区块标题 */
  subSectionTitle: { fontFamily: solarFonts.cn, fontSize: 36, fontWeight: 500, lineHeight: 1.35 },
  /** 三级标题英文 Story / Schedule — Helvetica */
  subSectionTitleEn: {
    fontFamily: solarFonts.helvetica,
    fontSize: 36,
    fontWeight: 400,
    lineHeight: 1.35,
  },
  /** 动效 / UI 条目英文标题 */
  featureTitleEn: {
    fontFamily: solarFonts.enCondensed,
    fontSize: 36,
    fontWeight: 700,
    lineHeight: 1.35,
  },
  /** 流程节点标注 */
  flowLabel: { fontFamily: solarFonts.cn, fontSize: 32, fontWeight: 500, lineHeight: 1.3 },
  /** 流程节点英文 */
  flowLabelEn: { fontFamily: solarFonts.enCondensed, fontSize: 32, fontWeight: 600, lineHeight: 1.3 },
} as const;
