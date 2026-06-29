"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";

// Smoke wisps rise from the strike point after impact
const SMOKE = [
  { left: "47%", drift: -32, size: 24, delay: 0,    dur: 1.9 },
  { left: "50%", drift:   6, size: 20, delay: 0.12, dur: 1.7 },
  { left: "53%", drift:  38, size: 28, delay: 0.06, dur: 2.2 },
  { left: "45%", drift: -52, size: 16, delay: 0.28, dur: 1.8 },
  { left: "52%", drift:  22, size: 22, delay: 0.2,  dur: 2.1 },
  { left: "48%", drift: -18, size: 14, delay: 0.38, dur: 1.5 },
  { left: "55%", drift:  54, size: 18, delay: 0.24, dur: 2.0 },
];

// Embers spark off the iron on contact — hotter, smaller, faster than smoke
const EMBERS = [
  { x: -120, drift: -25, size: 4, delay: 0.04, dur: 1.4 },
  { x:   90, drift:  45, size: 6, delay: 0.14, dur: 1.7 },
  { x:  -40, drift: -60, size: 3, delay: 0.02, dur: 1.2 },
  { x:  150, drift:  18, size: 5, delay: 0.20, dur: 1.9 },
  { x: -180, drift: -35, size: 4, delay: 0.09, dur: 1.5 },
  { x:  190, drift:  65, size: 3, delay: 0.17, dur: 1.6 },
  { x:  -90, drift: -75, size: 6, delay: 0.06, dur: 1.3 },
  { x:   40, drift:  -8, size: 5, delay: 0.24, dur: 2.0 },
];

// Alpha mask of the longhorn — clips every glow layer to the exact brand silhouette
const MARK = "/brand-mark.png";
const maskStyle: React.CSSProperties = {
  maskImage: `url(${MARK})`,
  WebkitMaskImage: `url(${MARK})`,
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
};

