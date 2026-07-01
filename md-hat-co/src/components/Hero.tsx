"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Antlers, ArrowRight } from "@/components/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Saddle-stitch ticks around the patch rim — short diagonal marks (not round dots),
// the way a hand-sewn edge actually reads. Static geometry, computed once.
const STITCH_R = 73;
const STITCH_COUNT = 40;
// One full sewing pass, seconds. The needle's stepped rotation and each stitch's
// snap-taut reveal both derive their rhythm from this, so they stay in lockstep.
const SEW_DUR = 2;
// Math.sin/cos aren't guaranteed bit-identical across JS engines (server Node vs client
// browser), so raw trig output can differ in the last float digit and trip React's
// hydration-mismatch check. Rounding collapses both sides to the same value.
const round3 = (n: number) => Math.round(n * 1000) / 1000;
const stitchTicks = Array.from({ length: STITCH_COUNT }, (_, i) => {
  const a = (i / STITCH_COUNT) * Math.PI * 2;
  // Deterministic per-stitch jitter (hash of index, not Math.random) so length, lean and
  // radius vary like hand sewing while server and client still render identical markup.
  const jit = (s: number) => {
    const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
    return x - Math.floor(x) - 0.5;
  };
  const r = STITCH_R + jit(1) * 0.9;
  const cx = 100 + r * Math.cos(a);
  const cy = 100 + r * Math.sin(a);
  // mostly tangential with a slight radial lean, so each tick sits diagonal to the seam
  const lean = 0.38 + jit(2) * 0.12;
  const dx = -Math.sin(a) * 0.92 + Math.cos(a) * lean;
  const dy = Math.cos(a) * 0.92 + Math.sin(a) * lean;
  const len = Math.hypot(dx, dy);
  const half = 2.45 + jit(3) * 0.55;
  const ux = (dx / len) * half;
  const uy = (dy / len) * half;
  return {
    x1: round3(cx - ux), y1: round3(cy - uy),
    x2: round3(cx + ux), y2: round3(cy + uy),
    hx: round3(cx), hy: round3(cy),
  };
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const copyColRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const specRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const productFadeRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<SVGGElement>(null);           // MD maker's mark, branded in
  const stitchesRef = useRef<SVGGElement>(null);       // per-stitch groups, revealed one by one
  const needleRef = useRef<SVGGElement>(null);         // needle assembly (opacity gate)
  const pointRef = useRef<SVGGElement>(null);          // needle point — hops hole to hole, stepped
  const trailRef = useRef<SVGGElement>(null);          // thread trail — lays continuously behind
  const shockRef = useRef<SVGCircleElement>(null);     // stamp-press shockwave
  const glowRef = useRef<SVGGElement>(null);           // ember-hot flash of the iron, cools off
  const scorchRef = useRef<SVGCircleElement>(null);    // permanent char left by the iron
  const sheenRef = useRef<SVGRectElement>(null);       // specular sweep
  const sparksRef = useRef<SVGGElement>(null);         // burn embers
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
    const stitchEls = stitchesRef.current ? Array.from(stitchesRef.current.children) : [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set([eyebrowRef.current, headlineRef.current, subRef.current, ctaRef.current,
                specRef.current, productRef.current, ...lines], { opacity: 1, x: 0, y: 0, scale: 1 });
      // Finished patch: fully tooled + sewn, heat/motion FX off.
      gsap.set(stitchEls, { opacity: 1 });
      gsap.set(markRef.current, { opacity: 1 });
      gsap.set(scorchRef.current, { opacity: 0.18 });
      gsap.set([needleRef.current, shockRef.current, glowRef.current, sheenRef.current], { opacity: 0 });
      return;
    }

    gsap.set(eyebrowRef.current, { opacity: 0, x: -14 });
    gsap.set(headlineRef.current, { opacity: 1 });
    gsap.set(lines, { opacity: 0, y: 50 });
    gsap.set(subRef.current, { opacity: 0, y: 20 });
    gsap.set(ctaRef.current, { opacity: 0, y: 16 });
    gsap.set(specRef.current, { opacity: 0, y: 12 });
    gsap.set(productRef.current, { opacity: 0, scale: 1.16, y: -26 });
    gsap.set(markRef.current, { opacity: 0 });
    gsap.set([needleRef.current, shockRef.current, glowRef.current, scorchRef.current, sheenRef.current], { opacity: 0 });

    const sparks = sparksRef.current ? Array.from(sparksRef.current.children) : [];
    gsap.set(sparks, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1) Stamp-press — the die descends onto the leather: big and soft, then seated.
    //    A slight rotation settle + squash on contact + thin shockwave sell the weight.
    tl.to(productRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: "power4.out" }, 0.1)
      .fromTo(floatRef.current, { rotation: -2.5 }, { rotation: 0, duration: 0.9, ease: "power3.out" }, 0.1)
      .to(floatRef.current, { scale: 0.97, duration: 0.09, ease: "power2.in", transformOrigin: "50% 62%" }, 0.78)
      .to(floatRef.current, { scale: 1, duration: 0.6, ease: "elastic.out(1.1, 0.45)" }, 0.87)
      .fromTo(shockRef.current,
        { attr: { r: 78 }, opacity: 0.35, strokeWidth: 2 },
        { attr: { r: 104 }, opacity: 0, strokeWidth: 0.3, duration: 0.7, ease: "power2.out" }, 0.8)

    // 2) Copy rises in.
      .to(eyebrowRef.current, { opacity: 1, x: 0, duration: 0.6 }, 0.4)
      .to(lines, { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" }, 0.5)

    // 3) Branding iron — the mark flashes ember-hot the instant it lands, presses IN,
    //    then the glow cools away leaving the dark burn, char and drifting embers.
      .fromTo(glowRef.current,
        { opacity: 0, scale: 1.1, svgOrigin: "100 101" },
        { opacity: 1, scale: 1, svgOrigin: "100 101", duration: 0.3, ease: "power2.in" }, 1.02)
      .fromTo(markRef.current,
        { opacity: 0, scale: 1.1, svgOrigin: "100 101" },
        { opacity: 1, scale: 1, svgOrigin: "100 101", duration: 0.8, ease: "power3.out" }, 1.08)
      .to(scorchRef.current, { opacity: 0.18, duration: 0.7, ease: "power1.out" }, 1.2)
      .fromTo(sparks,
        { opacity: 0.85, y: 4, scale: 1 },
        { opacity: 0, y: -20, scale: 0.4, stagger: 0.07, duration: 1.1, ease: "power1.out" }, 1.4)
      .to(glowRef.current, { opacity: 0, duration: 1.7, ease: "power2.out" }, 1.55)

    // 4) Saddle stitch — hand rhythm, not a progress wipe. The needle point HOPS hole
    //    to hole on a stepped ease while the thread trail lays continuously behind it;
    //    each stitch snaps in right after the needle lands and pulls taut with a tiny
    //    overshoot. Starts while the burn still cools — one continuous craft.
      .to(needleRef.current, { opacity: 1, duration: 0.2, ease: "power1.in" }, 1.9)
      .fromTo(pointRef.current,
        { rotation: 0, svgOrigin: "100 100" },
        { rotation: 360, svgOrigin: "100 100", duration: SEW_DUR, ease: `steps(${STITCH_COUNT})` }, 2.0)
      .fromTo(trailRef.current,
        { rotation: -18, svgOrigin: "100 100" },
        { rotation: 342, svgOrigin: "100 100", duration: SEW_DUR, ease: "none" }, 2.0)
      .fromTo(stitchEls,
        { opacity: 0 },
        { opacity: 1, duration: 0.06, stagger: SEW_DUR / STITCH_COUNT, ease: "none" }, 2.02)
      .fromTo(stitchEls,
        { scale: 1.6, transformOrigin: "50% 50%" },
        { scale: 1, duration: 0.32, stagger: SEW_DUR / STITCH_COUNT, ease: "back.out(3)" }, 2.02)
      .to(needleRef.current, { opacity: 0, duration: 0.35, ease: "power2.out" }, 2.0 + SEW_DUR)

    // 5) Remaining copy.
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.1)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.3)
      .to(specRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.5);

    // ── Idle — quiet, occasional life. The build is the show; rest is rest. ──
    // Specular sheen sweeping across the domed leather, rare enough to stay special.
    const sheenTl = gsap.timeline({ repeat: -1, repeatDelay: 5.5, delay: 4.7 });
    sheenTl.fromTo(sheenRef.current, { x: -120, opacity: 0 }, { opacity: 0.35, duration: 0.4, ease: "power1.in" }, 0)
      .to(sheenRef.current, { x: 150, duration: 1.8, ease: "sine.inOut" }, 0)
      .to(sheenRef.current, { opacity: 0, duration: 0.55, ease: "power1.out" }, 1.25);

    // Gentle 3D float so it breathes at rest.
    const floatTw = gsap.to(floatRef.current, {
      y: -6, rotation: 0.8, duration: 4.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 4.4,
    });

    // Cursor parallax on the product
    const onMouseMove = (e: MouseEvent) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 2;
      const my = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(tiltRef.current, {
        rotateY: mx * 4, rotateX: -my * 2.5, x: mx * 4, y: my * 3,
        duration: 1.1, ease: "power2.out",
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
      c1?.();
      c2?.();
    };
  }, [makeMagnetic]);

  // Scroll-exit — as the hero scrolls away, copy and product separate into two
  // depth planes (product recedes faster, being the nearer/bigger element) and
  // fade into the dark vignette instead of hard-cutting to the next section.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      st.to(copyColRef.current, { y: -70, opacity: 0.15, ease: "none" }, 0)
        .to(productFadeRef.current, { y: -110, scale: 0.88, opacity: 0.1, ease: "none" }, 0)
        .to(scrollCueRef.current, { opacity: 0, y: 8, ease: "none" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
        <div ref={copyColRef} className="text-center lg:text-left">
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
          {/* Scroll-exit owns this node's opacity/scale/y — kept separate from productRef
              (the stamp-press entrance target) so GSAP's auto-overwrite can't kill the
              entrance tween the instant the scroll ScrollTrigger mounts. */}
          <div ref={productFadeRef} className="relative w-full h-full flex items-center justify-center">
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
                  {/* One gradient does the lighting: soft top-left key light falling to a shadowed rim */}
                  <radialGradient id="domeShade" cx="42%" cy="34%" r="82%">
                    <stop offset="0%" stopColor="#FFF4DC" stopOpacity="0.13" />
                    <stop offset="36%" stopColor="#FFF4DC" stopOpacity="0.03" />
                    <stop offset="60%" stopColor="#160C04" stopOpacity="0.10" />
                    <stop offset="86%" stopColor="#160C04" stopOpacity="0.34" />
                    <stop offset="100%" stopColor="#160C04" stopOpacity="0.52" />
                  </radialGradient>
                  <radialGradient id="scorchGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#120800" stopOpacity="0.9" />
                    <stop offset="60%" stopColor="#120800" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#120800" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="sheenGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FFE9C2" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FFE9C2" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#FFE9C2" stopOpacity="0" />
                  </linearGradient>
                  <filter id="discShadow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0b0704" floodOpacity="0.6" />
                  </filter>
                  <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="2.4" />
                  </filter>
                  {/* Recolors the mark's silhouette to ember-orange and blurs it — the hot iron flash */}
                  <filter id="emberize" x="-40%" y="-40%" width="180%" height="180%">
                    <feFlood floodColor="#FF9433" result="tint" />
                    <feComposite in="tint" in2="SourceAlpha" operator="in" result="hot" />
                    <feGaussianBlur in="hot" stdDeviation="1.8" />
                  </filter>
                  {/* Cream copy of the mark's silhouette — the deboss lip that catches light */}
                  <filter id="embossLight" x="-20%" y="-20%" width="140%" height="140%">
                    <feFlood floodColor="#E9D5AC" result="lite" />
                    <feComposite in="lite" in2="SourceAlpha" operator="in" result="cut" />
                    <feGaussianBlur in="cut" stdDeviation="0.45" />
                  </filter>
                  <clipPath id="discClip"><circle cx="100" cy="100" r="80" /></clipPath>
                </defs>

                {/* Backing disc carries the drop shadow; the leather photo sits clipped over it */}
                <circle cx="100" cy="100" r="80" fill="#241407" filter="url(#discShadow)" />
                <g clipPath="url(#discClip)">
                  {/* Real full-grain hide — the material does the talking, not a vector gradient */}
                  {/* Offset crop keeps the hide's center crease off the patch's 12 o'clock axis */}
                  <image href="/leather.jpg" x="-72" y="-30" width="300" height="265"
                    preserveAspectRatio="xMidYMid slice" />
                  <circle cx="100" cy="100" r="80" fill="url(#domeShade)" />
                </g>

                {/* Burnished edge — dark waxed rim with a thin catch-light just inside it */}
                <circle cx="100" cy="100" r="78.6" fill="none" stroke="#120A04" strokeWidth="2.8" opacity="0.85" />
                <circle cx="100" cy="100" r="76.9" fill="none" stroke="#A67C4E" strokeWidth="0.7" opacity="0.28" />

                {/* Stitch channel — recessed groove the thread sits in */}
                <circle cx="100" cy="100" r="73" fill="none" stroke="#160D05" strokeWidth="3.2" opacity="0.3" />
                <circle cx="100" cy="100" r="70.9" fill="none" stroke="#C89B66" strokeWidth="0.5" opacity="0.14" />

                {/* Specular sheen sweep (clipped to the disc) — soft-light so the leather stays matte */}
                <g clipPath="url(#discClip)">
                  <g transform="rotate(20 100 100)" style={{ mixBlendMode: "soft-light" }}>
                    <rect ref={sheenRef} x="74" y="-30" width="42" height="260" fill="url(#sheenGrad)" opacity="0" />
                  </g>
                </g>

                {/* Char left behind by the iron — permanent, very faint */}
                <circle ref={scorchRef} cx="100" cy="101" r="40" fill="url(#scorchGrad)" opacity="0" />

                {/* MD maker's mark — deboss lip first (light catches the recess's lower edge),
                    then the dark burn multiplied into the hide. Positioned on the mark's ink
                    centroid, not its canvas bounds — the antler tine leaves the top sparse. */}
                <g ref={markRef} opacity="0">
                  <image href="/md-mark.png" x="46.8" y="55.2" width="105.9" height="80.3"
                    preserveAspectRatio="xMidYMid meet" filter="url(#embossLight)" opacity="0.32" />
                  <image href="/md-mark.png" x="46" y="54" width="105.9" height="80.3"
                    preserveAspectRatio="xMidYMid meet" opacity="0.96" style={{ mixBlendMode: "multiply" }} />
                </g>

                {/* Ember-hot flash of the branding iron — screen-blended, cools away after the press */}
                <g ref={glowRef} opacity="0" style={{ mixBlendMode: "screen" }}>
                  <image href="/md-mark.png" x="46" y="54" width="105.9" height="80.3"
                    preserveAspectRatio="xMidYMid meet" filter="url(#emberize)" />
                </g>

                {/* Running stitch — one group per stitch (punched hole, thread shadow, thread)
                    so each can snap taut individually as the needle passes. Stitches don't
                    overlap spatially, so per-stitch grouping keeps correct layering. */}
                <g ref={stitchesRef}>
                  {stitchTicks.map((t, i) => (
                    <g key={`stitch-${i}`} opacity="0">
                      <circle cx={t.hx} cy={t.hy} r="0.7" fill="#150C05" opacity="0.5" />
                      <line x1={t.x1 + 0.5} y1={t.y1 + 0.8} x2={t.x2 + 0.5} y2={t.y2 + 0.8}
                        stroke="#241708" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
                      <line x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
                        stroke="#DCC49B" strokeWidth="1.6" strokeLinecap="round" />
                    </g>
                  ))}
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

                {/* Needle assembly. The point hops hole-to-hole (stepped rotation) while the
                    thread trail underneath rotates continuously — punch rhythm over pulled
                    thread. Sewing starts at 3 o'clock where stitch index 0 sits. */}
                <g ref={needleRef} opacity="0">
                  <g ref={trailRef}>
                    <circle cx="100" cy="100" r="73" fill="none" stroke="#FFE9C2" strokeWidth="2"
                      strokeLinecap="round" pathLength={1} strokeDasharray="0.045 0.955"
                      opacity="0.35" filter="url(#softGlow)" />
                  </g>
                  <g ref={pointRef}>
                    <circle cx="173" cy="100" r="3.2" fill="#FFF4DE" filter="url(#softGlow)" />
                    <circle cx="173" cy="100" r="1.5" fill="#fff" />
                  </g>
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
      </div>

      {/* Scroll cue */}
      <div ref={scrollCueRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 opacity-40">
        <span className="text-[#C7B291] text-[0.58rem] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-montserrat)" }}>
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#6A6F43] to-transparent" />
      </div>
    </section>
  );
}
