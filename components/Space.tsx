"use client";

import { useEffect, useMemo, useState } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const METEORS = [
  { top: "6%", left: "78%", delay: "1s", dur: "7s" },
  { top: "22%", left: "96%", delay: "6s", dur: "9s" },
  { top: "-4%", left: "55%", delay: "11s", dur: "8s" },
  { top: "40%", left: "100%", delay: "16s", dur: "10s" },
];

/**
 * NASA-style deep-space backdrop: a twinkling, slowly drifting starfield (tsparticles),
 * a few CSS-only shooting stars, and a scroll parallax driven from ScrollFX.
 * Kept deliberately light: no retina oversampling, capped FPS, no interactivity,
 * paused automatically when the tab is hidden, skipped for reduced-motion users.
 */
export default function Space() {
  const [enabled, setEnabled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // start after the first paint and hero intro so they are never blocked
    const id = window.setTimeout(() => setEnabled(true), 900);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.dataset.theme === "light" ? "light" : "dark");
    read();
    const mo = new MutationObserver(read);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => mo.disconnect();
  }, []);

  const options = useMemo<ISourceOptions>(() => {
    const touch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const dark = theme === "dark";
    return {
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 40,
      detectRetina: false,
      particles: {
        number: { value: touch ? 45 : 110, density: { enable: false } },
        color: { value: dark ? ["#ffffff", "#ffd9c9", "#e08a6b", "#bcd0ff"] : ["#c15f3c", "#8a867c"] },
        shape: { type: "circle" },
        opacity: {
          value: dark ? { min: 0.25, max: 1 } : { min: 0.15, max: 0.5 },
          animation: { enable: true, speed: 0.5, sync: false },
        },
        size: { value: dark ? { min: 0.6, max: 2.3 } : { min: 0.8, max: 1.8 } },
        move: { enable: true, speed: 0.22, direction: "none", random: true, straight: false, outModes: { default: "out" } },
        links: { enable: false },
      },
      interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
    };
  }, [theme]);

  if (!enabled) return <div className="space" aria-hidden />;

  return (
    <div className="space" aria-hidden>
      <ParticlesProvider init={loadSlim}>
        <Particles id="space-particles" options={options} className="space-canvas" />
      </ParticlesProvider>
      {METEORS.map((m, i) => (
        <span key={i} className="meteor" style={{ top: m.top, left: m.left, animationDelay: m.delay, animationDuration: m.dur }} />
      ))}
    </div>
  );
}