export default function Hero() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const leatherRef      = useRef<HTMLDivElement>(null);
  const spotlightRef    = useRef<HTMLDivElement>(null);
  const charRef         = useRef<HTMLDivElement>(null);
  const ironRef         = useRef<HTMLDivElement>(null);
  const whiteHotRef     = useRef<HTMLDivElement>(null);
  const amberRef        = useRef<HTMLDivElement>(null);
  const haloRef         = useRef<HTMLDivElement>(null);
  const heatHazeRef     = useRef<HTMLDivElement>(null);
  const scorchRef       = useRef<HTMLDivElement>(null);
  const markRef         = useRef<HTMLDivElement>(null);
  const afterglowRef    = useRef<HTMLDivElement>(null);
  const flashRef        = useRef<HTMLDivElement>(null);
  const smokeContRef    = useRef<HTMLDivElement>(null);
  const emberContRef    = useRef<HTMLDivElement>(null);
  const headlineWrapRef = useRef<HTMLDivElement>(null);
  const line1Ref        = useRef<HTMLHeadingElement>(null);
  const line2Ref        = useRef<HTMLHeadingElement>(null);
  const line3Ref        = useRef<HTMLHeadingElement>(null);
  const subRef          = useRef<HTMLParagraphElement>(null);
  const ctaRef          = useRef<HTMLDivElement>(null);
  const badgeRef        = useRef<HTMLDivElement>(null);
  const overlayRef      = useRef<HTMLDivElement>(null);
  const hatRef          = useRef<HTMLDivElement>(null);
  const mouseX          = useRef(0);
  const mouseY          = useRef(0);

  // Magnetic button effect
  const makeMagnetic = useCallback((ref: React.RefObject<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r   = el.getBoundingClientRect();
      const dx  = e.clientX - (r.left + r.width  / 2);
      const dy  = e.clientY - (r.top  + r.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        gsap.to(el, { x: dx * 0.28, y: dy * 0.28, duration: 0.45, ease: "power2.out" });
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: "power2.out" });
      }
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  const cta1Ref = useRef<HTMLAnchorElement>(null);
  const cta2Ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      // Settled state — branded mark resting on leather, content visible. No motion.
      gsap.set([overlayRef.current, whiteHotRef.current, amberRef.current,
                haloRef.current, flashRef.current, heatHazeRef.current], { opacity: 0 });
      gsap.set(leatherRef.current,  { opacity: 0.2 });
      gsap.set(markRef.current,     { opacity: 0 });
      gsap.set(scorchRef.current,   { opacity: 0.55 });
      gsap.set(charRef.current,     { opacity: 0.16 });
      gsap.set([badgeRef.current, headlineWrapRef.current, subRef.current, ctaRef.current], { opacity: 1 });
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    const smokeEls = smokeContRef.current
      ? Array.from(smokeContRef.current.children) as HTMLElement[] : [];
    const emberEls = emberContRef.current
      ? Array.from(emberContRef.current.children) as HTMLElement[] : [];

    // ── Initial states ────────────────────────────────────────────────────
    gsap.set(overlayRef.current,   { opacity: 1 });
    gsap.set(leatherRef.current,   { opacity: 0.55 });
    gsap.set(spotlightRef.current, { opacity: 0, scale: 0.5 });
    gsap.set(charRef.current,      { opacity: 0, scale: 0.7 });
    gsap.set(flashRef.current,     { opacity: 0 });
    gsap.set(haloRef.current,      { opacity: 0, scale: 0.4 });
    gsap.set(ironRef.current,      { y: -170 });
    gsap.set(whiteHotRef.current,  { opacity: 0.35 });   // iron glows as it falls
    gsap.set(amberRef.current,     { opacity: 0 });
    gsap.set(heatHazeRef.current,  { opacity: 0, scaleY: 0.6 });
    gsap.set(scorchRef.current,    { opacity: 0 });
    gsap.set(markRef.current,      { opacity: 0 });
    gsap.set(afterglowRef.current, { opacity: 0 });
    gsap.set(badgeRef.current,     { opacity: 0, x: -12 });
    gsap.set(headlineWrapRef.current, { opacity: 0 });
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], { y: 90 });
    gsap.set(subRef.current,       { opacity: 0, y: 22 });
    gsap.set(ctaRef.current,       { opacity: 0, y: 16 });
    smokeEls.forEach(el => gsap.set(el, { opacity: 0, y: 0, x: 0, scale: 0.3 }));
    emberEls.forEach(el => gsap.set(el, { opacity: 0, y: 0, scale: 0 }));

    tl
      // 1. Strike zone warms — leather brightens, halo blooms
      .to(leatherRef.current,   { opacity: 0.88, duration: 0.7, ease: "power2.in" }, 0.1)
      .to(spotlightRef.current, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.in" }, 0.1)
      .to(haloRef.current,      { opacity: 0.5, scale: 1, duration: 0.6, ease: "power2.in" }, 0.25)

      // 2. Iron descends under gravity
      .to(ironRef.current,      { y: 0, duration: 0.5, ease: "power3.in" }, 0.42)
      .to(whiteHotRef.current,  { opacity: 0.6, duration: 0.5, ease: "power2.in" }, 0.42)

      // 3. IMPACT — flash + screen shake
      .to(flashRef.current,     { opacity: 0.95, duration: 0.05 }, 0.92)
      .to(flashRef.current,     { opacity: 0,    duration: 0.6, ease: "power2.out" }, 0.97)
      .to(containerRef.current, { x:  8, duration: 0.04, ease: "none" }, 0.92)
      .to(containerRef.current, { x: -6, duration: 0.04, ease: "none" }, 0.96)
      .to(containerRef.current, { x:  3, duration: 0.04, ease: "none" }, 1.00)
      .to(containerRef.current, { x:  0, duration: 0.10, ease: "elastic.out(1, 0.5)" }, 1.04)

      // 4. White-hot flood — the brand sears into the hide, then cools
      .to(charRef.current,      { opacity: 0.8, scale: 1, duration: 0.12 }, 0.92)
      .to(whiteHotRef.current,  { opacity: 1, duration: 0.06, ease: "none" }, 0.92)
      .to(haloRef.current,      { opacity: 0.95, scale: 1.5, duration: 0.14 }, 0.92)
      .to(whiteHotRef.current,  { opacity: 0, duration: 0.9, ease: "power2.out" }, 1.0)

      // 5. Cools white → amber → settled oxblood mark
      .to(amberRef.current,     { opacity: 0.95, duration: 0.18 }, 0.98)
      .to(markRef.current,      { opacity: 1, duration: 0.5, ease: "power2.out" }, 1.05)
      .to(scorchRef.current,    { opacity: 0.6, duration: 0.5 }, 1.05)
      .to(amberRef.current,     { opacity: 0.18, duration: 1.4, ease: "power2.out" }, 1.18)
      .to(haloRef.current,      { opacity: 0.12, scale: 0.85, duration: 1.4, ease: "power2.out" }, 1.18)

      // 6. Heat haze shimmers off the fresh brand
      .to(heatHazeRef.current,  { opacity: 0.5, scaleY: 1, duration: 0.3 }, 1.0)
      .to(heatHazeRef.current,  { opacity: 0,   scaleY: 1.5, duration: 1.6, ease: "power1.out" }, 1.2)

      // 7. Afterglow lingers in the burn
      .to(afterglowRef.current, { opacity: 0.4, duration: 0.3 }, 1.1)
      .to(afterglowRef.current, { opacity: 0,   duration: 2.4, ease: "power1.out" }, 1.4);

    // Smoke wisps
    smokeEls.forEach((el, i) => {
      const cfg = SMOKE[i];
      const t   = 1.08 + cfg.delay;
      tl.to(el, { opacity: 0.6, duration: 0.25 }, t)
        .to(el, { opacity: 0, y: -210, x: cfg.drift, scale: 4, duration: cfg.dur, ease: "power1.out" }, t);
    });

    // Ember sparks
    emberEls.forEach((el, i) => {
      const cfg = EMBERS[i];
      const t   = 0.96 + cfg.delay;
      gsap.set(el, { x: cfg.x });
      tl.to(el, { opacity: 1, scale: 1, duration: 0.12 }, t)
        .to(el, { opacity: 0, y: -(150 + i * 12), x: `+=${cfg.drift}`, scale: 0.3, duration: cfg.dur, ease: "power2.out" }, t + 0.05);
    });

    tl
      // 8. Iron lifts away, leaving the brand seared permanently into the hide
      .to(ironRef.current,   { y: -50, opacity: 0, duration: 0.6, ease: "power2.in" }, 1.9)
      // 9. Red heat cools fully to a permanent black scorch beneath the content
      .to(markRef.current,   { opacity: 0, duration: 1.0, ease: "power2.in" }, 2.0)
      .to(scorchRef.current, { opacity: 0.55, duration: 1.0, ease: "power2.out" }, 2.0)
      .to(charRef.current,   { opacity: 0.16, duration: 1.0, ease: "power2.out" }, 1.95)
      .to(leatherRef.current,{ opacity: 0.2,  duration: 1.1, ease: "power2.out" }, 1.9)
      .to(spotlightRef.current, { opacity: 0, duration: 1.0 }, 1.9)

      // 10. Reveal overlay lifts
      .to(overlayRef.current, { opacity: 0.3, duration: 0.7 }, 1.85)
      .to(overlayRef.current, { opacity: 0,   duration: 1.0 }, 2.1)

      // 11. Est. badge clips in
      .to(badgeRef.current,   { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 2.2)

      // 12. Headline curtain reveal
      .set(headlineWrapRef.current, { opacity: 1 }, 2.35)
      .to([line1Ref.current, line2Ref.current, line3Ref.current], {
        y: 0, duration: 0.9, stagger: 0.13, ease: "power4.out",
      }, 2.35)

      // 13. Subtitle + CTA
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 2.9)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 3.15);

    // Cursor parallax on hat display
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(hatRef.current, {
        rotateY:  mouseX.current * 8,
        rotateX: -mouseY.current * 5,
        duration: 0.8, ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    const cleanCta1 = makeMagnetic(cta1Ref as React.RefObject<HTMLAnchorElement>);
    const cleanCta2 = makeMagnetic(cta2Ref as React.RefObject<HTMLAnchorElement>);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cleanCta1?.();
      cleanCta2?.();
    };
  }, [makeMagnetic]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2B2520]"
    >
      {/* Leather branding surface */}
      <div
        ref={leatherRef}
        className="absolute inset-0 z-[4] pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: "url(/leather.jpg)" }}
      />
      {/* Center spotlight on the strike zone */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 55% at 50% 50%, rgba(255,210,150,0.18) 0%, transparent 65%)" }}
      />

      {/* Darkening + legibility — vignette keeps the strike zone leather visible */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 82% 80% at 50% 46%, rgba(20,12,8,0) 0%, rgba(28,20,15,0.34) 56%, rgba(18,11,6,0.82) 100%)" }}
      />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#2B2520]/85 via-transparent to-[#1a0f0a]/35" />
      {/* Film grain */}
      <div
        className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Reveal overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-[#140a05] z-20 pointer-events-none" />

      {/* Impact flash */}
      <div
        ref={flashRef}
        className="absolute inset-0 z-[28] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 520px 320px at 50% 50%, #FFE6B0 0%, #FF9020 32%, transparent 70%)" }}
      />

      {/* ── Brand strike zone ─────────────────────────────────────────────── */}
      <div
        className="absolute z-[25] pointer-events-none"
        style={{
          width: "min(460px, 80vw)", aspectRatio: "568 / 260",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }}
      >
        {/* Char scorch — darkens the hide where the iron sears in */}
        <div
          ref={charRef}
          className="absolute pointer-events-none"
          style={{
            inset: "-45% -16%",
            background: "radial-gradient(ellipse at center, rgba(8,4,1,0.9) 0%, rgba(10,5,2,0.4) 42%, transparent 70%)",
            mixBlendMode: "multiply",
            filter: "blur(22px)",
          }}
        />
        {/* Outer heat halo (unmasked bloom) */}
        <div
          ref={haloRef}
          className="absolute pointer-events-none"
          style={{
            inset: "-60% -22%",
            background: "radial-gradient(ellipse at center, #FFB34766 0%, #C67C3D44 35%, #8B1D1D22 60%, transparent 75%)",
            filter: "blur(34px)",
          }}
        />
        {/* Afterglow ember pooled in the burn */}
        <div
          ref={afterglowRef}
          className="absolute pointer-events-none"
          style={{ ...maskStyle, inset: 0, background: "radial-gradient(ellipse at center, #C67C3D 0%, #8B1D1D 60%, transparent 100%)", filter: "blur(6px)" }}
        />
        {/* Permanent scorch (charred edge burned into leather) */}
        <div
          ref={scorchRef}
          className="absolute pointer-events-none"
          style={{ ...maskStyle, inset: 0, background: "#0a0604", filter: "blur(0.8px)" }}
        />
        {/* Settled brand mark — the real longhorn, embossed into leather */}
        <div
          ref={markRef}
          className="absolute pointer-events-none"
          style={{ inset: 0 }}
        >
          <Image
            src="/brand-mark.png"
            alt="MD Hat Co."
            fill
            priority
            className="object-contain"
            style={{ filter: "saturate(1.15) brightness(0.92) drop-shadow(0 1px 1px rgba(0,0,0,0.55))" }}
          />
        </div>

        {/* Descending hot iron — masked glow layers travel together */}
        <div ref={ironRef} className="absolute pointer-events-none" style={{ inset: 0 }}>
          {/* Amber (cooling) */}
          <div
            ref={amberRef}
            className="absolute pointer-events-none"
            style={{ ...maskStyle, inset: 0, background: "radial-gradient(ellipse 95% 95% at 50% 50%, #FFB347 0%, #E8731E 55%, #B5471A 100%)", filter: "blur(0.5px)" }}
          />
          {/* White-hot core */}
          <div
            ref={whiteHotRef}
            className="absolute pointer-events-none"
            style={{ ...maskStyle, inset: 0, background: "radial-gradient(ellipse 96% 96% at 50% 46%, #FFFFFF 0%, #FFE9B0 50%, #FFB347 82%, #FF8A1F 100%)", filter: "blur(0.5px)", mixBlendMode: "screen" }}
          />
          {/* Heat haze rising off the iron */}
          <div
            ref={heatHazeRef}
            className="absolute pointer-events-none"
            style={{
              left: 0, right: 0, bottom: "30%", height: "70%", transformOrigin: "bottom",
              background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(255,180,90,0.25) 0%, transparent 70%)",
              filter: "blur(10px)",
            }}
          />
        </div>
      </div>

      {/* Smoke wisps */}
      <div ref={smokeContRef} className="absolute inset-0 z-[27] pointer-events-none">
        {SMOKE.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: s.size, height: s.size,
              top: "50%", left: s.left, transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(205,195,185,0.85) 0%, rgba(180,170,160,0) 70%)",
              filter: "blur(5px)",
            }}
          />
        ))}
      </div>

      {/* Ember sparks */}
      <div
        ref={emberContRef}
        className="absolute z-[27] pointer-events-none"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        {EMBERS.map((e, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: e.size, height: e.size, top: 0, left: 0,
              background: i % 2 === 0
                ? "radial-gradient(circle, #FFD060 0%, #FF8C00 60%, transparent 100%)"
                : "radial-gradient(circle, #FFF0A0 0%, #C67C3D 60%, transparent 100%)",
              boxShadow: `0 0 ${e.size * 2}px ${e.size}px rgba(198,124,61,0.6)`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 text-center lg:text-left">

          {/* Est. badge */}
          <div ref={badgeRef} className="mb-8 flex justify-center lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-px h-8 bg-[#C67C3D]" />
              <span
                className="text-[#C67C3D] text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Est. 2024
              </span>
              <div className="w-px h-8 bg-[#C67C3D]" />
            </div>
          </div>

          {/* Headline — each line in overflow-hidden for curtain reveal */}
          <div ref={headlineWrapRef} style={{ opacity: 0 }}>
            <div className="overflow-hidden leading-none mb-1">
              <h1
                ref={line1Ref}
                className="text-[#F2E9DD] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-[-0.015em]"
                style={{ fontFamily: "var(--font-zilla)", fontWeight: 700 }}
              >
                BUILT FOR
              </h1>
            </div>
            <div className="overflow-hidden leading-none mb-1">
              <h1
                ref={line2Ref}
                className="text-[#F2E9DD] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-[-0.015em]"
                style={{ fontFamily: "var(--font-zilla)", fontWeight: 700 }}
              >
                THE{" "}
                <span className="text-[#C67C3D]">OUTDOORS.</span>
              </h1>
            </div>
            <div className="overflow-hidden leading-none">
              <h1
                ref={line3Ref}
                className="text-[#F2E9DD] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-[-0.015em]"
                style={{ fontFamily: "var(--font-zilla)", fontWeight: 700 }}
              >
                MADE TO LAST.
              </h1>
            </div>
          </div>

          <p
            ref={subRef}
            className="mt-8 text-[#8C857C] text-sm sm:text-base tracking-[0.1em] max-w-md mx-auto lg:mx-0 leading-relaxed"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Custom leather patch hats designed for every trail and every town.
            Authentic craftsmanship. Premium materials. Timeless style.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              ref={cta1Ref}
              href="/shop"
              className="inline-flex items-center justify-center gap-3 bg-[#8B1D1D] hover:bg-[#C67C3D] text-[#F2E9DD] px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors duration-300 cursor-pointer"
              style={{ fontFamily: "var(--font-montserrat)", willChange: "transform" }}
            >
              Shop Hats <span className="text-base">→</span>
            </a>
            <a
              ref={cta2Ref}
              href="/custom-order"
              className="inline-flex items-center justify-center gap-3 border border-[#C67C3D] text-[#C67C3D] hover:bg-[#C67C3D] hover:text-[#F2E9DD] px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors duration-300 cursor-pointer"
              style={{ fontFamily: "var(--font-montserrat)", willChange: "transform" }}
            >
              Customize Patch <span className="text-base">→</span>
            </a>
          </div>
        </div>

        {/* Hat display */}
        <div
          ref={hatRef}
          className="flex-1 flex items-center justify-center"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          <div className="relative w-80 h-80 flex items-center justify-center">
            <div className="w-72 h-72 bg-[#3B2314]/40 border border-[#C67C3D]/20 flex items-center justify-center">
              <div className="text-center">
                {/* SVG hat silhouette placeholder */}
                <svg width="72" height="52" viewBox="0 0 72 52" fill="none" className="mx-auto mb-4 opacity-30">
                  <ellipse cx="36" cy="44" rx="36" ry="8" fill="#C67C3D" />
                  <path d="M12 44 C12 44 16 20 36 18 C56 20 60 44 60 44" fill="#C67C3D" />
                  <path d="M22 20 C22 10 28 4 36 4 C44 4 50 10 50 20" fill="#C67C3D" />
                </svg>
                <p
                  className="text-[#8C857C] text-xs tracking-widest uppercase"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Product Photo
                </p>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C67C3D]/60" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C67C3D]/60" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C67C3D]/60" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C67C3D]/60" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-40">
        <span
          className="text-[#8C857C] text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#C67C3D] to-transparent animate-pulse" />
      </div>
    </section>
  );
}
