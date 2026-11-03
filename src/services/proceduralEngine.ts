import {
  ArticleConfig,
  BuyingGuideSection,
  ComparisonData,
  GeneratedArticle,
  GeneratedProductReview,
  ProductInput,
  SeoData,
} from '../types/article';

// Helper utilities
function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function sampleN<T>(items: T[], n: number): T[] {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, items.length));
}

function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatAffiliateLink(
  rawUrl: string,
  productName: string,
  tag: string,
  marketplace: string
): string {
  let url = rawUrl.trim();
  const cleanMarketplace = marketplace.trim() || 'www.amazon.com';

  if (!url) {
    url = `https://${cleanMarketplace}/s?k=${encodeURIComponent(productName)}`;
  }

  if (tag && /amazon\./i.test(url)) {
    if (!/[?&]tag=/i.test(url)) {
      url += (url.includes('?') ? '&' : '?') + `tag=${encodeURIComponent(tag.trim())}`;
    }
  }

  return url;
}

// Rich domain-grounded phrase pools
const PROS_LIBRARY = [
  'Outstanding craftsmanship with reinforced stress points that resist daily wear',
  'Exceptionally straightforward, zero-friction setup out of the box',
  'Sustained reliability and consistent output even under demanding everyday conditions',
  'Ergonomically tuned architecture that reduces physical strain over extended hours',
  'Remarkable price-to-performance ratio that easily challenges rivals twice its price',
  'Whisper-quiet operational profile with optimized thermal and acoustic damping',
  'Backed by responsive, multi-channel customer service and straightforward warranty policies',
  'Intuitive, physical tactile controls that eliminate accidental trigger errors',
  'Minimalist, compact footprint that integrates effortlessly into modern lifestyle spaces',
  'High-efficiency power optimization delivering exceptional operational endurance',
  'Modular design elements allowing simple cleaning, maintenance, and part replacement',
  'Crisp, responsive feedback calibrated specifically for precision-conscious users',
];

const CONS_LIBRARY = [
  'Companion documentation and quick-start manuals are relatively concise',
  'Requires a short 24-hour calibration window to fine-tune personal preference settings',
  'Utility packaging is strictly functional without extravagant luxury unboxing extras',
  'High market demand occasionally leads to rapid regional stock fluctuations',
  'Lacks niche cosmetic bells and whistles found only on exorbitant luxury benchmarks',
  'Initial surface texture feels slightly firm before breaking in over standard use',
];

const BADGE_DEFAULTS = [
  'Best Overall Pick',
  'Best Value for Money',
  'Editor\'s Choice',
  'Top Runner-Up',
  'Best Premium Splurge',
  'Most Durable Pick',
  'Top Compact Choice',
];

// Automatic Style Detector
export function detectBestStyle(keyword: string, productCount: number): 'roundup' | 'review' | 'comparison' | 'guide' {
  const kw = (keyword || '').toLowerCase();
  if (kw.includes('vs') || kw.includes('versus') || kw.includes('compared') || kw.includes('compare') || productCount === 2) {
    return 'comparison';
  }
  if (kw.includes('how to') || kw.includes('guide') || kw.includes('choose') || kw.includes('beginner') || kw.includes('tips')) {
    return 'guide';
  }
  if (kw.includes('review') || kw.includes('worth it') || kw.includes('hands on') || productCount === 1) {
    return 'review';
  }
  return 'roundup';
}

// Automatic Tone Detector
export function detectBestTone(keyword: string, audience: string): 'balanced' | 'enthusiastic' | 'analytical' | 'honest' {
  const text = `${keyword} ${audience}`.toLowerCase();
  if (
    text.includes('audio') ||
    text.includes('engineer') ||
    text.includes('program') ||
    text.includes('developer') ||
    text.includes('coder') ||
    text.includes('tech') ||
    text.includes('spec') ||
    text.includes('mechanic') ||
    text.includes('bench') ||
    text.includes('ergonomic')
  ) {
    return 'analytical';
  }
  if (
    text.includes('game') ||
    text.includes('gamer') ||
    text.includes('rgb') ||
    text.includes('deal') ||
    text.includes('gift') ||
    text.includes('love') ||
    text.includes('fun') ||
    text.includes('exciting')
  ) {
    return 'enthusiastic';
  }
  if (
    text.includes('scam') ||
    text.includes('avoid') ||
    text.includes('cheap') ||
    text.includes('waste') ||
    text.includes('truth') ||
    text.includes('budget trap') ||
    text.includes('under $') ||
    text.includes('honest')
  ) {
    return 'honest';
  }
  return 'balanced';
}

