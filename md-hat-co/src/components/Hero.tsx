"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Antlers, ArrowRight } from "@/components/Icons";

// The MD antler mark, as drawable strokes (pathLength-normalized for the
// draw-on). Mirrors the Antlers icon but lives here so GSAP can animate it.
const ANTLER_D =
  "M24 44V22M24 22c0-4-3-6-3-10 0-3 1.5-5 1.5-8M24 22c0-4 3-6 3-10 0-3-1.5-5-1.5-8 M21 12c-2.5 1-4 0-6-2M27 12c2.5 1 4 0 6-2 M21.5 18c-3 1.5-5.5 1-8.5-1.5M26.5 18c3 1.5 5.5 1 8.5-1.5 M24 22c-3.5 2-6 1.5-9.5-1M24 22c3.5 2 6 1.5 9.5-1";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const specRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const antlerRef = useRef<SVGPathElement>(null);
  const sewRef = useRef<SVGCircleElement>(null);
  const cta1Ref = useRef<HTMLAnchorElement>(null);
  const cta2Ref = useRef<HTMLAnchorElement>(null);

  const makeMagnetic = useCallback((el: HTMLAnchorElement | null) => {
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.sqrt(dx * dx + dy * dy) < 90) {
        gsap.to(el, { x: dx * 0.26, y: dy * 0.26, duration: 0.45, ease: "power2.out" });
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: "power2.out" });
      }
    };
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set([eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current,
                specRef.current, productRef.current, ...lines], { opacity: 1, x: 0, y: 0, scale: 1 });
      gsap.set([antlerRef.current, sewRef.current], { strokeDashoffset: 0 }); // patch fully tooled + sewn
      return;
    }

    gsap.set(eyebrowRef.current, { opacity: 0, x: -14 });
    gsap.set(headlineRef.current, { opacity: 1 });
    gsap.set(lines, { opacity: 0, y: 50 });
    gsap.set(subRef.current, { opacity: 0, y: 20 });
    gsap.set(ctaRef.current, { opacity: 0, y: 16 });
    gsap.set(specRef.current, { opacity: 0, y: 12 });
    gsap.set(productRef.current, { opacity: 0, scale: 0.86, y: 26 });
    gsap.set([antlerRef.current, sewRef.current], { strokeDashoffset: 1 }); // un-drawn

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(productRef.current, { opacity: 1, scale: 1, y: 0, duration: 1.1, ease: "power2.out" }, 0.1)
      .to(eyebrowRef.current, { opacity: 1, x: 0, duration: 0.6 }, 0.35)
      .to(lines, { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" }, 0.45)
      // The patch comes to life: antler mark tools in, then the stitch sews the rim.
      .to(antlerRef.current, { strokeDashoffset: 0, duration: 0.95, ease: "power1.inOut" }, 0.7)
      .to(sewRef.current, { strokeDashoffset: 0, duration: 1.15, ease: "power1.inOut" }, 1.25)
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.05)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.25)
      .to(specRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.4);

    // Cursor parallax on the product
    const onMouseMove = (e: MouseEvent) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 2;
      const my = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(tiltRef.current, {
        rotateY: mx * 9, rotateX: -my * 6, x: mx * 10, y: my * 8,
        duration: 0.9, ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    const c1 = makeMagnetic(cta1Ref.current);
    const c2 = makeMagnetic(cta2Ref.current);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      c1?.();
      c2?.();
    };
  }, [makeMagnetic]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#211A12]"
    >
      {/* Bottomland camo texture — the signature, kept low and atmospheric */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 opacity-[0.11] pointer-events-none"
        style={{ backgroundImage: "url(/camo.svg)", backgroundSize: "620px", backgroundPosition: "center" }}
      />
      {/* Depth gradients */}
      <div aria-hidden className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 90% 75% at 68% 38%, rgba(106,111,67,0.20) 0%, transparent 60%)" }} />
      {/* Left scrim — guarantees headline/copy legibility over the camo texture */}
      <div aria-hidden className="absolute inset-0 z-[1] pointer-events-none lg:block hidden"
        style={{ background: "linear-gradient(100deg, rgba(20,15,9,0.88) 0%, rgba(20,15,9,0.55) 36%, transparent 66%)" }} />
      <div aria-hidden className="absolute inset-0 z-[1] pointer-events-none lg:hidden"
        style={{ background: "rgba(20,15,9,0.55)" }} />
      <div aria-hidden className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 120% 90% at 50% 50%, transparent 30%, rgba(20,15,9,0.55) 78%, rgba(20,15,9,0.92) 100%)" }} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 z-[1] pointer-events-none bg-gradient-to-t from-[#211A12] to-transparent" />
      {/* Film grain */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 lg:gap-8">
        {/* ── Copy ─────────────────────────────────────────────────────── */}
        <div className="text-center lg:text-left">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="mb-7 flex items-center gap-3 justify-center lg:justify-start">
            <Antlers className="w-6 h-6 text-[#6A6F43]" />
            <span
              className="text-[#C7B291] text-[0.66rem] sm:text-xs tracking-[0.34em] uppercase"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Est. 2023 — Southern Craftsmanship
            </span>
          </div>

          {/* Headline */}
          <div ref={headlineRef} className="leading-[0.95]">
            <h1 ref={line1Ref}
              className="text-[#F2EEE6] text-[3.4rem] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem] font-black leading-[0.95] tracking-[-0.03em] pb-[0.04em]"
              style={{ fontFamily: "var(--font-roboto-slab)" }}>
              CUSTOM HATS.
            </h1>
            <h1 ref={line2Ref}
              className="text-[#F2EEE6] text-[3.4rem] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem] font-black leading-[0.95] tracking-[-0.03em] pb-[0.04em]"
              style={{ fontFamily: "var(--font-roboto-slab)" }}>
              BUILT FOR
            </h1>
            <h1 ref={line3Ref}
              className="text-[#C7B291] text-[3.4rem] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem] font-black leading-[0.95] tracking-[-0.03em] pb-[0.08em] [text-shadow:0_2px_16px_rgba(0,0,0,0.45)]"
              style={{ fontFamily: "var(--font-roboto-slab)" }}>
              THE HUNT.
            </h1>
          </div>

          <p ref={subRef}
            className="mt-7 text-[#F2EEE6]/65 text-base sm:text-lg leading-[1.7] max-w-md mx-auto lg:mx-0"
            style={{ fontFamily: "var(--font-montserrat)" }}>
            Premium blank hats. Custom leather patches. Made for the outdoors and
            the lifestyle of those who live for the hunt.
          </p>

          <div ref={ctaRef} className="mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link ref={cta1Ref} href="/shop"
              className="group inline-flex items-center justify-center gap-3 bg-[#3E4B34] hover:bg-[#6A6F43] text-[#F2EEE6] px-8 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7B291] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211A12]"
              style={{ fontFamily: "var(--font-montserrat)", willChange: "transform" }}>
              Shop Hats
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link ref={cta2Ref} href="/custom-order"
              className="group inline-flex items-center justify-center gap-3 border border-[#C7B291]/45 hover:border-[#C7B291] text-[#F2EEE6]/85 hover:text-[#F2EEE6] hover:bg-[#F2EEE6]/[0.04] px-8 py-4 text-xs tracking-[0.18em] uppercase font-semibold transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7B291] focus-visible:ring-offset-2 focus-visible:ring-offset-[#211A12]"
              style={{ fontFamily: "var(--font-montserrat)", willChange: "transform" }}>
              Custom Patches
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Spec line */}
          <div ref={specRef}
            className="mt-9 flex items-center gap-3 justify-center lg:justify-start text-[#C7B291]/70 text-[0.62rem] sm:text-[0.68rem] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-montserrat)" }}>
            <span>Richardson 112</span>
            <span className="w-1 h-1 rotate-45 bg-[#6B4F33]" />
            <span>Full-grain patch</span>
            <span className="w-1 h-1 rotate-45 bg-[#6B4F33]" />
            <span>Hand-stitched</span>
          </div>
        </div>

        {/* ── Product ──────────────────────────────────────────────────── */}
        <div ref={productRef} className="relative flex items-center justify-center"
          style={{ perspective: "1100px" }}>
          <div ref={tiltRef} className="relative w-[min(86vw,460px)] aspect-square"
            style={{ transformStyle: "preserve-3d" }}>
            {/* Warm spotlight glow — blaze accent, slow breathing pulse */}
            <div aria-hidden className="absolute inset-0 pointer-events-none motion-safe:[animation:glowPulse_6s_ease-in-out_infinite]"
              style={{ background: "radial-gradient(circle at 50% 47%, rgba(212,108,40,0.42) 0%, rgba(106,111,67,0.16) 34%, transparent 62%)", filter: "blur(10px)" }} />

            {/* Rotating stamp ring — circular brand text */}
            <div aria-hidden className="absolute inset-[2%] motion-safe:animate-[spin_38s_linear_infinite] opacity-60"
              style={{ animationName: "spin" }}>
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <path id="stampcircle" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
                </defs>
                <text fill="#C7B291" style={{ fontFamily: "var(--font-montserrat)", fontSize: "9.5px", letterSpacing: "5px", fontWeight: 600 }}>
                  <textPath href="#stampcircle" startOffset="0%">
                    CUSTOM LEATHER PATCHES • BUILT FOR THE HUNT •&nbsp;
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Dashed inner ring */}
            <div aria-hidden className="absolute inset-[11%] rounded-full border border-dashed border-[#C7B291]/25" />

            {/* ── The leather patch — antler tools in, then the stitch sews the rim ── */}
            <div className="absolute inset-[15%]">
              <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                <defs>
                  <radialGradient id="leather" cx="40%" cy="33%" r="74%">
                    <stop offset="0%" stopColor="#DCC9A6" />
                    <stop offset="40%" stopColor="#BD9D6E" />
                    <stop offset="72%" stopColor="#846035" />
                    <stop offset="100%" stopColor="#533B23" />
                  </radialGradient>
                  <radialGradient id="recess" cx="50%" cy="55%" r="52%">
                    <stop offset="55%" stopColor="#241809" stopOpacity="0" />
                    <stop offset="100%" stopColor="#241809" stopOpacity="0.32" />
                  </radialGradient>
                  <filter id="discShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="7" stdDeviation="9" floodColor="#0b0704" floodOpacity="0.55" />
                  </filter>
                  <filter id="leatherGrain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.09" /></feComponentTransfer>
                    <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  {/* Sewing reveal: this stroke draws around and unveils the stitches */}
                  <mask id="sew">
                    <rect width="200" height="200" fill="black" />
                    <circle ref={sewRef} cx="100" cy="100" r="73" fill="none" stroke="#fff" strokeWidth="7"
                      pathLength={1} strokeDasharray={1} strokeDashoffset={1} transform="rotate(-90 100 100)" />
                  </mask>
                </defs>

                {/* Leather disc + grain + edge */}
                <circle cx="100" cy="100" r="80" fill="url(#leather)" filter="url(#discShadow)" />
                <circle cx="100" cy="100" r="80" fill="#000" filter="url(#leatherGrain)" opacity="0.5" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#3A2917" strokeWidth="1.4" opacity="0.6" />

                {/* Tooled groove + stamped recess */}
                <circle cx="100" cy="100" r="70" fill="none" stroke="#4A3220" strokeWidth="1.4" opacity="0.5" />
                <circle cx="100" cy="100" r="62" fill="url(#recess)" />
                <circle cx="100" cy="100" r="62" fill="none" stroke="#EAD8B4" strokeWidth="1" opacity="0.16" />

                {/* Running stitch — recessed shadow + bone thread, revealed by the mask */}
                <g mask="url(#sew)">
                  <circle cx="100" cy="100" r="73" fill="none" stroke="#2E2012" strokeWidth="3.4"
                    strokeDasharray="2.4 5.2" strokeLinecap="round" opacity="0.45" transform="rotate(-90 100 100)" />
                  <circle cx="100" cy="100" r="73" fill="none" stroke="#ECE0C6" strokeWidth="2.4"
                    strokeDasharray="2.4 5.2" strokeLinecap="round" transform="rotate(-90 100 100)" />
                </g>

                {/* Antler mark — burned bold into the leather, draws on stroke-by-stroke */}
                <g transform="translate(100 101) scale(2.15) translate(-24 -24)">
                  <path ref={antlerRef} d={ANTLER_D} fill="none" stroke="#241710"
                    strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round"
                    pathLength={1} strokeDasharray={1} strokeDashoffset={1} />
                </g>
              </svg>
            </div>

            {/* Ember motes drifting off the leather */}
            <span aria-hidden className="absolute left-[20%] top-[16%] w-1.5 h-1.5 rounded-full bg-[#C77B3B] opacity-0 motion-safe:[animation:emberFloat_6.5s_ease-in-out_infinite]" style={{ animationDelay: "0.3s" }} />
            <span aria-hidden className="absolute right-[18%] top-[24%] w-1 h-1 rounded-full bg-[#C7B291] opacity-0 motion-safe:[animation:emberFloat_7.5s_ease-in-out_infinite]" style={{ animationDelay: "1.4s" }} />
            <span aria-hidden className="absolute left-[30%] bottom-[20%] w-1 h-1 rounded-full bg-[#C77B3B] opacity-0 motion-safe:[animation:emberFloat_8s_ease-in-out_infinite]" style={{ animationDelay: "2.6s" }} />
            <span aria-hidden className="absolute right-[26%] bottom-[26%] w-1.5 h-1.5 rounded-full bg-[#C7B291] opacity-0 motion-safe:[animation:emberFloat_7s_ease-in-out_infinite]" style={{ animationDelay: "3.7s" }} />

            {/* Floating spec chip */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 lg:left-auto lg:right-[2%] lg:translate-x-0 bg-[#211A12]/85 backdrop-blur-sm border border-[#6B4F33]/50 px-4 py-2.5 flex items-center gap-2.5">
              <Antlers className="w-5 h-5 text-[#6A6F43]" />
              <span className="text-[#F2EEE6] text-[0.6rem] tracking-[0.18em] uppercase font-semibold"
                style={{ fontFamily: "var(--font-montserrat)" }}>
                Hand-tooled leather
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 opacity-40">
        <span className="text-[#C7B291] text-[0.58rem] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-montserrat)" }}>
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#6A6F43] to-transparent" />
      </div>
    </section>
  );
}
