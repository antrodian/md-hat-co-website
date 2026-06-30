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
  const floatRef = useRef<HTMLDivElement>(null);
  const antlerRef = useRef<SVGPathElement>(null);      // dark burned line
  const antlerGlowRef = useRef<SVGPathElement>(null);  // hot orange glow that cools
  const sewRef = useRef<SVGCircleElement>(null);       // stitch reveal mask
  const needleRef = useRef<SVGGElement>(null);         // glowing needle point on the rim
  const shockRef = useRef<SVGCircleElement>(null);     // stamp-press shockwave
  const heatRef = useRef<SVGCircleElement>(null);      // branding heat bloom
  const sheenRef = useRef<SVGRectElement>(null);       // specular sweep
  const sparksRef = useRef<SVGGElement>(null);         // burn embers
  const runnerRef = useRef<SVGGElement>(null);         // perpetual needle running the seam
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
      // Finished patch: fully tooled + sewn, heat/motion FX off.
      gsap.set([antlerRef.current, antlerGlowRef.current, sewRef.current], { strokeDashoffset: 0 });
      gsap.set([antlerGlowRef.current, needleRef.current, shockRef.current, heatRef.current, sheenRef.current, runnerRef.current], { opacity: 0 });
      return;
    }

    gsap.set(eyebrowRef.current, { opacity: 0, x: -14 });
    gsap.set(headlineRef.current, { opacity: 1 });
    gsap.set(lines, { opacity: 0, y: 50 });
    gsap.set(subRef.current, { opacity: 0, y: 20 });
    gsap.set(ctaRef.current, { opacity: 0, y: 16 });
    gsap.set(specRef.current, { opacity: 0, y: 12 });
    gsap.set(productRef.current, { opacity: 0, scale: 0.7, y: 30 });
    gsap.set([antlerRef.current, antlerGlowRef.current, sewRef.current], { strokeDashoffset: 1 });
    gsap.set(antlerGlowRef.current, { opacity: 1 });
    gsap.set([needleRef.current, shockRef.current, heatRef.current, sheenRef.current], { opacity: 0 });

    const sparks = sparksRef.current ? Array.from(sparksRef.current.children) : [];
    gsap.set(sparks, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1) Stamp-press — blank disc lands with overshoot, shockwave ripples out.
    tl.to(productRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "back.out(1.7)" }, 0.1)
      .fromTo(shockRef.current,
        { attr: { r: 48 }, opacity: 0.6, strokeWidth: 3 },
        { attr: { r: 104 }, opacity: 0, strokeWidth: 0.4, duration: 0.85, ease: "power2.out" }, 0.62)

    // 2) Copy rises in.
      .to(eyebrowRef.current, { opacity: 1, x: 0, duration: 0.6 }, 0.4)
      .to(lines, { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" }, 0.5)

    // 3) Branding iron — heat bloom, antler burns on hot, embers fly, then cools to dark.
      .to(heatRef.current, { opacity: 0.78, duration: 0.45, ease: "power2.out" }, 0.95)
      .to([antlerGlowRef.current, antlerRef.current], { strokeDashoffset: 0, duration: 1.05, ease: "power1.inOut" }, 1.0)
      .fromTo(sparks,
        { opacity: 0.95, y: 5, scale: 1 },
        { opacity: 0, y: -24, scale: 0.35, stagger: 0.06, duration: 0.95, ease: "power1.out" }, 1.5)
      .to(heatRef.current, { opacity: 0, duration: 0.9, ease: "power2.out" }, 1.95)
      .to(antlerGlowRef.current, { opacity: 0, duration: 0.95, ease: "power2.out" }, 2.05)

    // 4) Needle sews the rim — a glowing point leads the stitch reveal around.
      .set(needleRef.current, { opacity: 1 }, 2.0)
      .to(sewRef.current, { strokeDashoffset: 0, duration: 1.25, ease: "power2.inOut" }, 2.0)
      .to(needleRef.current, { rotation: 360, svgOrigin: "100 100", duration: 1.25, ease: "power2.inOut" }, 2.0)
      .to(needleRef.current, { opacity: 0, duration: 0.4, ease: "power1.out" }, 3.05)

    // 5) Remaining copy.
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.1)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.3)
      .to(specRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.5);

    // ── Idle loops — keep the patch alive after the build ──
    // Perpetual needle running the seam — the always-on "sewing" motion.
    gsap.set(runnerRef.current, { opacity: 0 });
    const runnerFade = gsap.to(runnerRef.current, { opacity: 1, duration: 0.7, delay: 3.3, ease: "power1.out" });
    const runnerSpin = gsap.to(runnerRef.current, {
      rotation: 360, svgOrigin: "100 100", duration: 5.5, ease: "none", repeat: -1, delay: 3.3,
    });

    // Specular sheen sweeping across the domed leather.
    const sheenTl = gsap.timeline({ repeat: -1, repeatDelay: 2.8, delay: 3.4 });
    sheenTl.fromTo(sheenRef.current, { x: -120, opacity: 0 }, { opacity: 0.58, duration: 0.35, ease: "power1.in" }, 0)
      .to(sheenRef.current, { x: 150, duration: 1.5, ease: "sine.inOut" }, 0)
      .to(sheenRef.current, { opacity: 0, duration: 0.45, ease: "power1.out" }, 1.05);

    // Gentle 3D float so it breathes at rest.
    const floatTw = gsap.to(floatRef.current, {
      y: -7, rotation: 1.1, duration: 3.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2.6,
    });

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
      tl.kill();
      sheenTl.kill();
      floatTw.kill();
      runnerFade.kill();
      runnerSpin.kill();
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

            {/* Dashed inner ring — slow counter-rotation */}
            <div aria-hidden className="absolute inset-[11%] rounded-full border border-dashed border-[#C7B291]/25 motion-safe:[animation:spin_52s_linear_infinite_reverse]" />

            {/* ── The leather patch: pressed in, branded, then sewn ── */}
            <div ref={floatRef} className="absolute inset-[15%]">
              <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                <defs>
                  <radialGradient id="leather" cx="40%" cy="32%" r="76%">
                    <stop offset="0%" stopColor="#E4D3B0" />
                    <stop offset="38%" stopColor="#C2A375" />
                    <stop offset="72%" stopColor="#87663A" />
                    <stop offset="100%" stopColor="#4C3520" />
                  </radialGradient>
                  <linearGradient id="bevel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EBDAB6" />
                    <stop offset="48%" stopColor="#A98A5E" />
                    <stop offset="100%" stopColor="#3E2C19" />
                  </linearGradient>
                  <radialGradient id="recess" cx="50%" cy="56%" r="54%">
                    <stop offset="52%" stopColor="#241809" stopOpacity="0" />
                    <stop offset="100%" stopColor="#1d1206" stopOpacity="0.42" />
                  </radialGradient>
                  <radialGradient id="heatGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFD9A0" />
                    <stop offset="38%" stopColor="#FF7A18" />
                    <stop offset="100%" stopColor="#FF7A18" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="sheenGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0" />
                    <stop offset="50%" stopColor="#fff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                  <filter id="discShadow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0b0704" floodOpacity="0.6" />
                  </filter>
                  <filter id="leatherGrain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                    <feComponentTransfer><feFuncA type="linear" slope="0.09" /></feComponentTransfer>
                    <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="2.4" />
                  </filter>
                  <clipPath id="discClip"><circle cx="100" cy="100" r="80" /></clipPath>
                  {/* Sewing reveal: this stroke draws around and unveils the stitches */}
                  <mask id="sew">
                    <rect width="200" height="200" fill="black" />
                    <circle ref={sewRef} cx="100" cy="100" r="73" fill="none" stroke="#fff" strokeWidth="7"
                      pathLength={1} strokeDasharray={1} strokeDashoffset={1} transform="rotate(-90 100 100)" />
                  </mask>
                </defs>

                {/* Disc body + grain */}
                <circle cx="100" cy="100" r="80" fill="url(#leather)" filter="url(#discShadow)" />
                <circle cx="100" cy="100" r="80" fill="#000" filter="url(#leatherGrain)" opacity="0.5" clipPath="url(#discClip)" />

                {/* Raised beveled rim */}
                <circle cx="100" cy="100" r="76.5" fill="none" stroke="url(#bevel)" strokeWidth="6" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="#3A2917" strokeWidth="1.2" opacity="0.7" />

                {/* Specular sheen sweep (clipped to the disc) */}
                <g clipPath="url(#discClip)">
                  <g transform="rotate(20 100 100)" style={{ mixBlendMode: "overlay" }}>
                    <rect ref={sheenRef} x="74" y="-30" width="42" height="260" fill="url(#sheenGrad)" opacity="0" />
                  </g>
                </g>

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

                {/* Branding heat bloom — rises during the burn, then cools off */}
                <circle ref={heatRef} cx="100" cy="101" r="34" fill="url(#heatGrad)" opacity="0" filter="url(#softGlow)" />

                {/* Antler mark — hot glow draws on, dark burn follows, glow then cools */}
                <g transform="translate(100 101) scale(2.15) translate(-24 -24)">
                  <path ref={antlerGlowRef} d={ANTLER_D} fill="none" stroke="#FF8A24" strokeWidth="3.4"
                    strokeLinecap="round" strokeLinejoin="round" filter="url(#softGlow)"
                    pathLength={1} strokeDasharray={1} strokeDashoffset={1} />
                  <path ref={antlerRef} d={ANTLER_D} fill="none" stroke="#241710" strokeWidth="2.7"
                    strokeLinecap="round" strokeLinejoin="round"
                    pathLength={1} strokeDasharray={1} strokeDashoffset={1} />
                </g>

                {/* Burn embers */}
                <g ref={sparksRef}>
                  <circle cx="92" cy="86" r="1.6" fill="#FFC074" />
                  <circle cx="108" cy="92" r="1.3" fill="#FF9A3C" />
                  <circle cx="96" cy="108" r="1.5" fill="#FFD79E" />
                  <circle cx="110" cy="112" r="1.2" fill="#FF9A3C" />
                  <circle cx="100" cy="80" r="1.3" fill="#FFC074" />
                  <circle cx="89" cy="100" r="1.1" fill="#FFD79E" />
                </g>

                {/* Glowing needle point leading the stitch around the rim (build) */}
                <g ref={needleRef} opacity="0">
                  <circle cx="100" cy="27" r="3.6" fill="#FFF4DE" filter="url(#softGlow)" />
                  <circle cx="100" cy="27" r="1.7" fill="#fff" />
                </g>

                {/* Perpetual seam runner — a glowing point + comet trail forever working the rim */}
                <g ref={runnerRef} opacity="0">
                  <circle cx="100" cy="100" r="73" fill="none" stroke="#FFE9C2" strokeWidth="2.6"
                    strokeLinecap="round" pathLength={1} strokeDasharray="0.06 0.94"
                    transform="rotate(-90 100 100)" opacity="0.55" filter="url(#softGlow)" />
                  <circle cx="100" cy="27" r="3.1" fill="#FFF4DE" filter="url(#softGlow)" />
                  <circle cx="100" cy="27" r="1.5" fill="#fff" />
                </g>

                {/* Stamp-press shockwave */}
                <circle ref={shockRef} cx="100" cy="100" r="48" fill="none" stroke="#E5D2A6" strokeWidth="3" opacity="0" />
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
