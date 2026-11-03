import React, { useState } from 'react';
import { GeneratedArticle } from '../types/article';
import { generateMarkdown } from '../services/exportFormats';
import { Copy, Download, Check, FileText } from 'lucide-react';

interface MarkdownExportTabProps {
  article: GeneratedArticle;
}

export const MarkdownExportTab: React.FC<MarkdownExportTabProps> = ({ article }) => {
  const [copied, setCopied] = useState(false);
  const markdownContent = generateMarkdown(article);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = markdownContent;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.seo.slug || 'affiliate-article'}.md`;
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
            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>GitHub Flavored Markdown with Frontmatter</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Perfect for Hugo, Jekyll, Astro, Obsidian, Notion, or Markdown CMS workflows.
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
                <span>Copied Markdown!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {/* Code Display */}
      <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950 overflow-hidden shadow-inner">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900/60 text-xs text-slate-400 font-mono">
          <span>{article.seo.slug || 'article'}.md</span>
          <span>{markdownContent.split('\n').length} lines</span>
        </div>
        <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto max-h-[550px] leading-relaxed whitespace-pre-wrap selection:bg-indigo-500/30">
          {markdownContent}
        </pre>
      </div>
    </div>
  );
};