export function generateProceduralArticle(
  config: ArticleConfig,
  products: ProductInput[]
): GeneratedArticle {
  const kw = config.keyword.trim() || 'best wireless earbuds';
  const cleanKw = capitalizeWords(kw);
  const audience = config.targetAudience.trim() || 'smart shoppers and value-conscious enthusiasts';
  const tag = config.affiliateTag.trim();
  const marketplace = config.marketplace || 'www.amazon.com';

  // Fallback if products array is empty
  const prods = products.length > 0 ? products : [
    {
      id: 'default-1',
      name: `Top Pick for ${cleanKw}`,
      link: `https://${marketplace}/s?k=${encodeURIComponent(kw)}`,
      img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      badge: 'Best Overall',
      score: 9.8,
      priceEstimate: '$49.99',
    },
  ];

  const primaryWinner = prods[0];

  // Resolve effective layout style
  const effectiveStyle: 'roundup' | 'review' | 'comparison' | 'guide' =
    config.articleStyle === 'auto'
      ? detectBestStyle(config.keyword, prods.length)
      : config.articleStyle === 'custom'
      ? 'roundup'
      : config.articleStyle;

  // Resolve effective tone
  const effectiveTone: 'balanced' | 'enthusiastic' | 'analytical' | 'honest' =
    config.tone === 'auto'
      ? detectBestTone(config.keyword, config.targetAudience)
      : config.tone === 'custom'
      ? 'honest'
      : config.tone;

  // Dynamic Headline synthesis based on style
  const headlineTemplates: Record<string, string[]> = {
    roundup: [
      `The Definitive Guide to the ${cleanKw}: Tested, Reviewed & Ranked`,
      `Best ${cleanKw} in 2026: Expert Tested Recommendations`,
      `Ranked: The Best ${cleanKw} That Are Actually Worth Your Money`,
      `${cleanKw} Reviews: Real-World Top Picks That Deliver True Value`,
    ],
    review: [
      `Deep Dive Review: The Best ${cleanKw} for Real-World Performance`,
      `The Unbiased Assessment: Which ${cleanKw} Should You Actually Buy?`,
      `Testing the Best ${cleanKw}: Honest Breakdown, Pros & Cons`,
    ],
    comparison: [
      `Head-to-Head Comparison: The Top ${cleanKw} Ranked Side-by-Side`,
      `${cleanKw} Face-Off: Which Model Delivers the Strongest Value?`,
      `Comparing the Leading ${cleanKw}: Specs, Durability & True Cost`,
    ],
    guide: [
      `The Ultimate Buyer's Guide to ${cleanKw}: Everything You Need to Know`,
      `How to Choose the Right ${cleanKw} Without Wasting Your Money`,
      `The Complete Manual to ${cleanKw}: Testing, Selection & Care`,
    ],
  };

  let h1 = pickRandom(headlineTemplates[effectiveStyle] || headlineTemplates.roundup);
  if (config.articleStyle === 'custom' && config.customArticleStyle?.trim()) {
    h1 = `${cleanKw}: ${capitalizeWords(config.customArticleStyle.trim())}`;
  }

  // Dynamic Opening Hooks tailored by tone
  const toneHooks: Record<string, string[]> = {
    analytical: [
      `Evaluating ${kw} requires strict empirical rigor: stress-testing structural tolerances, operational thermals, and long-term component degradation.`,
      `We audited specifications, benchmark telemetry, and verified architectural integrity to isolate the truly exceptional models for ${kw}.`,
    ],
    enthusiastic: [
      `Ready to experience the ultimate upgrade? Finding the perfect ${kw} will completely transform your daily routine!`,
      `If you've been searching for a game-changing option in ${kw}, these show-stopping picks deliver unmatched excitement and performance!`,
    ],
    honest: [
      `Let's cut through the marketing nonsense: finding reliable ${kw} shouldn't mean wasting money on flimsy gimmicks.`,
      `Most buying guides for ${kw} recycle manufacturer press releases; we tell you straight up what breaks, what lasts, and what's worth paying for.`,
    ],
    balanced: [
      `Finding the ideal match for ${kw} shouldn't feel like a high-stakes gamble with your hard-earned budget.`,
      `With dozens of look-alike models competing for your attention, identifying genuine quality in ${kw} comes down to three non-negotiable pillars: durability, ergonomics, and authentic value.`,
    ],
  };

  let hook = pickRandom(toneHooks[effectiveTone] || toneHooks.balanced);
  if (config.tone === 'custom' && config.customTone?.trim()) {
    hook = `Written with a ${config.customTone.trim()} perspective: finding genuine quality in ${kw} requires seeing past generic advertising to what really matters.`;
  }

  // Dynamic Intro Paragraphs
  const intros = [
    [
      `Shopping for ${kw} today presents a familiar paradox of choice. On one side, recent advancements in manufacturing and engineering have brought premium features down to surprisingly approachable price tags. On the other side, aggressive commercial marketing makes every single contender look like a flawless five-star triumph.`,
      `To help ${audience} cut straight through the noise, we evaluated real-world structural integrity, ease of daily use, and sustained owner satisfaction. Whether you prioritize marathon longevity, peak performance, or maximum return per dollar spent, the recommendations below represent the current pinnacle in this category.`,
    ],
    [
      `When investing in ${kw}, making an impulsive choice usually leads to familiar frustrations: premature breakdown, clumsy controls, or disappointing everyday performance. Nobody has the patience or budget for return labels and remorse.`,
      `That is why our methodology isolates items with verified engineering standards and consistent consumer track records. In this comprehensive breakdown, we put the category leaders under the microscope so you can invest with total peace of mind.`,
    ],
    [
      `Let us be direct from the outset: there is rarely a single "one-size-fits-all" answer when evaluating ${kw}. A flagship device equipped with intricate, enthusiast-grade adjustments might be heaven for one user, yet unnecessarily complex for someone looking for immediate plug-and-play simplicity.`,
      `Our mission with this guide is simple: align your specific daily lifestyle and budget with the exact machine, tool, or device built to exceed your expectations.`,
    ],
  ];
  const introParagraphs = pickRandom(intros);

  // Quick Verdict Winner Spotlight
  const quickVerdictText = `For the vast majority of ${audience}, the standout champion is the ${primaryWinner.name}. It delivers the most harmonious balance of build durability, intuitive ergonomics, and honest pricing. If you need dependable daily performance without paying an unnecessary luxury markup, this is the safest, highest-value recommendation right now.`;

  // Dynamic Product Reviews
  const generatedProducts: GeneratedProductReview[] = prods.map((prod, index) => {
    const badge = prod.badge || (index < BADGE_DEFAULTS.length ? BADGE_DEFAULTS[index] : `Rank #${index + 1} Contender`);
    const score = prod.score ? prod.score.toFixed(1) : (9.8 - index * 0.2 + (Math.random() * 0.1 - 0.05)).toFixed(1);
    const affiliateUrl = formatAffiliateLink(prod.link, prod.name, tag, marketplace);

    const taglines = [
      `Engineered for rock-solid stability and day-in, day-out dependability.`,
      `The high-performing contender that sets a new standard for value in this tier.`,
      `A refined, thoughtfully contoured pick built for prolonged daily use.`,
      `Uncompromising durability calibrated for discerning ${audience}.`,
      `Streamlined aesthetics meet practical, heavy-duty operational endurance.`,
    ];

    const p1 = `The ${prod.name} immediately distinguishes itself with exceptional attention to structural integrity and ergonomic balance. From your initial hands-on inspection, the chassis feels dense, purposeful, and thoroughly engineered rather than cost-cut to a bare minimum. Its core operation remains smooth, predictable, and remarkably consistent across sustained sessions.`;
    const p2 = `Where the ${prod.name} truly pulls away from secondary rivals is daily operational convenience. It eliminates unnecessary friction points, featuring an intuitive control response that ${audience} will appreciate from minute one. Rather than cluttering the user interface with gimmicky novelty additions, it keeps its focus firmly anchored on core reliability.`;

    const pros = sampleN(PROS_LIBRARY, 3);
    const cons = sampleN(CONS_LIBRARY, 2);

    const bestFor = index === 0
      ? `Anyone seeking the absolute safest, most reliable all-around investment`
      : `${audience} looking for targeted efficiency and specialized advantages`;

    const whyBuy = prod.highlight || `Delivers premium-grade operational performance without an inflated brand surcharge.`;

    return {
      id: prod.id || `prod-${index}`,
      name: prod.name,
      badge,
      score,
      tagline: pickRandom(taglines),
      paragraphs: [p1, p2],
      pros,
      cons,
      bestFor,
      whyBuy,
      affiliateUrl,
      imageUrl: prod.img || '',
    };
  });

  // Dynamic Comparison Matrix
  const criteria = ['Build Durability', 'Daily Usability', 'Performance Index', 'Value Proposition'];
  const comparisonRows = generatedProducts.map((p, idx) => ({
    productName: p.name,
    values: [
      idx === 0 ? 'Heavy-Duty / Top Tier' : idx === 1 ? 'High-Grade Composite' : 'Solid Everyday Grade',
      idx % 2 === 0 ? 'Effortless / Plug-and-Play' : 'Very Intuitive',
      `${p.score}/10 Verified`,
      idx === 0 ? 'Outstanding ROI' : 'Strong Tier-1 Value',
    ],
    buyUrl: p.affiliateUrl,
  }));

  const comparison: ComparisonData = {
    criteria,
    rows: comparisonRows,
  };

  // Buyer's Guide Sections
  const buyingGuide: BuyingGuideSection[] = [
    {
      title: `1. Key Decision Criteria Before Buying ${cleanKw}`,
      content: `Never base your purchasing decision exclusively on sleek cosmetic exterior styling. Look closely at structural connection joints, component heat dissipation, and verified real-world operational stress tests. Contenders that utilize modular, user-accessible components will virtually always outlast flashier rivals over a 24- to 36-month operational horizon.`,
    },
    {
      title: `2. Avoiding the "Extreme Budget Trap"`,
      content: `While entering at rock-bottom prices is tempting, ultra-cheap alternatives frequently trim essential costs where you feel it most: internal sensor precision, battery life cycles, and customer support accountability. Investing an extra 15% upfront routinely saves multiple frustrating replacements and downtime later.`,
    },
    {
      title: `3. Care, Maintenance & Maximizing Longevity`,
      content: `A simple preventative routine—such as routine dry dusting, checking connector pins, and following manufacturer storage guidelines—dramatically prolongs the operational lifespan of your purchase. Always maintain updated firmware or software where applicable to protect against performance degradation.`,
    },
  ];

  // AEO / Search FAQs
  const faqs = [
    {
      question: `Which option for ${kw} is best for beginners?`,
      answer: `The ${primaryWinner.name} is by far the most beginner-friendly choice. It functions smoothly straight out of the box, provides clear intuitive tactile cues, and does not demand complex calibration before you experience top-tier results.`,
    },
    {
      question: `How long should a quality ${kw} realistically last?`,
      answer: `With standard daily care and reasonable handling, any of the top-ranked models featured in our guide are designed to provide between 3 to 5 years of steady, dependable operation without noticeable loss of efficiency.`,
    },
    {
      question: `Are premium models worth the extra price difference?`,
      answer: `Yes, provided the price premium funds tangible upgrades like reinforced mechanical housing, advanced processing components, and legitimate multi-year warranty coverage, rather than superficial brand prestige.`,
    },
    {
      question: `How easy is it to source replacement parts or accessories?`,
      answer: `All brands featured on our curated list maintain widespread distribution channels and active customer communities, making authentic accessories, replacement tips, cables, and parts readily accessible on Amazon.`,
    },
    {
      question: `What kind of warranty coverage should I expect?`,
      answer: `Most reputable manufacturers in this tier offer between 12 to 24 months of limited warranty protection against factory defects. We always recommend registering your product immediately after delivery.`,
    },
  ];

  const conclusion = `After rigorously evaluating dozens of contenders across real-world durability, ergonomic comfort, and genuine value, the ${primaryWinner.name} claims our highest recommendation. It represents the pinnacle of operational reliability, user satisfaction, and pricing transparency in today's ${kw} market.`;
  const callToAction = `Check live inventory and secure the best available Amazon pricing today before seasonal stock fluctuates!`;

  // SEO metadata & JSON-LD schema
  const currentYear = new Date().getFullYear();
  const seoTitle = `${cleanKw}: Top Picks & Buying Guide (${currentYear})`.slice(0, 60);
  const metaDescription = `Looking for the best ${kw}? We reviewed and ranked the top options for durability, performance, and value. Find your perfect match.`.slice(0, 155);
  const slug = kw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const secondaryKeywords = [
    `best ${kw} review`,
    `top rated ${kw}`,
    `affordable ${kw}`,
    `${kw} comparison ${currentYear}`,
    `${kw} buyers guide`,
  ];

  const tags = [cleanKw, 'Product Reviews', 'Buying Guide', 'Amazon Picks', 'Best Value'];

  // Schema.org Structured Data
  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seoTitle,
    description: metaDescription,
    keywords: secondaryKeywords.join(', '),
    datePublished: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yoursite.com/${slug}`,
    },
  };

  const schemaItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: generatedProducts.map((p, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.whyBuy,
        review: {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: p.score,
            bestRating: '10',
          },
        },
      },
    })),
  };

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  const jsonLdSchema = `<script type="application/ld+json">\n${JSON.stringify(schemaArticle, null, 2)}\n</script>\n\n<script type="application/ld+json">\n${JSON.stringify(schemaItemList, null, 2)}\n</script>\n\n<script type="application/ld+json">\n${JSON.stringify(schemaFaq, null, 2)}\n</script>`;

  const seo: SeoData = {
    title: seoTitle,
    metaDescription,
    slug,
    focusKeyword: cleanKw,
    secondaryKeywords,
    tags,
    jsonLdSchema,
  };

  return {
    id: `art-${Date.now()}`,
    generatedAt: new Date().toISOString(),
    config,
    h1,
    hook,
    readingTimeMinutes: Math.max(4, Math.round((generatedProducts.length * 350 + 800) / 220)),
    introParagraphs,
    quickVerdictWinner: primaryWinner.name,
    quickVerdictText,
    products: generatedProducts,
    comparison,
    buyingGuide,
    faqs,
    conclusion,
    callToAction,
    seo,
  };
}
