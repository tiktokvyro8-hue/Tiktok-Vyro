import { ColorPalette, GeneratedArticle } from '../types/article';
import { PALETTES, resolvePalette } from '../data/palettes';

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function generateCleanHtml(article: GeneratedArticle, palette?: ColorPalette): string {
  const pal = palette || resolvePalette(article.config);
  const P = article.products || [];

  const A = pal.primary;
  const B = pal.secondary;
  const S = pal.surface;
  const G = pal.accentGreen;

  let html = `<div class="affiliate-article-wrapper" style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.75;max-width:840px;margin:0 auto;font-size:16px;">\n`;

  // Hero Section
  html += `  <!-- Hero Header -->\n`;
  html += `  <div style="background:linear-gradient(135deg, ${A}, ${B});color:#ffffff;border-radius:18px;padding:36px 28px;margin-bottom:28px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.12);">\n`;
  html += `    <h1 style="margin:0 0 12px;font-size:32px;line-height:1.25;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">${escapeHtml(article.h1)}</h1>\n`;
  html += `    <p style="margin:0;font-size:18px;line-height:1.5;opacity:0.95;font-weight:400;">${escapeHtml(article.hook)}</p>\n`;
  html += `    <div style="margin-top:14px;font-size:13px;opacity:0.85;">🕒 ~${article.readingTimeMinutes} min read · Independent Buying Guide</div>\n`;
  html += `  </div>\n\n`;

  // FTC Disclosure
  if (article.config.includeFtcDisclosure) {
    html += `  <!-- FTC Disclosure -->\n`;
    html += `  <div style="background:#fffbeb;border:1px solid #fef3c7;border-left:4px solid #f59e0b;padding:12px 18px;border-radius:8px;font-size:13.5px;color:#78350f;margin-bottom:26px;line-height:1.6;">\n`;
    html += `    <strong>Affiliate Disclosure:</strong> This review is independently conducted. When you purchase through the verified links on this page, we may earn an affiliate commission from Amazon at no extra cost to you. We only recommend products that have demonstrated verified reliability.\n`;
    html += `  </div>\n\n`;
  }

  // Intro Paragraphs
  html += `  <!-- Editorial Introduction -->\n`;
  article.introParagraphs.forEach((p) => {
    html += `  <p style="margin:16px 0;font-size:17px;color:#334155;line-height:1.8;">${escapeHtml(p)}</p>\n`;
  });
  html += `\n`;

  // Quick Winner Verdict Box
  html += `  <!-- Quick Verdict Spotlight -->\n`;
  html += `  <div style="background:${S};border:2px solid ${A};border-radius:16px;padding:22px 24px;margin:32px 0;box-shadow:0 4px 14px rgba(0,0,0,0.03);">\n`;
  html += `    <div style="font-weight:800;color:${A};font-size:17px;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.04em;">⚡ Quick Recommendation: The Clear Winner</div>\n`;
  html += `    <p style="margin:0 0 14px;font-size:16.5px;color:#1e293b;line-height:1.7;">${escapeHtml(article.quickVerdictText)}</p>\n`;
  if (P.length > 0 && P[0].affiliateUrl) {
    html += `    <a href="${escapeHtml(P[0].affiliateUrl)}" target="_blank" rel="nofollow sponsored noopener" style="display:inline-block;background:${A};color:#ffffff;text-decoration:none;font-weight:700;font-size:14.5px;padding:10px 20px;border-radius:8px;margin-top:6px;">View ${escapeHtml(P[0].name)} on Amazon →</a>\n`;
  }
  html += `  </div>\n\n`;

  // Top Picks at a Glance
  html += `  <!-- At a Glance Navigation -->\n`;
  html += `  <h2 style="color:${A};font-size:22px;font-weight:700;margin:36px 0 16px;border-bottom:2px solid ${pal.border};padding-bottom:8px;">Our Top Picks at a Glance</h2>\n`;
  html += `  <ol style="padding-left:22px;margin:16px 0 32px;">\n`;
  P.forEach((p) => {
    const link = p.affiliateUrl
      ? `<a href="${escapeHtml(p.affiliateUrl)}" target="_blank" rel="nofollow sponsored noopener" style="color:${A};font-weight:700;text-decoration:none;border-bottom:1px solid ${A};">${escapeHtml(p.name)}</a>`
      : `<strong>${escapeHtml(p.name)}</strong>`;
    html += `    <li style="margin:10px 0;font-size:16px;color:#334155;">${link} <span style="background:${B};color:#ffffff;border-radius:12px;padding:2px 10px;font-size:12px;font-weight:700;margin-left:8px;white-space:nowrap;">${escapeHtml(p.badge)}</span></li>\n`;
  });
  html += `  </ol>\n\n`;

  // Product Reviews
  html += `  <!-- Detailed Product Reviews -->\n`;
  P.forEach((p, idx) => {
    html += `  <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;padding:26px;margin:36px 0;box-shadow:0 8px 20px -6px rgba(0,0,0,0.06);">\n`;
    html += `    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px;">\n`;
    html += `      <span style="background:${A};color:#ffffff;border-radius:50%;width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:15px;">${idx + 1}</span>\n`;
    html += `      <span style="background:${B};color:#ffffff;border-radius:20px;padding:4px 14px;font-size:12.5px;font-weight:700;">${escapeHtml(p.badge)}</span>\n`;
    html += `      <span style="margin-left:auto;font-weight:800;color:${G};font-size:17px;">★ ${escapeHtml(p.score)}/10</span>\n`;
    html += `    </div>\n\n`;

    html += `    <h2 style="margin:8px 0 4px;color:#0f172a;font-size:24px;font-weight:800;">${escapeHtml(p.name)}</h2>\n`;
    html += `    <p style="margin:0 0 18px;font-style:italic;color:#64748b;font-size:15px;">${escapeHtml(p.tagline)}</p>\n\n`;

    // Product Image
    if (p.imageUrl) {
      html += `    <div style="text-align:center;margin:20px 0;">\n`;
      html += `      <img src="${escapeHtml(p.imageUrl)}" alt="${escapeHtml(p.name)}" style="max-width:100%;max-height:360px;border-radius:12px;object-fit:cover;box-shadow:0 4px 16px rgba(0,0,0,0.06);" />\n`;
      html += `    </div>\n\n`;
    }

    // Review Paragraphs
    p.paragraphs.forEach((para) => {
      html += `    <p style="margin:14px 0;font-size:16px;line-height:1.8;color:#334155;">${escapeHtml(para)}</p>\n`;
    });
    html += `\n`;

    // Pros & Cons
    html += `    <div style="display:flex;gap:16px;flex-wrap:wrap;margin:22px 0;">\n`;
    html += `      <div style="flex:1;min-width:260px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px 18px;">\n`;
    html += `        <div style="color:#15803d;font-weight:700;font-size:15px;margin-bottom:8px;">✅ Key Strengths</div>\n`;
    html += `        <ul style="margin:0;padding-left:20px;font-size:14.5px;color:#166534;line-height:1.65;">\n`;
    p.pros.forEach((pro) => {
      html += `          <li style="margin:6px 0;">${escapeHtml(pro)}</li>\n`;
    });
    html += `        </ul>\n`;
    html += `      </div>\n`;

    html += `      <div style="flex:1;min-width:260px;background:#fff1f2;border:1px solid #fecdd3;border-radius:12px;padding:16px 18px;">\n`;
    html += `        <div style="color:#be123c;font-weight:700;font-size:15px;margin-bottom:8px;">⚠️ Things to Consider</div>\n`;
    html += `        <ul style="margin:0;padding-left:20px;font-size:14.5px;color:#9f1239;line-height:1.65;">\n`;
    p.cons.forEach((con) => {
      html += `          <li style="margin:6px 0;">${escapeHtml(con)}</li>\n`;
    });
    html += `        </ul>\n`;
    html += `      </div>\n`;
    html += `    </div>\n\n`;

    // Target Match & Why buy
    html += `    <div style="background:${S};border-radius:10px;padding:12px 16px;margin:16px 0;font-size:14.5px;color:#334155;"><strong>Ideal For:</strong> ${escapeHtml(p.bestFor)}</div>\n`;
    html += `    <div style="font-weight:700;color:${B};font-size:15px;margin:12px 0;">✨ ${escapeHtml(p.whyBuy)}</div>\n\n`;

    // Amazon Buy Button
    if (p.affiliateUrl) {
      const btnLabel = article.config.buttonLabel || 'Check Current Price on Amazon';
      html += `    <div style="text-align:center;margin:24px 0 8px;">\n`;
      html += `      <a href="${escapeHtml(p.affiliateUrl)}" target="_blank" rel="nofollow sponsored noopener" style="display:inline-flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg, ${pal.buttonGradient[0]}, ${pal.buttonGradient[1]});color:#ffffff;text-decoration:none;font-weight:700;font-size:16px;padding:14px 30px;border-radius:999px;box-shadow:0 8px 18px -4px rgba(0,0,0,0.18);">\n`;
      html += `        ${escapeHtml(btnLabel)} →\n`;
      html += `      </a>\n`;
      html += `      <div style="font-size:12px;color:#94a3b8;margin-top:8px;">Real-time stock & pricing available on Amazon</div>\n`;
      html += `    </div>\n`;
    }

    html += `  </div>\n\n`;
  });

  // Comparison Table
  if (article.config.includeComparisonTable && article.comparison && article.comparison.rows.length > 0) {
    html += `  <!-- Side-by-Side Comparison -->\n`;
    html += `  <h2 style="color:${A};font-size:24px;font-weight:700;margin:42px 0 16px;">Side-by-Side Comparison Table</h2>\n`;
    html += `  <div style="overflow-x:auto;margin:18px 0 32px;">\n`;
    html += `    <table style="border-collapse:collapse;width:100%;font-size:14.5px;text-align:left;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">\n`;
    html += `      <thead>\n`;
    html += `        <tr style="background:${A};color:#ffffff;">\n`;
    html += `          <th style="padding:14px 16px;font-weight:700;">Contender</th>\n`;
    article.comparison.criteria.forEach((crit) => {
      html += `          <th style="padding:14px 16px;font-weight:700;">${escapeHtml(crit)}</th>\n`;
    });
    html += `          <th style="padding:14px 16px;font-weight:700;">View</th>\n`;
    html += `        </tr>\n`;
    html += `      </thead>\n`;
    html += `      <tbody>\n`;
    article.comparison.rows.forEach((row, i) => {
      const bg = i % 2 === 0 ? '#ffffff' : S;
      html += `        <tr style="background:${bg};border-bottom:1px solid #e2e8f0;">\n`;
      html += `          <td style="padding:14px 16px;font-weight:700;color:#0f172a;">${escapeHtml(row.productName)}</td>\n`;
      row.values.forEach((val) => {
        html += `          <td style="padding:14px 16px;color:#334155;">${escapeHtml(val)}</td>\n`;
      });
      html += `          <td style="padding:14px 16px;"><a href="${escapeHtml(row.buyUrl)}" target="_blank" rel="nofollow sponsored noopener" style="color:${A};font-weight:700;text-decoration:none;">Amazon →</a></td>\n`;
      html += `        </tr>\n`;
    });
    html += `      </tbody>\n`;
    html += `    </table>\n`;
    html += `  </div>\n\n`;
  }

  // Buyer's Guide
  if (article.config.includeBuyingGuide && article.buyingGuide.length > 0) {
    html += `  <!-- Buyer's Guide -->\n`;
    html += `  <h2 style="color:${A};font-size:24px;font-weight:700;margin:42px 0 16px;">Comprehensive Buyer's Guide</h2>\n`;
    article.buyingGuide.forEach((guide) => {
      html += `  <div style="margin:20px 0;">\n`;
      html += `    <h3 style="font-size:18.5px;color:#0f172a;font-weight:700;margin:0 0 8px;">${escapeHtml(guide.title)}</h3>\n`;
      html += `    <p style="margin:0;font-size:16px;line-height:1.75;color:#334155;">${escapeHtml(guide.content)}</p>\n`;
      html += `  </div>\n`;
    });
    html += `\n`;
  }

  // FAQs
  if (article.config.includeFaqs && article.faqs.length > 0) {
    html += `  <!-- Frequently Asked Questions -->\n`;
    html += `  <h2 style="color:${A};font-size:24px;font-weight:700;margin:42px 0 16px;">Frequently Asked Questions</h2>\n`;
    article.faqs.forEach((faq) => {
      html += `  <div style="background:${S};border-left:4px solid ${B};border-radius:0 12px 12px 0;padding:16px 20px;margin:14px 0;">\n`;
      html += `    <div style="font-weight:700;font-size:16px;color:#0f172a;margin-bottom:6px;">${escapeHtml(faq.question)}</div>\n`;
      html += `    <div style="font-size:15px;color:#334155;line-height:1.7;">${escapeHtml(faq.answer)}</div>\n`;
      html += `  </div>\n`;
    });
    html += `\n`;
  }

  // Conclusion
  html += `  <!-- Final Verdict -->\n`;
  html += `  <div style="background:linear-gradient(135deg, ${A}, ${B});color:#ffffff;border-radius:18px;padding:32px 28px;margin-top:42px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.12);">\n`;
  html += `    <h2 style="margin:0 0 12px;font-size:24px;font-weight:800;color:#ffffff;">The Final Verdict</h2>\n`;
  html += `    <p style="margin:0 0 16px;font-size:16.5px;line-height:1.7;opacity:0.95;">${escapeHtml(article.conclusion)}</p>\n`;
  html += `    <p style="margin:0;font-weight:700;font-size:17px;color:#ffffff;">${escapeHtml(article.callToAction)}</p>\n`;
  html += `  </div>\n`;

  html += `</div>`;

  return html;
}

