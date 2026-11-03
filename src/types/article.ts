export interface ProductInput {
  id: string;
  name: string;
  link: string;
  img: string;
  badge?: string;
  score?: number;
  priceEstimate?: string;
  highlight?: string;
}

export type ArticleStyle = 'auto' | 'roundup' | 'review' | 'comparison' | 'guide' | 'custom';
export type ArticleTone = 'auto' | 'balanced' | 'enthusiastic' | 'analytical' | 'honest' | 'custom';

export interface ArticleConfig {
  keyword: string;
  targetAudience: string;
  articleStyle: ArticleStyle;
  customArticleStyle?: string;
  tone: ArticleTone;
  customTone?: string;
  affiliateTag: string;
  marketplace: string;
  buttonLabel: string;
  paletteId: string;
  customPrimaryColor?: string;
  customSecondaryColor?: string;
  includeFtcDisclosure: boolean;
  includeComparisonTable: boolean;
  includeBuyingGuide: boolean;
  includeFaqs: boolean;
}

export interface GeneratedProductReview {
  id: string;
  name: string;
  badge: string;
  score: string;
  tagline: string;
  paragraphs: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
  whyBuy: string;
  affiliateUrl: string;
  imageUrl: string;
}

export interface ComparisonCriterion {
  name: string;
}

export interface ComparisonRow {
  productName: string;
  values: string[];
  buyUrl: string;
}

export interface ComparisonData {
  criteria: string[];
  rows: ComparisonRow[];
}

export interface BuyingGuideSection {
  title: string;
  content: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SeoData {
  title: string;
  metaDescription: string;
  slug: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  tags: string[];
  jsonLdSchema: string;
}

export interface GeneratedArticle {
  id: string;
  generatedAt: string;
  config: ArticleConfig;
  h1: string;
  hook: string;
  readingTimeMinutes: number;
  introParagraphs: string[];
  quickVerdictWinner: string;
  quickVerdictText: string;
  products: GeneratedProductReview[];
  comparison: ComparisonData;
  buyingGuide: BuyingGuideSection[];
  faqs: FaqItem[];
  conclusion: string;
  callToAction: string;
  seo: SeoData;
}

export interface ColorPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  surface: string;
  accentGreen: string;
  border: string;
  textDark: string;
  buttonGradient: [string, string];
}
