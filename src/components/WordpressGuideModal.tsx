import React from 'react';
import { X, Copy, CheckCircle2, Globe, FileCode, Sparkles } from 'lucide-react';

interface WordpressGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WordpressGuideModal: React.FC<WordpressGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <h2 id="guide-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                How to Publish Your Article on WordPress / CMS
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Works seamlessly in Gutenberg, Elementor, Classic Editor, Webflow, and Ghost.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Method 1: Gutenberg */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-mono">
                1
              </span>
              <span>WordPress (Gutenberg Block Editor) — Recommended</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300 text-xs sm:text-sm pl-2 leading-relaxed">
              <li>In your WordPress post editor, click the <strong>+</strong> button to add a new block.</li>
              <li>Search for and insert the <strong>Custom HTML</strong> block.</li>
              <li>In Affiliate Article Studio, switch to the <strong>HTML Code</strong> tab and click <strong>Copy Clean HTML</strong>.</li>
              <li>Paste the code into the Custom HTML block and click <strong>Preview</strong>. Your styling, comparison tables, and buttons will render perfectly without any CSS clashes!</li>
            </ol>
          </div>

          {/* Method 2: Elementor */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-mono">
                2
              </span>
              <span>Elementor / Divi / Visual Builders</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed pl-8">
              Drag an <strong>HTML Widget / Code Module</strong> into your page container, and paste the generated HTML directly into the widget's HTML code field.
            </p>
          </div>

          {/* Method 3: SEO Schema */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center font-mono">
                3
              </span>
              <span>Adding Schema for Google Rich Snippets</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed pl-8">
              Switch to the <strong>SEO & Schema</strong> tab. Copy the <strong>JSON-LD Schema Markup</strong> and paste it into your SEO plugin (Yoast SEO / Rank Math / All in One SEO) custom schema box or header code injector.
            </p>
          </div>

          {/* Pro Tips */}
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Amazon Associates Compliance Tip:</span>
            </div>
            <p className="leading-relaxed">
              Always ensure your Amazon Associate tag is saved in the studio settings. The generator automatically appends <code className="bg-indigo-100 dark:bg-indigo-900/60 px-1 py-0.5 rounded font-mono">rel="nofollow sponsored noopener"</code> to comply 100% with Google Webmaster and Amazon Operating Agreement guidelines.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};
