import React, { useState } from 'react';
import { GeneratedArticle } from '../types/article';
import { generateCleanHtml, generateFullHtmlDocument } from '../services/exportFormats';
import { resolvePalette } from '../data/palettes';
import { Copy, Download, Check, FileCode, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';

interface HtmlExportTabProps {
  article: GeneratedArticle;
}

export const HtmlExportTab: React.FC<HtmlExportTabProps> = ({ article }) => {
  const [copied, setCopied] = useState(false);
  const pal = resolvePalette(article.config);
  const htmlCode = generateCleanHtml(article, pal);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = htmlCode;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const fullHtml = generateFullHtmlDocument(article, pal);
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.seo.slug || 'affiliate-article'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCode className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Standalone HTML with Inline CSS</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Self-contained styling. Paste directly into WordPress Custom HTML, Webflow, Ghost, or Shopify.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied HTML!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Clean HTML</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .html</span>
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-inner">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/60 text-xs text-slate-400 font-mono">
          <span>affiliate-article.html</span>
          <span>{htmlCode.length.toLocaleString()} characters</span>
        </div>
        <pre className="p-4 text-xs font-mono text-emerald-400/90 overflow-x-auto max-h-[550px] leading-relaxed whitespace-pre-wrap selection:bg-emerald-500/30">
          {htmlCode}
        </pre>
      </div>

      {/* Tip Banner */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-900 dark:text-white">
            Zero CSS Conflicts Guarantee
          </p>
          <p className="leading-relaxed">
            All styles are bundled inline using standard CSS declarations. Your WordPress theme's CSS will not break the comparison tables or distort the Amazon button styling.
          </p>
        </div>
      </div>
    </div>
  );
};
