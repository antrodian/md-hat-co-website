"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// A hand-stitch seam — echoes the brand's actual craft (patches stitched onto hats).
// Sits at the top edge of a section to mark the join with the section above.
export default function StitchSeam({ tone = "tan" }: { tone?: "tan" | "cream" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const color = tone === "cream" ? "#F2E9DD" : "#C67C3D";

  return (
    <div ref={ref} className="absolute top-9 left-0 right-0 px-6 z-10 pointer-events-none" aria-hidden>
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        <Anchor color={color} />
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={inView ? { clipPath: "inset(0 0% 0 0)" } : {}}
          transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-[3px] flex-1 rounded-full"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 13px, transparent 13px 25px)`,
            opacity: 0.55,
          }}
        />
        <Anchor color={color} />
      </div>
    </div>
  );
}

function Anchor({ color }: { color: string }) {
  return (
    <span
      className="block w-1.5 h-1.5 rotate-45 shrink-0"
      style={{ background: color, opacity: 0.7 }}
    />
  );
}
