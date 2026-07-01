"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Antlers, ArrowRight } from "@/components/Icons";

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
  const floatRef = useRef<HTMLDivElement>(null);       // assembled hat, idle float
  const gridRef = useRef<SVGGElement>(null);           // blueprint guide lines
  const bracketRef = useRef<SVGGElement>(null);        // HUD corner frame
  const crownRef = useRef<SVGGElement>(null);          // 6-panel crown, exploded piece
  const brimRef = useRef<SVGPathElement>(null);        // curved brim, exploded piece
  const patchRef = useRef<SVGGElement>(null);          // front patch, exploded piece
  const stitchRef = useRef<SVGCircleElement>(null);    // stitch reveal mask
  const monogramRef = useRef<SVGGElement>(null);       // MD mark on the patch
  const jointsRef = useRef<SVGGElement>(null);         // assembly-point flash rings
  const calloutRef = useRef<SVGGElement>(null);        // spec leader lines + labels
  const scanRef = useRef<SVGLineElement>(null);        // idle blueprint scan sweep
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
      // Fully assembled hat, blueprint chrome settled, motion FX off.
      gsap.set([crownRef.current, brimRef.current, patchRef.current], { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1 });
      gsap.set(stitchRef.current, { strokeDashoffset: 0 });
      gsap.set(monogramRef.current, { opacity: 1 });
      gsap.set([gridRef.current, bracketRef.current, calloutRef.current], { opacity: 1 });
      gsap.set([jointsRef.current, scanRef.current], { opacity: 0 });
      return;
    }

    gsap.set(eyebrowRef.current, { opacity: 0, x: -14 });
    gsap.set(headlineRef.current, { opacity: 1 });
    gsap.set(lines, { opacity: 0, y: 50 });
    gsap.set(subRef.current, { opacity: 0, y: 20 });
    gsap.set(ctaRef.current, { opacity: 0, y: 16 });
    gsap.set(specRef.current, { opacity: 0, y: 12 });
    gsap.set(productRef.current, { opacity: 0, scale: 1.16, y: -26 });
    gsap.set(gridRef.current, { opacity: 0 });
    gsap.set(bracketRef.current, { opacity: 0, scale: 0.85, transformOrigin: "50% 50%" });
    gsap.set(crownRef.current, { opacity: 0, x: -8, y: -46, rotation: -8, transformOrigin: "50% 100%" });
    gsap.set(brimRef.current, { opacity: 0, x: 30, y: 38, rotation: 9, transformOrigin: "50% 0%" });
    gsap.set(patchRef.current, { opacity: 0, x: 58, y: -16, scale: 1.5, rotation: 14, transformOrigin: "50% 50%" });
    gsap.set(stitchRef.current, { strokeDashoffset: 1 });
    gsap.set(monogramRef.current, { opacity: 0 });
    gsap.set(jointsRef.current, { opacity: 0 });
    gsap.set(calloutRef.current, { opacity: 0 });

    const leaders = calloutRef.current ? Array.from(calloutRef.current.querySelectorAll("[data-leader]")) : [];
    gsap.set(leaders, { strokeDashoffset: 1 });
    const labels = calloutRef.current ? Array.from(calloutRef.current.querySelectorAll("[data-label]")) : [];
    gsap.set(labels, { opacity: 0, x: -4 });

    const joints = jointsRef.current ? Array.from(jointsRef.current.children) : [];
    gsap.set(joints, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1) Blueprint establishes — guide grid and HUD corner frame settle in first.
    tl.to(productRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.85, ease: "power4.out" }, 0.1)
      .to(gridRef.current, { opacity: 1, duration: 0.5, ease: "power1.out" }, 0.15)
      .to(bracketRef.current, { opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" }, 0.25)

    // 2) Copy rises in.
      .to(eyebrowRef.current, { opacity: 1, x: 0, duration: 0.6 }, 0.4)
      .to(lines, { opacity: 1, y: 0, duration: 0.85, stagger: 0.12, ease: "power3.out" }, 0.5)

    // 3) Assembly — crown, brim and patch fly in from their exploded positions and seat home,
    //    each landing punctuated by a small crosshair flash at the join.
      .to(crownRef.current, { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.75, ease: "power4.out" }, 0.55)
      .to(brimRef.current, { opacity: 1, x: 0, y: 0, rotation: 0, duration: 0.75, ease: "power4.out" }, 0.72)
      .to(patchRef.current, { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, duration: 0.7, ease: "power4.out" }, 0.9)
      .to(joints, { opacity: 1, scale: 1, duration: 0.22, stagger: 0.12, ease: "power2.out" }, 1.05)
      .to(joints, { opacity: 0, duration: 0.5, stagger: 0.12, ease: "power1.out" }, 1.4)

    // 4) Stitch draws around the patch rim, monogram settles in behind it.
      .to(stitchRef.current, { strokeDashoffset: 0, duration: 1.1, ease: "power1.inOut" }, 1.5)
      .to(monogramRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.9)

    // 5) Spec callouts draw their leader lines and fade their labels in.
      .to(calloutRef.current, { opacity: 1, duration: 0.3 }, 2.15)
      .to(leaders, { strokeDashoffset: 0, duration: 0.7, stagger: 0.15, ease: "power1.inOut" }, 2.15)
      .to(labels, { opacity: 1, x: 0, duration: 0.5, stagger: 0.15, ease: "power2.out" }, 2.35)

    // 6) Remaining copy.
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7 }, 1.1)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.3)
      .to(specRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.5);

    // ── Idle — quiet, occasional life. The build is the show; rest is rest. ──
    // Blueprint scan sweeping down the frame, rare enough to stay special.
    const sheenTl = gsap.timeline({ repeat: -1, repeatDelay: 5.5, delay: 4.2 });
    sheenTl.fromTo(scanRef.current, { y: 8, opacity: 0 }, { opacity: 0.5, duration: 0.4, ease: "power1.in" }, 0)
      .to(scanRef.current, { y: 192, duration: 1.9, ease: "sine.inOut" }, 0)
      .to(scanRef.current, { opacity: 0, duration: 0.55, ease: "power1.out" }, 1.35);

    // Gentle 3D float so it breathes at rest.
    const floatTw = gsap.to(floatRef.current, {
      y: -6, rotation: 0.8, duration: 4.6, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 3.6,
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
            {/* Ambient glow — brand-warm, slow breathing pulse */}
            <div aria-hidden className="absolute inset-0 pointer-events-none motion-safe:[animation:glowPulse_6s_ease-in-out_infinite]"
              style={{ background: "radial-gradient(circle at 50% 47%, rgba(106,111,67,0.30) 0%, rgba(199,178,145,0.13) 34%, transparent 62%)", filter: "blur(10px)" }} />

            {/* Slow-rotating measurement ring — protractor detail, blueprint touch */}
            <div aria-hidden className="absolute inset-[4%] rounded-full border border-dashed border-[#C7B291]/25 motion-safe:[animation:spin_46s_linear_infinite]" />

            {/* ── The hat: exploded parts assemble, stitched, spec'd out ── */}
            <div ref={floatRef} className="absolute inset-[10%]">
              <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                <defs>
                  <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="2.4" />
                  </filter>
                  <filter id="discShadow" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#0b0704" floodOpacity="0.55" />
                  </filter>
                  {/* Sewing reveal: this stroke draws around and unveils the stitches */}
                  <mask id="stitchMask">
                    <rect width="200" height="200" fill="black" />
                    <circle ref={stitchRef} cx="100" cy="148" r="27" fill="none" stroke="#fff" strokeWidth="6"
                      pathLength={1} strokeDasharray={1} strokeDashoffset={1} transform="rotate(-90 100 148)" />
                  </mask>
                </defs>

                {/* Blueprint guide grid */}
                <g ref={gridRef} opacity="0" stroke="#C7B291" strokeWidth="0.5">
                  <line x1="100" y1="6" x2="100" y2="194" strokeDasharray="2 4" opacity="0.18" />
                  <line x1="6" y1="100" x2="194" y2="100" strokeDasharray="2 4" opacity="0.18" />
                  <line x1="6" y1="66" x2="194" y2="66" strokeDasharray="1.5 5" opacity="0.1" />
                  <line x1="6" y1="134" x2="194" y2="134" strokeDasharray="1.5 5" opacity="0.1" />
                </g>

                {/* HUD corner frame */}
                <g ref={bracketRef} stroke="#C7B291" strokeWidth="1" opacity="0" strokeLinecap="round">
                  <path d="M8,22 L8,8 L22,8" fill="none" opacity="0.5" />
                  <path d="M178,8 L192,8 L192,22" fill="none" opacity="0.5" />
                  <path d="M192,178 L192,192 L178,192" fill="none" opacity="0.5" />
                  <path d="M22,192 L8,192 L8,178" fill="none" opacity="0.5" />
                </g>

                {/* Idle blueprint scan sweep */}
                <line ref={scanRef} x1="10" y1="0" x2="190" y2="0" stroke="#F2EEE6" strokeWidth="0.8"
                  opacity="0" filter="url(#softGlow)" />

                {/* Crown — 6-panel dome, seams radiating from the button */}
                <g ref={crownRef} fill="none" stroke="#F2EEE6" strokeWidth="1.3" strokeLinecap="round" opacity="0">
                  <path d="M45,126 A55,55 0 0 1 155,126" />
                  <line x1="45" y1="126" x2="45" y2="133" />
                  <line x1="155" y1="126" x2="155" y2="133" />
                  <circle cx="100" cy="70" r="2.4" fill="#F2EEE6" stroke="none" />
                  <line x1="100" y1="70" x2="48.3" y2="106.2" opacity="0.6" />
                  <line x1="100" y1="70" x2="68.45" y2="79.95" opacity="0.6" />
                  <line x1="100" y1="70" x2="131.55" y2="79.95" opacity="0.6" />
                  <line x1="100" y1="70" x2="151.7" y2="106.2" opacity="0.6" />
                </g>

                {/* Brim — curved front bill */}
                <path ref={brimRef} d="M40,131 Q100,158 165,129 Q100,148 40,131 Z"
                  fill="#211A12" fillOpacity="0.3" stroke="#C7B291" strokeWidth="1.3" opacity="0" />

                {/* Front patch — stitched, monogrammed */}
                <g ref={patchRef} opacity="0">
                  <circle cx="100" cy="148" r="30" fill="#2B2116" fillOpacity="0.55" stroke="#C7B291" strokeWidth="1.4" filter="url(#discShadow)" />
                  {/* Running stitch, revealed by the mask */}
                  <g mask="url(#stitchMask)">
                    <circle cx="100" cy="148" r="27" fill="none" stroke="#2E2012" strokeWidth="3"
                      strokeDasharray="2.2 4.8" strokeLinecap="round" opacity="0.45" transform="rotate(-90 100 148)" />
                    <circle cx="100" cy="148" r="27" fill="none" stroke="#ECE0C6" strokeWidth="2"
                      strokeDasharray="2.2 4.8" strokeLinecap="round" transform="rotate(-90 100 148)" />
                  </g>
                  {/* MD maker's mark */}
                  <g ref={monogramRef} opacity="0">
                    <image href="/md-mark.png" x="77" y="130.5" width="46" height="34.9"
                      preserveAspectRatio="xMidYMid meet" opacity="0.85"
                      style={{ filter: "invert(1) brightness(1.4)" }} />
                  </g>
                </g>

                {/* Assembly-point flash rings */}
                <g ref={jointsRef} opacity="0" stroke="#F2EEE6" strokeWidth="1" fill="none">
                  <g transform="translate(100,129)">
                    <circle r="6" opacity="0.5" />
                    <line x1="-4" y1="0" x2="4" y2="0" />
                    <line x1="0" y1="-4" x2="0" y2="4" />
                  </g>
                  <g transform="translate(100,118)">
                    <circle r="6" opacity="0.5" />
                    <line x1="-4" y1="0" x2="4" y2="0" />
                    <line x1="0" y1="-4" x2="0" y2="4" />
                  </g>
                </g>

                {/* Spec callouts — leader lines draw in, labels fade after */}
                <g ref={calloutRef} opacity="0" fontFamily="var(--font-montserrat)">
                  <g>
                    <line data-leader x1="138" y1="98" x2="172" y2="84" stroke="#C7B291" strokeWidth="0.8"
                      pathLength={1} strokeDasharray={1} strokeDashoffset={1} opacity="0.55" />
                    <text data-label x="174" y="86" fill="#C7B291" fontSize="6.4" letterSpacing="0.08em" opacity="0">
                      6-PANEL CROWN
                    </text>
                  </g>
                  <g>
                    <line data-leader x1="42" y1="130" x2="10" y2="134" stroke="#C7B291" strokeWidth="0.8"
                      pathLength={1} strokeDasharray={1} strokeDashoffset={1} opacity="0.55" />
                    <text data-label x="8" y="132" textAnchor="end" fill="#C7B291" fontSize="6.4" letterSpacing="0.08em" opacity="0">
                      PRE-CURVED BRIM
                    </text>
                  </g>
                  <g>
                    <line data-leader x1="129" y1="146" x2="168" y2="140" stroke="#C7B291" strokeWidth="0.8"
                      pathLength={1} strokeDasharray={1} strokeDashoffset={1} opacity="0.55" />
                    <text data-label x="170" y="142" fill="#C7B291" fontSize="6.4" letterSpacing="0.08em" opacity="0">
                      FULL-GRAIN PATCH
                    </text>
                  </g>
                  <g>
                    <line data-leader x1="118" y1="172" x2="160" y2="190" stroke="#C7B291" strokeWidth="0.8"
                      pathLength={1} strokeDasharray={1} strokeDashoffset={1} opacity="0.55" />
                    <text data-label x="162" y="192" fill="#C7B291" fontSize="6.4" letterSpacing="0.08em" opacity="0">
                      HAND-STITCHED
                    </text>
                  </g>
                </g>
              </svg>
            </div>

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
