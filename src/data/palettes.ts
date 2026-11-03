import { ColorPalette } from '../types/article';

export interface PaletteWithMeta extends ColorPalette {
  category: string;
  recommendedFor: string;
}

export const PALETTES: PaletteWithMeta[] = [
  {
    id: 'violet-amber',
    name: 'Royal Violet & Sunset Amber',
    category: 'Audio & Consumer Tech',
    recommendedFor: 'Earbuds, headphones, smart devices, electronics',
    primary: '#6366f1',
    secondary: '#f97316',
    surface: '#f5f3ff',
    accentGreen: '#10b981',
    border: '#e0e7ff',
    textDark: '#1e1b4b',
    buttonGradient: ['#f97316', '#ea580c'],
  },
  {
    id: 'cyber-indigo',
    name: 'Cyber Indigo & Neon Cyan',
    category: 'Computers & AI',
    recommendedFor: 'Laptops, GPUs, programming gear, smart home',
    primary: '#4338ca',
    secondary: '#06b6d4',
    surface: '#eef2ff',
    accentGreen: '#10b981',
    border: '#c7d2fe',
    textDark: '#1e1b4b',
    buttonGradient: ['#06b6d4', '#0891b2'],
  },
  {
    id: 'espresso-bronze',
    name: 'Warm Espresso & Copper Bronze',
    category: 'Coffee, Kitchen & Home',
    recommendedFor: 'Espresso machines, cookware, blenders, home barista',
    primary: '#78350f',
    secondary: '#d97706',
    surface: '#fef3c7',
    accentGreen: '#16a34a',
    border: '#fde68a',
    textDark: '#451a03',
    buttonGradient: ['#d97706', '#b45309'],
  },
  {
    id: 'forest-lime',
    name: 'Forest Pine & Athletic Lime',
    category: 'Fitness, Sports & Outdoor',
    recommendedFor: 'Running shoes, camping gear, gym equipment, cycling',
    primary: '#14532d',
    secondary: '#65a30d',
    surface: '#f0fdf4',
    accentGreen: '#16a34a',
    border: '#bbf7d0',
    textDark: '#052e16',
    buttonGradient: ['#65a30d', '#4d7c0f'],
  },
  {
    id: 'modern-slate',
    name: 'Minimal Slate & Wirecutter Orange',
    category: 'Office & Ergonomics',
    recommendedFor: 'Office chairs, standing desks, monitors, productivity',
    primary: '#1e293b',
    secondary: '#ea580c',
    surface: '#f8fafc',
    accentGreen: '#16a34a',
    border: '#e2e8f0',
    textDark: '#0f172a',
    buttonGradient: ['#ea580c', '#c2410c'],
  },
  {
    id: 'executive-navy',
    name: 'Executive Navy & Warm Brass',
    category: 'Business & Professional',
    recommendedFor: 'Executive furniture, luxury watches, business laptops',
    primary: '#1e3a8a',
    secondary: '#f59e0b',
    surface: '#eff6ff',
    accentGreen: '#10b981',
    border: '#bfdbfe',
    textDark: '#172554',
    buttonGradient: ['#f59e0b', '#d97706'],
  },
  {
    id: 'ocean-coral',
    name: 'Ocean Cyan & Coral Flame',
    category: 'Gadgets & Summer Gear',
    recommendedFor: 'Action cameras, travel accessories, drones, speakers',
    primary: '#0284c7',
    secondary: '#f43f5e',
    surface: '#f0f9ff',
    accentGreen: '#16a34a',
    border: '#bae6fd',
    textDark: '#0c4a6e',
    buttonGradient: ['#f43f5e', '#e11d48'],
  },
  {
    id: 'crimson-ruby',
    name: 'Crimson Ruby & Ember',
    category: 'High-Impact Deals & Gaming',
    recommendedFor: 'Gaming consoles, gaming headsets, deals roundups',
    primary: '#be123c',
    secondary: '#e11d48',
    surface: '#fff1f2',
    accentGreen: '#10b981',
    border: '#fecdd3',
    textDark: '#881337',
    buttonGradient: ['#e11d48', '#be123c'],
  },
  {
    id: 'rose-gold',
    name: 'Rose Quartz & Warm Champagne',
    category: 'Beauty, Skincare & Lifestyle',
    recommendedFor: 'Hair styling, skincare tools, jewelry, fashion, wellness',
    primary: '#9d174d',
    secondary: '#ec4899',
    surface: '#fdf2f8',
    accentGreen: '#10b981',
    border: '#fbcfe8',
    textDark: '#700733',
    buttonGradient: ['#ec4899', '#db2777'],
  },
  {
    id: 'nordic-emerald',
    name: 'Nordic Emerald & Amber',
    category: 'Clean Living, Garden & Eco',
    recommendedFor: 'Air purifiers, water filters, organic living, plants',
    primary: '#0f766e',
    secondary: '#d97706',
    surface: '#f0fdfa',
    accentGreen: '#059669',
    border: '#ccfbf1',
    textDark: '#134e4a',
    buttonGradient: ['#0f766e', '#115e59'],
  },
  {
    id: 'midnight-amber',
    name: 'Midnight Black & Laser Amber',
    category: 'Gaming Peripherals & Hardware',
    recommendedFor: 'Mechanical keyboards, gaming mice, PC builds, monitors',
    primary: '#09090b',
    secondary: '#f59e0b',
    surface: '#fafaf9',
    accentGreen: '#22c55e',
    border: '#e7e5e4',
    textDark: '#0c0a09',
    buttonGradient: ['#f59e0b', '#d97706'],
  },
  {
    id: 'amethyst-orchid',
    name: 'Amethyst Purple & Radiant Berry',
    category: 'Creative, Design & Art',
    recommendedFor: 'Drawing tablets, cameras, content creator microphones',
    primary: '#7e22ce',
    secondary: '#e879f9',
    surface: '#faf5ff',
    accentGreen: '#10b981',
    border: '#f3e8ff',
    textDark: '#3b0764',
    buttonGradient: ['#a855f7', '#9333ea'],
  },
];

