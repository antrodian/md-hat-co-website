"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left pointer-events-none"
      style={{ scaleX, background: "linear-gradient(90deg, #8B1D1D 0%, #C67C3D 60%, #F2E9DD 100%)" }}
    />
  );
}