export function generateMarkdown(article: GeneratedArticle): string {
  const lines: string[] = [];

  // Frontmatter
  lines.push(`---`);
  lines.push(`title: "${article.seo.title.replace(/"/g, '\\"')}"`);
  lines.push(`description: "${article.seo.metaDescription.replace(/"/g, '\\"')}"`);
  lines.push(`slug: "${article.seo.slug}"`);
  lines.push(`date: "${new Date().toISOString().split('T')[0]}"`);
  lines.push(`tags: [${article.seo.tags.map((t) => `"${t}"`).join(', ')}]`);
  lines.push(`---`);
  lines.push(``);

  // Title & Hook
  lines.push(`# ${article.h1}`);
  lines.push(``);
  lines.push(`> ${article.hook}`);
  lines.push(``);

  if (article.config.includeFtcDisclosure) {
    lines.push(`*Affiliate Disclosure: This post contains affiliate links. When you purchase through links on our site, we may earn an affiliate commission from Amazon at no extra cost to you.*`);
    lines.push(``);
  }

  // Intros
  article.introParagraphs.forEach((p) => {
    lines.push(p);
    lines.push(``);
  });

  // Quick Winner
  lines.push(`### ⚡ Quick Verdict: The Winner`);
  lines.push(article.quickVerdictText);
  lines.push(``);

  // At a glance
  lines.push(`## Top Picks at a Glance`);
  article.products.forEach((p, idx) => {
    lines.push(`${idx + 1}. **[${p.name}](${p.affiliateUrl})** — *${p.badge}*`);
  });
  lines.push(``);

  // Products
  article.products.forEach((p, idx) => {
    lines.push(`---`);
    lines.push(``);
    lines.push(`## ${idx + 1}. ${p.name} (${p.badge})`);
    lines.push(`*Rating: ${p.score}/10 | ${p.tagline}*`);
    lines.push(``);

    if (p.imageUrl) {
      lines.push(`![${p.name}](${p.imageUrl})`);
      lines.push(``);
    }

    p.paragraphs.forEach((para) => {
      lines.push(para);
      lines.push(``);
    });

    lines.push(`### Advantages`);
    p.pros.forEach((pro) => lines.push(`- ✅ ${pro}`));
    lines.push(``);

    lines.push(`### Considerations`);
    p.cons.forEach((con) => lines.push(`- ⚠️ ${con}`));
    lines.push(``);

    lines.push(`**Ideal For:** ${p.bestFor}`);
    lines.push(``);
    lines.push(`👉 **[Check Current Price on Amazon for ${p.name}](${p.affiliateUrl})**`);
    lines.push(``);
  });

  // Comparison Table
  if (article.config.includeComparisonTable && article.comparison.rows.length > 0) {
    lines.push(`---`);
    lines.push(``);
    lines.push(`## Side-by-Side Comparison`);
    lines.push(``);
    const headers = ['Model', ...article.comparison.criteria, 'Link'];
    lines.push(`| ${headers.join(' | ')} |`);
    lines.push(`| ${headers.map(() => '---').join(' | ')} |`);

    article.comparison.rows.forEach((row) => {
      lines.push(`| **${row.productName}** | ${row.values.join(' | ')} | [View on Amazon](${row.buyUrl}) |`);
    });
    lines.push(``);
  }

  // Buying Guide
  if (article.config.includeBuyingGuide && article.buyingGuide.length > 0) {
    lines.push(`---`);
    lines.push(``);
    lines.push(`## Buyer's Guide`);
    lines.push(``);
    article.buyingGuide.forEach((guide) => {
      lines.push(`### ${guide.title}`);
      lines.push(guide.content);
      lines.push(``);
    });
  }

  // FAQs
  if (article.config.includeFaqs && article.faqs.length > 0) {
    lines.push(`---`);
    lines.push(``);
    lines.push(`## Frequently Asked Questions`);
    lines.push(``);
    article.faqs.forEach((faq) => {
      lines.push(`#### ${faq.question}`);
      lines.push(faq.answer);
      lines.push(``);
    });
  }

  // Conclusion
  lines.push(`---`);
  lines.push(``);
  lines.push(`## The Final Verdict`);
  lines.push(article.conclusion);
  lines.push(``);
  lines.push(`**${article.callToAction}**`);

  return lines.join('\n');
}

export function generateFullHtmlDocument(article: GeneratedArticle, palette?: ColorPalette): string {
  const content = generateCleanHtml(article, palette);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(article.seo.title)}</title>
  <meta name="description" content="${escapeHtml(article.seo.metaDescription)}">
  <meta property="og:title" content="${escapeHtml(article.seo.title)}">
  <meta property="og:description" content="${escapeHtml(article.seo.metaDescription)}">
  <style>
    body {
      margin: 0;
      padding: 32px 16px;
      background: #f8fafc;
      color: #1e293b;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
  </style>
  ${article.seo.jsonLdSchema}
</head>
<body>
  ${content}
</body>
</html>`;
}