export const DEFAULT_PALETTE = PALETTES[0];

// AI / Algorithmic Smart Palette Matcher based on article keywords
export function detectBestPalette(keyword: string): PaletteWithMeta {
  const kw = (keyword || '').toLowerCase();

  // Coffee & Kitchen
  if (
    kw.includes('coffee') ||
    kw.includes('espresso') ||
    kw.includes('kitchen') ||
    kw.includes('cook') ||
    kw.includes('brew') ||
    kw.includes('baking') ||
    kw.includes('blender') ||
    kw.includes('toaster') ||
    kw.includes('pan') ||
    kw.includes('knife') ||
    kw.includes('recipe') ||
    kw.includes('food')
  ) {
    return PALETTES.find((p) => p.id === 'espresso-bronze') || PALETTES[2];
  }

  // Fitness, Outdoor, Sports
  if (
    kw.includes('run') ||
    kw.includes('shoe') ||
    kw.includes('fitness') ||
    kw.includes('gym') ||
    kw.includes('workout') ||
    kw.includes('hike') ||
    kw.includes('outdoor') ||
    kw.includes('bike') ||
    kw.includes('yoga') ||
    kw.includes('sport') ||
    kw.includes('athletic')
  ) {
    return PALETTES.find((p) => p.id === 'forest-lime') || PALETTES[3];
  }

  // Office & Ergonomics
  if (
    kw.includes('chair') ||
    kw.includes('desk') ||
    kw.includes('office') ||
    kw.includes('ergonomic') ||
    kw.includes('standing') ||
    kw.includes('back pain') ||
    kw.includes('workspace') ||
    kw.includes('lumbar')
  ) {
    return PALETTES.find((p) => p.id === 'modern-slate') || PALETTES[4];
  }

  // Gaming & Hardware
  if (
    kw.includes('gaming') ||
    kw.includes('keyboard') ||
    kw.includes('mouse') ||
    kw.includes('mechanical') ||
    kw.includes('rgb') ||
    kw.includes('gpu') ||
    kw.includes('controller') ||
    kw.includes('steam') ||
    kw.includes('fps')
  ) {
    return PALETTES.find((p) => p.id === 'midnight-amber') || PALETTES[10];
  }

  // Beauty, Skincare & Lifestyle
  if (
    kw.includes('skin') ||
    kw.includes('hair') ||
    kw.includes('beauty') ||
    kw.includes('makeup') ||
    kw.includes('perfume') ||
    kw.includes('jewelry') ||
    kw.includes('fashion') ||
    kw.includes('wellness') ||
    kw.includes('dryer')
  ) {
    return PALETTES.find((p) => p.id === 'rose-gold') || PALETTES[8];
  }

  // Eco, Green, Home Living
  if (
    kw.includes('clean') ||
    kw.includes('air purifier') ||
    kw.includes('filter') ||
    kw.includes('plant') ||
    kw.includes('garden') ||
    kw.includes('vacuum') ||
    kw.includes('eco') ||
    kw.includes('solar')
  ) {
    return PALETTES.find((p) => p.id === 'nordic-emerald') || PALETTES[9];
  }

  // Business, Executive, Finance
  if (
    kw.includes('business') ||
    kw.includes('executive') ||
    kw.includes('finance') ||
    kw.includes('laptop') ||
    kw.includes('watch') ||
    kw.includes('monitor')
  ) {
    return PALETTES.find((p) => p.id === 'executive-navy') || PALETTES[5];
  }

  // Audio & Earbuds
  if (
    kw.includes('earbud') ||
    kw.includes('audio') ||
    kw.includes('headphone') ||
    kw.includes('sound') ||
    kw.includes('speaker') ||
    kw.includes('wireless') ||
    kw.includes('anc') ||
    kw.includes('bluetooth')
  ) {
    return PALETTES.find((p) => p.id === 'violet-amber') || PALETTES[0];
  }

  // Gadgets, Cameras, Summer
  if (
    kw.includes('camera') ||
    kw.includes('drone') ||
    kw.includes('travel') ||
    kw.includes('waterproof') ||
    kw.includes('portable')
  ) {
    return PALETTES.find((p) => p.id === 'ocean-coral') || PALETTES[6];
  }

  // Default fallback
  return PALETTES[0];
}

// Build custom palette dynamically from user's custom hex values
export function buildCustomPalette(primary: string, secondary: string): ColorPalette {
  const cleanPrimary = primary || '#6366f1';
  const cleanSecondary = secondary || '#f97316';

  return {
    id: 'custom',
    name: 'Custom Brand Palette',
    primary: cleanPrimary,
    secondary: cleanSecondary,
    surface: '#f8fafc',
    accentGreen: '#10b981',
    border: '#e2e8f0',
    textDark: '#0f172a',
    buttonGradient: [cleanSecondary, cleanPrimary],
  };
}

// Resolver that handles 'auto', custom, or specific palette id
export function resolvePalette(config: {
  paletteId: string;
  customPrimaryColor?: string;
  customSecondaryColor?: string;
  keyword?: string;
}): ColorPalette {
  if (config.paletteId === 'auto') {
    return detectBestPalette(config.keyword || '');
  }

  if (config.paletteId === 'custom') {
    return buildCustomPalette(
      config.customPrimaryColor || '#6366f1',
      config.customSecondaryColor || '#f97316'
    );
  }

  const found = PALETTES.find((p) => p.id === config.paletteId);
  return found || PALETTES[0];
}
