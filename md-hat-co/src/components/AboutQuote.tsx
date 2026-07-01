"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function AboutQuote() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 px-6 bg-[#F2EEE6] overflow-hidden">
      {/* Signature mark — the longhorn skull, watermarked large behind the quote.
          Unused anywhere else on the site; this is its one moment. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 0.06, scale: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[900px] aspect-square pointer-events-none"
      >
        <Image src="/brand-mark.png" alt="" fill className="object-contain" />
      </motion.div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[#2E251B] text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.25] tracking-[-0.01em]"
          style={{ fontFamily: "var(--font-roboto-slab)" }}
        >
          &ldquo;I didn&apos;t want to build a brand. I wanted to build a hat
          I&apos;d actually wear in the field — and never take off.&rdquo;
        </motion.blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-[#6B4F33] text-xs tracking-[0.3em] uppercase mt-8"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Morgan — Founder, MD Hat Co.
        </motion.p>
      </div>
    </section>
  );
}
