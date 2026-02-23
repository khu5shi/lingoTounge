import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loader, Copy, Check, Volume2, Globe, ArrowLeftRight } from "lucide-react";

// ── Star Background ──────────────────────────────────────────────────────────
const Starbg = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 130; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        o: Math.random(),
        s: Math.random() * 0.004 + 0.001,
        d: Math.random() > 0.5 ? 1 : -1,
      });
    }
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.o += s.s * s.d;
        if (s.o >= 1 || s.o <= 0.1) s.d *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,210,255,${s.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

// ── Languages ────────────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: "hi", label: "Hindi",      flag: "🇮🇳" },
  { code: "es", label: "Spanish",    flag: "🇪🇸" },
  { code: "zh", label: "Chinese",    flag: "🇨🇳" },
  { code: "fr", label: "French",     flag: "🇫🇷" },
  { code: "de", label: "German",     flag: "🇩🇪" },
  { code: "it", label: "Italian",    flag: "🇮🇹" },
  { code: "ru", label: "Russian",    flag: "🇷🇺" },
  { code: "ja", label: "Japanese",   flag: "🇯🇵" },
  { code: "ko", label: "Korean",     flag: "🇰🇷" },
  { code: "ar", label: "Arabic",     flag: "🇸🇦" },
  { code: "pt", label: "Portuguese", flag: "🇵🇹" },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang]       = useState("");
  const [text, setText]       = useState("");
  const [result, setResult]   = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);
  const [error, setError]     = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 80);
  }, []);

  const selectedLang = LANGUAGES.find((l) => l.code === lang);

  const handleTranslate = async () => {
    if (!text.trim()) { setError("Please enter some text first."); return; }
    if (!lang)        { setError("Please select a target language."); return; }
    setError(""); setLoading(true); setResult("");
    try {
      const res = await axios.request({
        method: "POST",
        url: "https://google-translator9.p.rapidapi.com/v2",
        headers: {
          "x-rapidapi-key": "1a52c28d7fmsh3fdd2b089274e63p177181jsn91a49262dc7f",
          "x-rapidapi-host": "google-translator9.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: { q: text, source: "en", target: lang, format: "text" },
      });
      setResult(res?.data?.data?.translations?.[0]?.translatedText || "");
    } catch {
      setError("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!result) return;
    const u = new SpeechSynthesisUtterance(result);
    if (lang) u.lang = lang;
    window.speechSynthesis.speak(u);
  };

  return (
    <div className="min-h-screen bg-[#04091a] font-sans">

      {/* ── Ambient blobs ── */}
      <div className="fixed top-[-120px] left-[-100px] w-[500px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(56,182,255,.11), transparent 70%)", filter: "blur(100px)" }} />
      <div className="fixed bottom-[-100px] right-[-80px] w-[460px] h-[460px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,.10), transparent 70%)", filter: "blur(100px)" }} />

      <Starbg />

      {/* ── Page wrapper ── */}
      <div
        className={`relative z-10 min-h-screen flex flex-col items-center px-4 md:px-8 py-14 gap-12
          transition-all duration-700 ease-out
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >

        {/* ── Header ── */}
        <header className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-4">
            {/* Logo icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-[1.7rem] shrink-0"
              style={{
                background: "linear-gradient(135deg,#38b6ff,#a855f7)",
                boxShadow: "0 0 36px rgba(56,182,255,.35)",
                animation: "iconPulse 3.5s ease-in-out infinite",
              }}
            >
              🌐
            </div>
            {/* Logo text */}
            <span
              className="font-extrabold tracking-tight"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(2.2rem,5vw,3.4rem)",
                background: "linear-gradient(90deg,#38b6ff 0%,#a855f7 52%,#f97316 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              LingoTongue
            </span>
          </div>
          <p className="text-slate-400 font-light text-[0.95rem] tracking-wide">
            Instant AI-powered translation across the world's languages
          </p>
        </header>

        {/* ── Card ── */}
        <div
          className="w-full max-w-5xl rounded-3xl p-6 md:p-10 flex flex-col gap-8"
          style={{
            background: "rgba(8,18,40,.78)",
            border: "1px solid rgba(255,255,255,.07)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 0 0 1px rgba(255,255,255,.04), 0 32px 100px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.06)",
            animation: "cardIn .5s .1s both",
          }}
        >

          {/* ── Two panels ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_64px_1fr] gap-6 md:gap-0 items-start">

            {/* Source panel */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <span className="flex items-center gap-2 text-[#38b6ff] text-xs font-bold uppercase tracking-widest"
                  style={{ fontFamily: "'Syne',sans-serif" }}>
                  <span className="w-2 h-2 rounded-full bg-[#38b6ff] shadow-[0_0_6px_#38b6ff]" />
                  🇺🇸 US English
                </span>
                <span className="text-slate-500 text-xs tabular-nums">{text.length} / 2000</span>
              </div>
              <textarea
                value={text}
                onChange={(e) => { setText(e.target.value.slice(0, 2000)); setError(""); }}
                placeholder="Type or paste your English text here…"
                spellCheck
                className="w-full min-h-[260px] rounded-2xl text-slate-200 text-[1rem] leading-7 font-light
                  placeholder:text-slate-600 resize-none outline-none p-5
                  transition-all duration-300
                  focus:ring-2 focus:ring-[#38b6ff]/30 focus:border-[#38b6ff]/50"
                style={{
                  background: "rgba(255,255,255,.035)",
                  border: "1px solid rgba(255,255,255,.08)",
                }}
              />
            </div>

            {/* Middle divider + swap */}
            <div className="hidden md:flex flex-col items-center justify-center pt-12 gap-3 h-full">
              <div className="w-px flex-1 min-h-[60px]"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(100,116,139,.18), transparent)" }} />
              <button
                disabled
                title="Swap (coming soon)"
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#38b6ff] shrink-0
                  transition-all duration-300 hover:rotate-180 cursor-not-allowed opacity-60"
                style={{
                  background: "rgba(56,182,255,.07)",
                  border: "1px solid rgba(56,182,255,.2)",
                }}
              >
                <ArrowLeftRight size={15} />
              </button>
              <div className="w-px flex-1 min-h-[60px]"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(100,116,139,.18), transparent)" }} />
            </div>

            {/* Target panel */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-1">
                <span className="flex items-center gap-2 text-[#a855f7] text-xs font-bold uppercase tracking-widest"
                  style={{ fontFamily: "'Syne',sans-serif" }}>
                  <span className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_6px_#a855f7]" />
                  {selectedLang ? `${selectedLang.flag} ${selectedLang.label}` : "🌍 Target Language"}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    title="Copy translation"
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110
                      ${copied
                        ? "bg-teal-500/10 border border-teal-500/30 text-teal-400"
                        : "text-slate-400 hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400"
                      }`}
                    style={{ background: copied ? undefined : "rgba(255,255,255,.045)", border: copied ? undefined : "1px solid rgba(255,255,255,.09)" }}
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                  </button>
                  <button
                    onClick={handleSpeak}
                    title="Read aloud"
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400
                      hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400
                      hover:scale-110 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,.045)", border: "1px solid rgba(255,255,255,.09)" }}
                  >
                    <Volume2 size={13} />
                  </button>
                </div>
              </div>

              <div className="relative">
                {/* Shimmer while loading */}
                {loading && (
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10">
                    <div className="absolute inset-0 animate-[shimmer_1.4s_infinite]"
                      style={{ background: "linear-gradient(90deg,transparent,rgba(168,85,247,.07),transparent)" }} />
                  </div>
                )}
                <textarea
                  readOnly
                  value={result}
                  placeholder={loading ? "Translating…" : "Your translation appears here…"}
                  className="w-full min-h-[260px] rounded-2xl text-slate-200 text-[1rem] leading-7 font-light
                    placeholder:text-slate-600 resize-none outline-none p-5
                    transition-all duration-300
                    focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50"
                  style={{
                    background: "rgba(255,255,255,.035)",
                    border: "1px solid rgba(255,255,255,.08)",
                  }}
                />
              </div>
            </div>

          </div>

          {/* ── Bottom controls ── */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center flex-wrap gap-4 pt-4"
            style={{ borderTop: "1px solid rgba(255,255,255,.05)" }}
          >
            {/* Error */}
            {error && (
              <div className="w-full text-center text-red-400 text-sm rounded-xl px-4 py-2"
                style={{ background: "rgba(248,113,113,.08)", border: "1px solid rgba(248,113,113,.2)" }}>
                {error}
              </div>
            )}

            {/* Language select */}
            <div className="relative flex items-center">
              <Globe size={13} className="absolute left-3 text-slate-500 pointer-events-none" />
              <select
                value={lang}
                onChange={(e) => { setLang(e.target.value); setResult(""); setError(""); }}
                className="appearance-none text-slate-200 text-sm rounded-2xl
                  pl-9 pr-9 py-3 cursor-pointer outline-none min-w-[210px]
                  transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.09)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <option value="" disabled>— Select a language —</option>
                {LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code} style={{ background: "#0d1b2a" }}>
                    {l.flag}  {l.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 text-slate-500 text-[0.6rem] pointer-events-none">▾</span>
            </div>

            {/* Translate button */}
            <button
              onClick={handleTranslate}
              disabled={loading}
              className="relative overflow-hidden flex items-center gap-2 justify-center
                px-8 py-3 rounded-2xl font-bold text-white text-sm tracking-wider
                transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                min-w-[150px]"
              style={{
                fontFamily: "'Syne',sans-serif",
                background: "linear-gradient(135deg,#38b6ff,#a855f7)",
                boxShadow: "0 4px 26px rgba(56,182,255,.26)",
              }}
            >
              {loading ? (
                <>
                  <Loader size={15} className="animate-spin" />
                  Translating…
                </>
              ) : (
                <>
                  <Globe size={15} />
                  Translate
                </>
              )}
            </button>

          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="w-full max-w-5xl flex flex-wrap justify-between items-center gap-2 text-slate-600 text-xs">
          <span>© {new Date().getFullYear()} LingoTongue. All rights reserved.</span>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a key={link} href="#" className="text-slate-500 hover:text-[#38b6ff] transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>
        </footer>

      </div>

      {/* ── Global keyframes (minimal — only what Tailwind can't do) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes iconPulse {
          0%,100% { box-shadow: 0 0 24px rgba(56,182,255,.28); }
          50%      { box-shadow: 0 0 48px rgba(168,85,247,.44); }
        }
        @keyframes cardIn {
          from { opacity:0; transform:translateY(20px) scale(.985); }
          to   { opacity:1; transform:none; }
        }
        @keyframes shimmer {
          from { transform:translateX(-100%); }
          to   { transform:translateX(100%); }
        }

        select:hover, select:focus {
          border-color: rgba(168,85,247,.4) !important;
          background: rgba(168,85,247,.05) !important;
          box-shadow: 0 0 0 3px rgba(168,85,247,.08);
        }
        textarea:focus {
          border-color: rgba(56,182,255,.4) !important;
          background: rgba(56,182,255,.04) !important;
        }
      `}</style>
    </div>
  );
}