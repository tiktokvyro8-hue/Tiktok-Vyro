import React, { useState } from 'react';
import { GeneratedArticle } from '../types/article';
import { Copy, Check, Globe, Search, Code2, Tag, CheckCircle2, AlertCircle } from 'lucide-react';

interface SeoSchemaTabProps {
  article: GeneratedArticle;
}

export const SeoSchemaTab: React.FC<SeoSchemaTabProps> = ({ article }) => {
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [serpDevice, setSerpDevice] = useState<'desktop' | 'mobile'>('desktop');

  const seo = article.seo;
  const titleLen = seo.title.length;
  const descLen = seo.metaDescription.length;

  const handleCopySchema = async () => {
    try {
      await navigator.clipboard.writeText(seo.jsonLdSchema);
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = seo.jsonLdSchema;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedSchema(true);
      setTimeout(() => setCopiedSchema(false), 2000);
    }
  };

  const handleCopyAllSeo = async () => {
    const bundle = `SEO Title: ${seo.title}\nMeta Description: ${seo.metaDescription}\nSlug: ${seo.slug}\nFocus Keyword: ${seo.focusKeyword}\nSecondary Keywords: ${seo.secondaryKeywords.join(', ')}\nTags: ${seo.tags.join(', ')}\n\n--- JSON-LD Schema ---\n${seo.jsonLdSchema}`;
    try {
      await navigator.clipboard.writeText(bundle);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (e) {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Search Engine Optimization & Google Rich Snippets</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pre-configured metadata, LSI keyword targets, and valid Schema.org JSON-LD structured data.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyAllSeo}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            copiedAll
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
          }`}
        >
          {copiedAll ? (
            <>
              <Check className="w-4 h-4" />
              <span>Copied SEO Pack!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Complete SEO Pack</span>
            </>
          )}
        </button>
      </div>

      {/* Google SERP Simulator */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <Search className="w-4 h-4 text-indigo-500" />
            <span>Live Google Search Simulator</span>
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setSerpDevice('desktop')}
              className={`px-2.5 py-1 font-semibold rounded-md transition-colors cursor-pointer ${
                serpDevice === 'desktop'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setSerpDevice('mobile')}
              className={`px-2.5 py-1 font-semibold rounded-md transition-colors cursor-pointer ${
                serpDevice === 'mobile'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              Mobile
            </button>
          </div>
        </div>

        {/* The Mock Google Search Result Card */}
        <div
          className={`p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-sans transition-all ${
            serpDevice === 'mobile' ? 'max-w-md mx-auto shadow-sm' : 'w-full'
          }`}
        >
          {/* Breadcrumb URL */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mb-1">
            <span className="w-4 h-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
              G
            </span>
            <span className="truncate">https://yourdomain.com &rsaquo; {seo.slug}</span>
          </div>

          {/* Title */}
          <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug line-clamp-2">
            {seo.title}
          </h4>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed line-clamp-2">
            <span className="text-slate-400 dark:text-slate-500">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} —{' '}
            </span>
            {seo.metaDescription}
          </p>
        </div>
      </div>

      {/* Metadata Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SEO Title Card */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <span>SEO Title</span>
            <span
              className={`font-mono text-[11px] ${
                titleLen <= 60 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'
              }`}
            >
              {titleLen} / 60 characters
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
            {seo.title}
          </p>
        </div>

        {/* URL Slug Card */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <span>Clean URL Slug</span>
            <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
              SEO Optimized
            </span>
          </div>
          <p className="text-xs font-mono text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
            /{seo.slug}
          </p>
        </div>

        {/* Meta Description Card */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 md:col-span-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            <span>Meta Description</span>
            <span
              className={`font-mono text-[11px] ${
                descLen <= 160 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'
              }`}
            >
              {descLen} / 160 characters
            </span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 leading-relaxed">
            {seo.metaDescription}
          </p>
        </div>

        {/* LSI Keywords */}
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 md:col-span-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Secondary & LSI Search Keywords
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {seo.secondaryKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* JSON-LD Schema Box */}
      <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              JSON-LD Schema Markup (Google Rich Snippets / FAQ / Products)
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopySchema}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              copiedSchema
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            {copiedSchema ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy JSON-LD</span>
              </>
            )}
          </button>
        </div>

        <pre className="p-4 text-xs font-mono text-emerald-400 bg-slate-950 rounded-xl overflow-x-auto max-h-[300px] leading-relaxed selection:bg-emerald-500/30">
          {seo.jsonLdSchema}
        </pre>
      </div>
    </div>
  );
};
