export interface MonthTheme {
  name: string;
  gradient: string;
  accent: string;
  tag: string;
  emoji: string;
  bg: string;
}

export const MONTH_THEMES: MonthTheme[] = [
  {
    name: "January",
    gradient: "from-slate-700 via-blue-900 to-slate-800",
    accent: "#93C5FD",
    tag: "Winter Silence",
    emoji: "❄️",
    bg: "#0F172A",
  },
  {
    name: "February",
    gradient: "from-rose-800 via-pink-900 to-red-900",
    accent: "#FDA4AF",
    tag: "Hearts & Frost",
    emoji: "🌹",
    bg: "#1C0A0D",
  },
  {
    name: "March",
    gradient: "from-emerald-700 via-teal-800 to-green-900",
    accent: "#6EE7B7",
    tag: "First Blooms",
    emoji: "🌿",
    bg: "#052E16",
  },
  {
    name: "April",
    gradient: "from-violet-700 via-purple-800 to-indigo-900",
    accent: "#C4B5FD",
    tag: "Spring Rain",
    emoji: "🌸",
    bg: "#1E1B4B",
  },
  {
    name: "May",
    gradient: "from-lime-600 via-green-700 to-emerald-800",
    accent: "#BEF264",
    tag: "Full Bloom",
    emoji: "🌻",
    bg: "#1A2E05",
  },
  {
    name: "June",
    gradient: "from-amber-600 via-yellow-700 to-orange-800",
    accent: "#FDE68A",
    tag: "Solstice Glow",
    emoji: "☀️",
    bg: "#2D1B00",
  },
  {
    name: "July",
    gradient: "from-orange-600 via-red-700 to-amber-800",
    accent: "#FCA5A5",
    tag: "Heatwave",
    emoji: "🔥",
    bg: "#300A00",
  },
  {
    name: "August",
    gradient: "from-cyan-600 via-sky-700 to-blue-800",
    accent: "#7DD3FC",
    tag: "Golden Hours",
    emoji: "🌊",
    bg: "#012030",
  },
  {
    name: "September",
    gradient: "from-amber-700 via-orange-800 to-red-900",
    accent: "#FDBA74",
    tag: "Harvest Season",
    emoji: "🍂",
    bg: "#1C0800",
  },
  {
    name: "October",
    gradient: "from-orange-800 via-amber-900 to-yellow-900",
    accent: "#FCD34D",
    tag: "Amber & Shadow",
    emoji: "🎃",
    bg: "#1C0A00",
  },
  {
    name: "November",
    gradient: "from-stone-700 via-slate-800 to-zinc-900",
    accent: "#D6D3D1",
    tag: "Still & Bare",
    emoji: "🍃",
    bg: "#1C1917",
  },
  {
    name: "December",
    gradient: "from-indigo-700 via-blue-900 to-violet-900",
    accent: "#A5B4FC",
    tag: "Yuletide Magic",
    emoji: "⭐",
    bg: "#0F0B2E",
  },
];
