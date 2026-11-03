import React, { useState } from 'react';
import {
  ArticleConfig,
  ArticleStyle,
  ArticleTone,
  ProductInput,
} from '../types/article';
import { PALETTES, detectBestPalette } from '../data/palettes';
import { detectBestStyle, detectBestTone } from '../services/proceduralEngine';
import {
  Sparkles,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Check,
  Link,
  Image as ImageIcon,
  Tag,
  DollarSign,
  Palette,
  Layers,
  ArrowRight,
  HelpCircle,
  FileText,
} from 'lucide-react';

interface ConfigurationPanelProps {
  config: ArticleConfig;
  onChangeConfig: (config: ArticleConfig) => void;
  products: ProductInput[];
  onChangeProducts: (products: ProductInput[]) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  config,
  onChangeConfig,
  products,
  onChangeProducts,
  onGenerate,
  isGenerating,
}) => {
  const [productEditMode, setProductEditMode] = useState<'cards' | 'bulk'>('cards');
  const [bulkText, setBulkText] = useState(() =>
    products
      .map((p) => `${p.name}${p.link ? ` | ${p.link}` : ''}${p.img ? ` | ${p.img}` : ''}`)
      .join('\n')
  );
  const [showAdvancedAffiliate, setShowAdvancedAffiliate] = useState(false);

  // Sync bulk text when products change from outside (e.g. preset selection)
  React.useEffect(() => {
    setBulkText(
      products
        .map((p) => `${p.name}${p.link ? ` | ${p.link}` : ''}${p.img ? ` | ${p.img}` : ''}`)
        .join('\n')
    );
  }, [products]);

  const updateConfig = <K extends keyof ArticleConfig>(key: K, value: ArticleConfig[K]) => {
    onChangeConfig({
      ...config,
      [key]: value,
    });
  };

  const handleAddProduct = () => {
    const newProd: ProductInput = {
      id: `prod-${Date.now()}`,
      name: `New Product Pick #${products.length + 1}`,
      link: '',
      img: '',
      badge: products.length === 0 ? 'Best Overall' : `Top Pick #${products.length + 1}`,
      score: 9.2,
      priceEstimate: '$49.99',
      highlight: 'Engineered for exceptional daily durability and consistent performance.',
    };
    onChangeProducts([...products, newProd]);
  };

  const handleUpdateProduct = (id: string, updates: Partial<ProductInput>) => {
    onChangeProducts(
      products.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const handleRemoveProduct = (id: string) => {
    onChangeProducts(products.filter((p) => p.id !== id));
  };

  const handleMoveProduct = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === products.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...products];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;
    onChangeProducts(reordered);
  };

  const handleApplyBulkText = () => {
    const lines = bulkText.split('\n').map((l) => l.trim()).filter(Boolean);
    const parsed: ProductInput[] = lines.map((line, idx) => {
      const parts = line.split('|').map((p) => p.trim());
      const existing = products[idx] || {};
      return {
        id: existing.id || `bulk-${Date.now()}-${idx}`,
        name: parts[0] || `Product #${idx + 1}`,
        link: parts[1] || '',
        img: parts[2] || '',
        badge: existing.badge || (idx === 0 ? 'Best Overall' : `Top Pick #${idx + 1}`),
        score: existing.score || 9.4,
        priceEstimate: existing.priceEstimate || '$49.99',
        highlight: existing.highlight || 'High-performance contender with solid ergonomics.',
      };
    });

    if (parsed.length > 0) {
      onChangeProducts(parsed);
      setProductEditMode('cards');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 sm:p-6 space-y-6">
      {/* Title & Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Article Blueprint</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure niche keywords, products, and affiliate parameters.
          </p>
        </div>
        <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          Zero-API Mode
        </span>
      </div>

      {/* Primary Keyword & Target Audience */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Target Focus Keyword <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={config.keyword}
              onChange={(e) => updateConfig('keyword', e.target.value)}
              placeholder="e.g. best wireless earbuds under $50"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            Used to auto-generate the H1, SEO title, meta description, URL slug, and Schema.org markup.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Target Audience Persona
          </label>
          <input
            type="text"
            value={config.targetAudience}
            onChange={(e) => updateConfig('targetAudience', e.target.value)}
            placeholder="e.g. students, remote programmers, fitness enthusiasts"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
          />
        </div>
      </div>

      {/* Style & Tone Row with Auto & Custom Support */}
      {(() => {
        const detectedStyle = detectBestStyle(config.keyword, products.length);
        const styleNames: Record<string, string> = {
          roundup: 'Top Picks / Roundup',
          review: 'Deep Dive Review',
          comparison: 'Head-to-Head Comparison',
          guide: "Buyer's Guide",
        };
        const detectedTone = detectBestTone(config.keyword, config.targetAudience);
        const toneNames: Record<string, string> = {
          balanced: 'Objective & Balanced',
          enthusiastic: 'Enthusiastic & High Energy',
          analytical: 'Technical & Analytical',
          honest: 'Candid & Direct',
        };

        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Article Layout Style */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Article Layout Style
                  </label>
                  {config.articleStyle === 'auto' && (
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                      Auto: {styleNames[detectedStyle]}
                    </span>
                  )}
                </div>
                <select
                  value={config.articleStyle}
                  onChange={(e) => updateConfig('articleStyle', e.target.value as ArticleStyle)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
                >
                  <option value="auto">⚡ Auto (Smart Match: {styleNames[detectedStyle]})</option>
                  <option value="roundup">Top Picks / Roundup List (High CTR)</option>
                  <option value="review">Deep Dive Review Breakdown</option>
                  <option value="comparison">Head-to-Head Comparison</option>
                  <option value="guide">The Ultimate Buyer's Guide</option>
                  <option value="custom">✏️ Custom Layout Style...</option>
                </select>

                {config.articleStyle === 'custom' && (
                  <div className="mt-2 animate-in fade-in duration-150">
                    <input
                      type="text"
                      value={config.customArticleStyle || ''}
                      onChange={(e) => updateConfig('customArticleStyle', e.target.value)}
                      placeholder="e.g. 60-Day Stress Test or Budget vs Luxury"
                      className="w-full px-3 py-1.5 rounded-lg border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>

              {/* Tone of Voice */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Tone of Voice
                  </label>
                  {config.tone === 'auto' && (
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                      Auto: {toneNames[detectedTone]}
                    </span>
                  )}
                </div>
                <select
                  value={config.tone}
                  onChange={(e) => updateConfig('tone', e.target.value as ArticleTone)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
                >
                  <option value="auto">⚡ Auto (Smart Match: {toneNames[detectedTone]})</option>
                  <option value="balanced">Trustworthy & Objective (Wirecutter Style)</option>
                  <option value="enthusiastic">Enthusiastic & High Conversion</option>
                  <option value="analytical">Analytical & Technical Precision</option>
                  <option value="honest">Candid, Direct & No-Fluff</option>
                  <option value="custom">✏️ Custom Tone Directive...</option>
                </select>

                {config.tone === 'custom' && (
                  <div className="mt-2 animate-in fade-in duration-150">
                    <input
                      type="text"
                      value={config.customTone || ''}
                      onChange={(e) => updateConfig('customTone', e.target.value)}
                      placeholder="e.g. Witty, sarcastic, or medical expert"
                      className="w-full px-3 py-1.5 rounded-lg border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Visual Color Palette Picker with Auto Smart Match */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-indigo-500" />
            <span>Article Styling Palette</span>
          </label>
          <span className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
            {config.paletteId === 'auto'
              ? '⚡ AI Smart Matched'
              : config.paletteId === 'custom'
              ? '🎨 Custom Brand Colors'
              : `${PALETTES.length} Curated Themes`}
          </span>
        </div>

        {/* Top Control Bar: Auto Smart Match & Custom Mode */}
        {(() => {
          const autoMatched = detectBestPalette(config.keyword);
          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Auto Match Button */}
              <button
                type="button"
                onClick={() => updateConfig('paletteId', 'auto')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  config.paletteId === 'auto'
                    ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/70 dark:bg-indigo-950/40'
                    : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 bg-slate-50/40 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-indigo-500 to-amber-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <span>Auto (Smart Match)</span>
                      {config.paletteId === 'auto' && (
                        <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      Picks: {autoMatched.name.split('&')[0]}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs"
                    style={{ backgroundColor: autoMatched.primary }}
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs"
                    style={{ backgroundColor: autoMatched.secondary }}
                  />
                </div>
              </button>

              {/* Custom Colors Button */}
              <button
                type="button"
                onClick={() => updateConfig('paletteId', 'custom')}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  config.paletteId === 'custom'
                    ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/70 dark:bg-indigo-950/40'
                    : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 bg-slate-50/40 dark:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 shrink-0">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <span>Custom Colors</span>
                      {config.paletteId === 'custom' && (
                        <Check className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                      Pick your own Hex codes
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs border border-white/50"
                    style={{ backgroundColor: config.customPrimaryColor || '#6366f1' }}
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-xs border border-white/50"
                    style={{ backgroundColor: config.customSecondaryColor || '#f97316' }}
                  />
                </div>
              </button>
            </div>
          );
        })()}

        {/* Custom Color Inputs (when Custom is selected) */}
        {config.paletteId === 'custom' && (
          <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-2.5 animate-in fade-in duration-150">
            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Custom Palette Configuration</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-normal">
                Click color boxes or type hex
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Primary Theme Color
                </label>
                <div className="flex items-center gap-1.5 p-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <input
                    type="color"
                    value={config.customPrimaryColor || '#6366f1'}
                    onChange={(e) => updateConfig('customPrimaryColor', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={config.customPrimaryColor || '#6366f1'}
                    onChange={(e) => updateConfig('customPrimaryColor', e.target.value)}
                    placeholder="#6366f1"
                    className="w-full text-xs font-mono bg-transparent text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  CTA / Accent Color
                </label>
                <div className="flex items-center gap-1.5 p-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <input
                    type="color"
                    value={config.customSecondaryColor || '#f97316'}
                    onChange={(e) => updateConfig('customSecondaryColor', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={config.customSecondaryColor || '#f97316'}
                    onChange={(e) => updateConfig('customSecondaryColor', e.target.value)}
                    placeholder="#f97316"
                    className="w-full text-xs font-mono bg-transparent text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 12 Curated Palettes Grid */}
        <div className="space-y-1.5 pt-1">
          <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
            Or pick from 12 conversion-tested color themes:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
            {PALETTES.map((pal) => {
              const isSelected = config.paletteId === pal.id;
              return (
                <button
                  key={pal.id}
                  type="button"
                  onClick={() => updateConfig('paletteId', pal.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1.5 ${
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/40 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/40 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-4 h-4 rounded-full shadow-xs border border-black/10"
                        style={{ backgroundColor: pal.primary }}
                      />
                      <span
                        className="w-4 h-4 rounded-full shadow-xs border border-black/10"
                        style={{ backgroundColor: pal.secondary }}
                      />
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {pal.name.split('&')[0]}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                      {pal.category}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Products to Review ({products.length})</span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Add direct Amazon links or leave empty for auto-generated search links.
            </p>
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setProductEditMode('cards')}
              className={`px-2.5 py-1 font-semibold rounded-md transition-colors cursor-pointer ${
                productEditMode === 'cards'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              Cards
            </button>
            <button
              type="button"
              onClick={() => setProductEditMode('bulk')}
              className={`px-2.5 py-1 font-semibold rounded-md transition-colors cursor-pointer ${
                productEditMode === 'bulk'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              Bulk Paste
            </button>
          </div>
        </div>

        {productEditMode === 'bulk' ? (
          <div className="space-y-2">
            <textarea
              rows={5}
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="Product Name | Optional Amazon Link | Optional Image URL"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Format: <code>Product Name | Amazon URL | Image URL</code> (1 per line)</span>
              <button
                type="button"
                onClick={handleApplyBulkText}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Apply to Products
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((prod, idx) => (
              <div
                key={prod.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30 space-y-2.5 transition-all"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={prod.name}
                      onChange={(e) => handleUpdateProduct(prod.id, { name: e.target.value })}
                      placeholder="Product Name"
                      className="font-bold text-sm text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-600 focus:border-indigo-600 focus:outline-none flex-1 truncate"
                    />
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveProduct(idx, 'up')}
                      title="Move up"
                      className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === products.length - 1}
                      onClick={() => handleMoveProduct(idx, 'down')}
                      title="Move down"
                      className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 cursor-pointer"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(prod.id)}
                      title="Delete product"
                      className="p-1 text-rose-400 hover:text-rose-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <Link className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={prod.link}
                      onChange={(e) => handleUpdateProduct(prod.id, { link: e.target.value })}
                      placeholder="Amazon URL / ASIN"
                      className="w-full bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <ImageIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={prod.img}
                      onChange={(e) => handleUpdateProduct(prod.id, { img: e.target.value })}
                      placeholder="Image URL"
                      className="w-full bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      value={prod.badge || ''}
                      onChange={(e) => handleUpdateProduct(prod.id, { badge: e.target.value })}
                      placeholder="Award Badge (e.g. Best Overall)"
                      className="w-full bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <span className="text-amber-500 font-bold">★</span>
                    <input
                      type="number"
                      step="0.1"
                      min="7.0"
                      max="10.0"
                      value={prod.score || 9.5}
                      onChange={(e) =>
                        handleUpdateProduct(prod.id, { score: parseFloat(e.target.value) || 9.0 })
                      }
                      placeholder="Score (e.g. 9.8)"
                      className="w-full bg-transparent text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddProduct}
              className="w-full py-2.5 border border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Product</span>
            </button>
          </div>
        )}
      </div>

      {/* Advanced Affiliate Settings Accordion */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setShowAdvancedAffiliate(!showAdvancedAffiliate)}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 py-1 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-amber-500" />
            <span>Affiliate & Tracking Settings</span>
          </span>
          {showAdvancedAffiliate ? (
            <ChevronUp className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {showAdvancedAffiliate && (
          <div className="mt-3.5 space-y-3.5 p-3.5 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Amazon Associate Tag
                </label>
                <input
                  type="text"
                  value={config.affiliateTag}
                  onChange={(e) => updateConfig('affiliateTag', e.target.value)}
                  placeholder="e.g. yourtag-20"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Amazon Marketplace
                </label>
                <select
                  value={config.marketplace}
                  onChange={(e) => updateConfig('marketplace', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                >
                  <option value="www.amazon.com">amazon.com (United States)</option>
                  <option value="www.amazon.co.uk">amazon.co.uk (United Kingdom)</option>
                  <option value="www.amazon.ca">amazon.ca (Canada)</option>
                  <option value="www.amazon.de">amazon.de (Germany)</option>
                  <option value="www.amazon.in">amazon.in (India)</option>
                  <option value="www.amazon.ae">amazon.ae (UAE)</option>
                  <option value="www.amazon.com.au">amazon.com.au (Australia)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={config.buttonLabel}
                onChange={(e) => updateConfig('buttonLabel', e.target.value)}
                placeholder="Check Current Price on Amazon"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeFtcDisclosure}
                  onChange={(e) => updateConfig('includeFtcDisclosure', e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-slate-700 dark:text-slate-300">FTC Disclosure</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeComparisonTable}
                  onChange={(e) => updateConfig('includeComparisonTable', e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-slate-700 dark:text-slate-300">Comparison Matrix</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeBuyingGuide}
                  onChange={(e) => updateConfig('includeBuyingGuide', e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-slate-700 dark:text-slate-300">Buyer's Guide</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.includeFaqs}
                  onChange={(e) => updateConfig('includeFaqs', e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-slate-700 dark:text-slate-300">AEO / Search FAQs</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Main Generate Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating || !config.keyword.trim()}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-amber-500 hover:from-indigo-700 hover:to-amber-600 shadow-md shadow-indigo-500/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Synthesizing Article & Schema...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Full Article Now</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
        <div className="text-center mt-2 text-[11px] text-slate-400">
          ⚡ Procedural copy engine runs 100% locally with zero API limits.
        </div>
      </div>
    </div>
  );
};
