"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const SECTION_IDS = ["about", "skills", "experience", "education", "contact"];

/**
 * Scroll progress bar + active nav link. Pure DOM writes (no React state), so scrolling
 * never triggers a re-render. Runs for everyone, including reduced-motion users.
 */
function useLightweightScrollUI() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".progress");
    const links = new Map(
      Array.from(document.querySelectorAll<HTMLElement>("[data-nav]")).map((a) => [a.dataset.nav!, a]),
    );

    let max = 1;
    let ticking = false;
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    let current = "";
    const setActive = (id: string) => {
      if (id === current) return;
      links.get(current)?.classList.remove("on");
      links.get(id)?.classList.add("on");
      current = id;
    };
    const paint = () => {
      ticking = false;
      if (bar) bar.style.transform = `scaleX(${Math.min(1, window.scrollY / max)})`;
      // the last section is too short to reach the observer band, so pin it at the page bottom
      if (window.scrollY >= max - 8) setActive(SECTION_IDS[SECTION_IDS.length - 1]);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(paint);
      }
    };
    measure();
    paint();
    const ro = new ResizeObserver(measure);
    ro.observe(document.documentElement);
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && window.scrollY < max - 8) setActive((e.target as HTMLElement).id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

export default function ScrollFX() {
  useLightweightScrollUI();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Smooth-scroll only with a mouse/trackpad; touch devices keep native momentum scrolling.
    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;
    if (finePointer) {
      lenis = new Lenis({ lerp: 0.1, anchors: { offset: -64 } });
      const nav = document.querySelector<HTMLElement>(".nav");
      let hidden = false;
      lenis.on("scroll", (l: { scroll: number; direction: number }) => {
        ScrollTrigger.update();
        const shouldHide = l.direction === 1 && l.scroll > 240;
        const shouldShow = l.direction === -1 || l.scroll <= 240;
        if (shouldHide && !hidden) {
          hidden = true;
          nav?.classList.add("hide");
        } else if (shouldShow && hidden) {
          hidden = false;
          nav?.classList.remove("hide");
        }
      });
      tick = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.defaults({ force3D: true });

      /* ---------- hero intro ---------- */
      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .from(".hero-photo .face img", { scale: 1.3, duration: 1.8, ease: "power3.out" }, 0);

      /* ---------- hero scroll-out (parallax) ---------- */
      const heroST = { trigger: ".hero", start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-text", { y: -80, opacity: 0.1, ease: "none", scrollTrigger: heroST });
      gsap.to(".hero-photo", { y: -36, scale: 0.92, ease: "none", scrollTrigger: heroST });

      /* ---------- deep-space parallax: starfield drifts slower than the page ---------- */
      gsap.to(".space", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: true },
      });

      /* ---------- impact numbers ---------- */
      gsap.set(".metric", { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: ".metrics",
        start: "top 88%",
        once: true,
        onEnter: () => gsap.to(".metric", { opacity: 1, y: 0, duration: 0.8, stagger: 0.09, ease: "power3.out" }),
      });

      /* ---------- about: words light up as you read ---------- */
      gsap.fromTo(
        ".aw",
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: ".about-text", start: "top 82%", end: "bottom 52%", scrub: true },
        },
      );

      /* ---------- skills: rows slide in, pills pop ---------- */
      gsap.set(".srow", { opacity: 0, y: 36 });
      gsap.set(".srow .tile", { opacity: 0, scale: 0.8 });
      ScrollTrigger.batch(".srow", {
        start: "top 92%",
        once: true,
        onEnter: (rows) => {
          gsap.to(rows, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
          rows.forEach((row, i) =>
            gsap.to(row.querySelectorAll(".tile"), {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              stagger: 0.04,
              delay: 0.2 + i * 0.1,
              ease: "back.out(2)",
            }),
          );
        },
      });

      /* ---------- experience: line draws, cards slide, bullets cascade ---------- */
      gsap.set(".tl-fill", { scaleY: 0, transformOrigin: "top" });
      gsap.to(".tl-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".timeline", start: "top 70%", end: "bottom 65%", scrub: true },
      });

      gsap.set(".job", { opacity: 0, x: 60 });
      gsap.set(".job > ul > li", { opacity: 0, y: 14 });
      gsap.set(".award", { opacity: 0, scale: 0.9 });
      ScrollTrigger.batch(".job", {
        start: "top 88%",
        once: true,
        onEnter: (jobs) => {
          gsap.to(jobs, { opacity: 1, x: 0, duration: 0.9, stagger: 0.15, ease: "power3.out" });
          jobs.forEach((job) => {
            gsap.to(job.querySelectorAll(":scope > ul > li"), { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, delay: 0.35, ease: "power2.out" });
            gsap.to(job.querySelectorAll(".award"), { opacity: 1, scale: 1, duration: 0.6, stagger: 0.12, delay: 0.7, ease: "back.out(1.7)" });
          });
        },
      });
      gsap.utils.toArray<HTMLElement>(".job").forEach((job) =>
        ScrollTrigger.create({
          trigger: job,
          start: "top 58%",
          end: "bottom 58%",
          toggleClass: { targets: job, className: "is-active" },
        }),
      );

      /* ---------- contact band grows into view ---------- */
      gsap.fromTo(
        ".cta-band",
        { scale: 0.92, y: 50 },
        { scale: 1, y: 0, ease: "none", scrollTrigger: { trigger: ".cta-band", start: "top 98%", end: "top 55%", scrub: true } },
      );

      /* ---------- magnetic buttons (mouse only) ---------- */
      if (finePointer) {
        document.querySelectorAll<HTMLElement>(".hero .btn, .cta-band .btn").forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power2.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power2.out" });
          const move = (e: MouseEvent) => {
            const r = btn.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          btn.addEventListener("mousemove", move, { passive: true });
          btn.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            btn.removeEventListener("mousemove", move);
            btn.removeEventListener("mouseleave", leave);
          });
        });
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      cleanups.forEach((fn) => fn());
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
