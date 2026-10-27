"use client";

import { useEffect, useMemo, useState } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadHexColorPlugin } from "@tsparticles/plugin-hex-color";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

// tsparticles v4 ships colour parsing as a separate plugin; without it every star falls back to white
async function initEngine(engine: Engine) {
  await loadHexColorPlugin(engine);
  await loadSlim(engine);
}

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
  // Client-only component (ssr: false), so these can be read synchronously: the starfield mounts on the
  // very first render instead of waiting for a timer. The engine itself runs in a worker, off the main thread.
  const [enabled] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );

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
        number: { value: dark ? (touch ? 45 : 110) : touch ? 30 : 70, density: { enable: false } },
        paint: { fill: { enable: true, color: { value: dark ? ["#ffffff", "#ffd9c9", "#e08a6b", "#bcd0ff"] : ["#c15f3c", "#d97757", "#5b5a55", "#8a6a5a"] } } },
        shape: { type: "circle" },
        opacity: {
          value: dark ? { min: 0.25, max: 1 } : { min: 0.3, max: 0.7 },
          animation: { enable: true, speed: 0.5, sync: false },
        },
        size: { value: dark ? { min: 0.6, max: 2.3 } : { min: 0.8, max: 2 } },
        move: { enable: true, speed: 0.22, direction: "none", random: true, straight: false, outModes: { default: "out" } },
        links: { enable: false },
      },
      interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
    };
  }, [theme]);

  if (!enabled) return <div className="space" aria-hidden />;

  return (
    <div className="space" aria-hidden>
      <ParticlesProvider init={initEngine}>
        {/* key forces a fresh starfield when the theme flips, so colours always match */}
        <Particles key={theme} id="space-particles" options={options} className="space-canvas" />
      </ParticlesProvider>
      {METEORS.map((m, i) => (
        <span key={i} className="meteor" style={{ top: m.top, left: m.left, animationDelay: m.delay, animationDuration: m.dur }} />
      ))}
    </div>
  );
}
