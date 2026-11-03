import React, { useState } from 'react';
import { GeneratedArticle } from '../types/article';
import { PALETTES, resolvePalette } from '../data/palettes';
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  Edit3,
  Check,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Star,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface LiveArticlePreviewProps {
  article: GeneratedArticle;
  onUpdateArticle?: (updated: GeneratedArticle) => void;
}

export const LiveArticlePreview: React.FC<LiveArticlePreviewProps> = ({
  article,
  onUpdateArticle,
}) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isEditable, setIsEditable] = useState(false);

  const pal = resolvePalette(article.config);
  const P = article.products || [];

  // Simple handler to update string values when in editable mode
  const handleUpdateField = (key: keyof GeneratedArticle, val: any) => {
    if (onUpdateArticle) {
      onUpdateArticle({
        ...article,
        [key]: val,
      });
    }
  };

  const getViewportWidthClass = () => {
    switch (viewport) {
      case 'mobile':
        return 'max-w-[420px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
      default:
        return 'max-w-4xl';
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Toolbar: Viewport switcher & Edit Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              viewport === 'desktop'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              viewport === 'tablet'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              viewport === 'mobile'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-xs"
              style={{ backgroundColor: pal.primary }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full shadow-xs"
              style={{ backgroundColor: pal.secondary }}
            />
            <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[130px]">
              {pal.name.split('&')[0]}
            </span>
            {article.config.paletteId === 'auto' && (
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                (AI)
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsEditable(!isEditable)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isEditable
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditable ? 'Editing Mode Active (Click to Type)' : 'Enable Inline Text Editing'}</span>
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex justify-center bg-slate-100/60 dark:bg-slate-950/60 p-4 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto min-h-[700px]">
        <div
          className={`w-full ${getViewportWidthClass()} transition-all duration-200 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10`}
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          {/* Hero Header */}
          <div
            className="rounded-2xl p-7 sm:p-9 text-white shadow-lg mb-8 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${pal.primary}, ${pal.secondary})`,
            }}
          >
            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                <span>Updated for 2026</span>
                <span>·</span>
                <span>~{article.readingTimeMinutes} min read</span>
                <span>·</span>
                <span>Verified Buyer Research</span>
              </div>

              {isEditable ? (
                <input
                  type="text"
                  value={article.h1}
                  onChange={(e) => handleUpdateField('h1', e.target.value)}
                  className="w-full text-2xl sm:text-3xl font-extrabold text-white bg-black/20 rounded p-1 border border-white/40 focus:outline-none"
                />
              ) : (
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  {article.h1}
                </h1>
              )}

              {isEditable ? (
                <textarea
                  rows={2}
                  value={article.hook}
                  onChange={(e) => handleUpdateField('hook', e.target.value)}
                  className="w-full text-base text-white/95 bg-black/20 rounded p-1 border border-white/40 focus:outline-none"
                />
              ) : (
                <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal">
                  {article.hook}
                </p>
              )}
            </div>
          </div>

          {/* FTC Disclosure */}
          {article.config.includeFtcDisclosure && (
            <div className="mb-7 p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Affiliate Disclosure:</strong> When you purchase through the verified links on
                this page, we may earn an affiliate commission from Amazon at no extra cost to you.
                Every recommended product undergoes independent scrutiny for real-world reliability.
              </div>
            </div>
          )}

          {/* Editorial Introduction */}
          <div className="space-y-4 mb-8 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {article.introParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Quick Winner Spotlight */}
          <div
            className="rounded-2xl p-6 sm:p-7 border-2 mb-10 transition-all shadow-sm"
            style={{
              backgroundColor: pal.surface,
              borderColor: pal.primary,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white"
                style={{ backgroundColor: pal.primary }}
              >
                Top Pick
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Quick Recommendation
              </span>
            </div>

            <h3
              className="text-xl font-bold mb-2"
              style={{ color: pal.textDark }}
            >
              The Overall Winner: {article.quickVerdictWinner}
            </h3>

            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {article.quickVerdictText}
            </p>

            {P.length > 0 && P[0].affiliateUrl && (
              <a
                href={P[0].affiliateUrl}
                target="_blank"
                rel="nofollow sponsored noopener"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-md transition-all hover:opacity-95"
                style={{
                  background: `linear-gradient(135deg, ${pal.buttonGradient[0]}, ${pal.buttonGradient[1]})`,
                }}
              >
                <span>Check Price on Amazon</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Top Picks at a Glance */}
          <div className="mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: pal.primary }}
            >
              Our Top Picks at a Glance
            </h2>
            <ol className="space-y-2.5 pl-5 list-decimal text-slate-700 dark:text-slate-300 text-sm sm:text-base">
              {P.map((prod) => (
                <li key={prod.id}>
                  <a
                    href={prod.affiliateUrl}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="font-bold hover:underline"
                    style={{ color: pal.primary }}
                  >
                    {prod.name}
                  </a>{' '}
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full text-white ml-2"
                    style={{ backgroundColor: pal.secondary }}
                  >
                    {prod.badge}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Individual Product Reviews */}
          <div className="space-y-12 mb-14">
            {P.map((prod, idx) => (
              <div
                key={prod.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-8 shadow-sm space-y-5"
              >
                {/* Product Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-full text-white font-extrabold text-sm flex items-center justify-center shrink-0"
                      style={{ backgroundColor: pal.primary }}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <span
                        className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white"
                        style={{ backgroundColor: pal.secondary }}
                      >
                        {prod.badge}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 text-base">
                    <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                    <span>{prod.score} / 10 Score</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {prod.name}
                  </h3>
                  <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">
                    "{prod.tagline}"
                  </p>
                </div>

                {/* Image showcase */}
                {prod.imageUrl ? (
                  <div className="text-center py-2">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      referrerPolicy="no-referrer"
                      className="max-h-72 w-auto mx-auto rounded-xl object-cover shadow-sm border border-slate-100 dark:border-slate-800"
                    />
                  </div>
                ) : (
                  <div className="py-6 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-center text-xs text-slate-400">
                    📸 Add product image on your CMS / WordPress: {prod.name}
                  </div>
                )}

                {/* Body Paragraphs */}
                <div className="space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {prod.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-xl p-4 bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40">
                    <div className="text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Key Advantages</span>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 pl-4 list-disc">
                      {prod.pros.map((pro, proIdx) => (
                        <li key={proIdx}>{pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl p-4 bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/40">
                    <div className="text-rose-800 dark:text-rose-300 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Considerations</span>
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-rose-900 dark:text-rose-200 pl-4 list-disc">
                      {prod.cons.map((con, conIdx) => (
                        <li key={conIdx}>{con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Target Match */}
                <div
                  className="p-3.5 rounded-xl text-xs sm:text-sm"
                  style={{ backgroundColor: pal.surface }}
                >
                  <strong className="text-slate-900 dark:text-slate-100">Best For: </strong>
                  <span className="text-slate-700 dark:text-slate-300">{prod.bestFor}</span>
                </div>

                {/* High CTR Amazon CTA Button */}
                {prod.affiliateUrl && (
                  <div className="pt-4 text-center">
                    <a
                      href={prod.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.99]"
                      style={{
                        background: `linear-gradient(135deg, ${pal.buttonGradient[0]}, ${pal.buttonGradient[1]})`,
                      }}
                    >
                      <span>{article.config.buttonLabel || 'Check Current Price on Amazon'}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <div className="text-[11px] text-slate-400 mt-2">
                      Live discount and Amazon prime delivery eligibility verified
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          {article.config.includeComparisonTable && article.comparison && (
            <div className="mb-14">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: pal.primary }}
              >
                Side-by-Side Comparison
              </h2>
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead
                    className="text-white"
                    style={{ backgroundColor: pal.primary }}
                  >
                    <tr>
                      <th className="p-3 font-bold">Model</th>
                      {article.comparison.criteria.map((crit, cIdx) => (
                        <th key={cIdx} className="p-3 font-bold">
                          {crit}
                        </th>
                      ))}
                      <th className="p-3 font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                    {article.comparison.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={rIdx % 2 === 0 ? 'bg-transparent' : 'bg-slate-50 dark:bg-slate-800/40'}
                      >
                        <td className="p-3 font-bold text-slate-900 dark:text-white">
                          {row.productName}
                        </td>
                        {row.values.map((v, vIdx) => (
                          <td key={vIdx} className="p-3 text-slate-600 dark:text-slate-300">
                            {v}
                          </td>
                        ))}
                        <td className="p-3">
                          <a
                            href={row.buyUrl}
                            target="_blank"
                            rel="nofollow sponsored noopener"
                            className="font-bold underline text-xs"
                            style={{ color: pal.primary }}
                          >
                            Amazon →
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Comprehensive Buyer's Guide */}
          {article.config.includeBuyingGuide && article.buyingGuide.length > 0 && (
            <div className="mb-14 space-y-5">
              <h2
                className="text-xl font-bold"
                style={{ color: pal.primary }}
              >
                Comprehensive Buying Guide
              </h2>
              {article.buyingGuide.map((sec, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {sec.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* AEO / FAQs */}
          {article.config.includeFaqs && article.faqs.length > 0 && (
            <div className="mb-14 space-y-4">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: pal.primary }}
              >
                Frequently Asked Questions
              </h2>
              {article.faqs.map((faq, fIdx) => (
                <div
                  key={fIdx}
                  className="rounded-xl p-4 border-l-4 transition-all"
                  style={{
                    backgroundColor: pal.surface,
                    borderColor: pal.secondary,
                  }}
                >
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1.5">
                    {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* The Final Verdict */}
          <div
            className="rounded-2xl p-7 sm:p-9 text-white shadow-lg space-y-3"
            style={{
              background: `linear-gradient(135deg, ${pal.primary}, ${pal.secondary})`,
            }}
          >
            <h2 className="text-2xl font-bold text-white">The Final Verdict</h2>
            <p className="text-base sm:text-lg text-white/95 leading-relaxed">
              {article.conclusion}
            </p>
            <p className="text-base sm:text-lg font-bold text-white pt-2">
              {article.callToAction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
