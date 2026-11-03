import React, { useState, useEffect } from 'react';
import { ArticleConfig, GeneratedArticle, ProductInput } from './types/article';
import { PRESET_NICHES, PresetNiche } from './data/presets';
import { generateProceduralArticle } from './services/proceduralEngine';
import { Header } from './components/Header';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { LiveArticlePreview } from './components/LiveArticlePreview';
import { HtmlExportTab } from './components/HtmlExportTab';
import { MarkdownExportTab } from './components/MarkdownExportTab';
import { SeoSchemaTab } from './components/SeoSchemaTab';
import { PresetPickerModal } from './components/PresetPickerModal';
import { WordpressGuideModal } from './components/WordpressGuideModal';
import { Eye, FileCode, FileText, Globe, RefreshCw, Wand2, CheckCircle2 } from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('aas_theme') === 'dark' ||
        (!('aas_theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('aas_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('aas_theme', 'light');
    }
  }, [darkMode]);

  // Initial preset
  const defaultPreset = PRESET_NICHES[0];

  const [config, setConfig] = useState<ArticleConfig>(defaultPreset.config);
  const [products, setProducts] = useState<ProductInput[]>(defaultPreset.products);
  const [activePresetId, setActivePresetId] = useState<string>(defaultPreset.id);

  // Generated article state
  const [article, setArticle] = useState<GeneratedArticle>(() =>
    generateProceduralArticle(defaultPreset.config, defaultPreset.products)
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'markdown' | 'seo'>('preview');

  // Modals
  const [presetModalOpen, setPresetModalOpen] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 2500);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const generated = generateProceduralArticle(config, products);
      setArticle(generated);
      setIsGenerating(false);
      showToast('Fresh unique article generated!');
    }, 280);
  };

  const handleConfigChange = (newConfig: ArticleConfig) => {
    setConfig(newConfig);
    setArticle((prev) => ({
      ...prev,
      config: newConfig,
    }));
  };

  const handleSelectPreset = (preset: PresetNiche) => {
    setConfig(preset.config);
    setProducts(preset.products);
    setActivePresetId(preset.id);
    const generated = generateProceduralArticle(preset.config, preset.products);
    setArticle(generated);
    showToast(`Loaded ${preset.name} preset!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Bar Header */}
      <Header
        onSelectPresetModal={() => setPresetModalOpen(true)}
        onOpenDocs={() => setGuideModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Toast Notification */}
        {successToast && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configuration & Product Manager (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            <ConfigurationPanel
              config={config}
              onChangeConfig={handleConfigChange}
              products={products}
              onChangeProducts={setProducts}
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {/* Right Column: Output Studio & Live Preview (7 columns) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Studio Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-800/80 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Render</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('html')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'html'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Clean HTML</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('markdown')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'markdown'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Markdown</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('seo')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'seo'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>SEO & Schema</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGenerate}
                  title="Generate a new dynamic variation with new angles"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer border border-slate-200 dark:border-slate-800"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Spin Fresh Angles</span>
                </button>
              </div>
            </div>

            {/* Tab Views */}
            <div className="min-h-[600px]">
              {activeTab === 'preview' && (
                <LiveArticlePreview
                  article={article}
                  onUpdateArticle={(updated) => setArticle(updated)}
                />
              )}

              {activeTab === 'html' && <HtmlExportTab article={article} />}

              {activeTab === 'markdown' && <MarkdownExportTab article={article} />}

              {activeTab === 'seo' && <SeoSchemaTab article={article} />}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8 mt-12 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              Affiliate Article Studio
            </span>
            <span>·</span>
            <span>Standalone Copy & Schema Engine for Amazon Associates</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setGuideModalOpen(true)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              WordPress Publishing Guide
            </button>
            <span>·</span>
            <button
              onClick={() => setPresetModalOpen(true)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Preset Niches
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PresetPickerModal
        isOpen={presetModalOpen}
        onClose={() => setPresetModalOpen(false)}
        onSelectPreset={handleSelectPreset}
        activePresetId={activePresetId}
      />

      <WordpressGuideModal
        isOpen={guideModalOpen}
        onClose={() => setGuideModalOpen(false)}
      />
    </div>
  );
}
