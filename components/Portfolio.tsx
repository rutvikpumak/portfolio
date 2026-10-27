"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/base-path";
import { education, experience, metrics, profile, skills } from "@/lib/data";
import dynamic from "next/dynamic";
import ScrollFX from "./ScrollFX";

const Space = dynamic(() => import("./Space"), { ssr: false });

const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function Spark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="spark">
      <path fill="var(--accent)" d="M12 1l2.2 7.1L21 5.5l-3.6 6.5L23 14l-7 1.2L17.5 23 12 17.8 6.5 23 8 15.2 1 14l5.6-2L3 5.5l6.8 2.6z" />
    </svg>
  );
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const ROTATING = ["touch", "see", "use"];

/** Cycles the last headline word. State lives here only, so the rest of the page never re-renders. */
function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % ROTATING.length), 2600);
    return () => window.clearInterval(t);
  }, []);
  const prev = (i - 1 + ROTATING.length) % ROTATING.length;
  return (
    <em className="rot">
      {ROTATING.map((w, k) => (
        <span key={w} className={k === i ? "on" : k === prev ? "out" : ""} aria-hidden={k !== i}>
          {w}
        </span>
      ))}
    </em>
  );
}

function Counter({ value }: { value: string }) {
  const [ref, seen] = useInView<HTMLElement>();
  const m = value.match(/^(\d+)(.*)$/);
  const target = m ? parseInt(m[1], 10) : 0;
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1100, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, target]);
  return (
    <b ref={ref}>
      {n}
      {m?.[2]}
    </b>
  );
}

function SkillsList() {
  return (
    <div className="skills-list card">
      {skills.map((g) => (
        <div key={g.group} className="srow">
          <h3>{g.group}</h3>
          <div className="tiles">
            {g.items.map((it) => (
              <span key={it} className="tile">
                {it}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Job({ job }: { job: (typeof experience)[number] }) {
  return (
    <li className="job">
      <span className="dot" />
      <div className="job-head">
        <span>
          <h3>{job.title}</h3>
          <a className="company link" href={job.url} target="_blank" rel="noreferrer">
            {job.company} ↗
          </a>
        </span>
        <span className="when">{job.period}</span>
      </div>
      <ul>
        {job.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      {job.awards && <p className="sub-label">Achievements</p>}
      {job.awards && (
        <div className="awards">
          {job.awards.map((a) => (
            <div key={a.name} className="award">
              <span className="award-ico" aria-hidden>
                🏆
              </span>
              <div>
                <b>
                  <a className="award-link" href={a.url} target="_blank" rel="noreferrer">
                    {a.name} ↗
                  </a>{" "}
                  <span className="award-year">· {a.year}</span>
                </b>
                <p>{a.note}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

export default function Portfolio() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = light ? "light" : "dark";
  }, [light]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      // Default is dark; only flip if the user previously chose light.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync button state after hydration
      setLight(saved === "light");
    } catch {}
  }, []);

  const toggleTheme = () =>
    setLight((v) => {
      try {
        localStorage.setItem("portfolio-theme", v ? "dark" : "light");
      } catch {}
      return !v;
    });

  const socials = [
    profile.github && { label: "GitHub", href: profile.github },
    profile.linkedin && { label: "LinkedIn", href: profile.linkedin },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <a className="skip" href="#top">
        Skip to content
      </a>
      <Space />
      <ScrollFX />
      <div className="progress" aria-hidden />
      <header className="nav">
        <div className="nav-in">
          <a href="#top" className="brand">
            <Spark /> <span>Rutvik Umak</span>
          </a>
          <nav aria-label="Sections">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} data-nav={n.id}>
                {n.label}
              </a>
            ))}
          </nav>
          <button className="themebtn" onClick={toggleTheme} aria-label={light ? "Switch to dark theme" : "Switch to light theme"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {light ? (
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              ) : (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </>
              )}
            </svg>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="glow" aria-hidden />
          <div className="hero-text">
            <p className="eyebrow-line rise" style={{ animationDelay: "0ms" }}>
              {profile.name} · {profile.role}
            </p>
            <h1>
              {"I build the part of the product people".split(" ").map((w, i) => (
                <Fragment key={i}>
                  <span className="w">
                    <span className="wi" style={{ "--i": i } as React.CSSProperties}>
                      {w}
                    </span>
                  </span>{" "}
                </Fragment>
              ))}
              <span className="w">
                <span className="wi" style={{ "--i": 8 } as React.CSSProperties}>
                  <RotatingWord />
                </span>
              </span>
            </h1>
            <p className="lede rise" style={{ animationDelay: "120ms" }}>
              <strong className="years">6+ years</strong> building fast, accessible, production-ready web apps with React.js and Next.js.
            </p>
            <div className="cta rise" style={{ animationDelay: "180ms" }}>
              <a className="btn primary" href={withBasePath(profile.resume)} download>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 3v12m0 0l-4.5-4.5M12 15l4.5-4.5M4 20h16" />
                </svg>
                Download Resume
              </a>
              <a className="btn outline" href="#contact">
                Contact Me
              </a>            </div>
          </div>
          <div className="hero-photo">
            <div className="frame rise" style={{ animationDelay: "120ms" }}>
              <div className="face">
                <Image
                  src={withBasePath("/portrait-wide.webp")}
                  alt="Portrait of Rutvik Umak"
                  width={420}
                  height={420}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <Reveal>
          <section className="metrics">
            {metrics.map((m) => (
              <div key={m.label} className="metric">
                <Counter value={m.value} />
                <span>{m.label}</span>
              </div>
            ))}
          </section>
        </Reveal>

        <section id="about" className="section">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2>A bit about me</h2>
            <p className="about-text">
              {profile.summary.split(" ").map((w, i) => (
                <span key={i} className="aw">
                  {w}{" "}
                </span>
              ))}
            </p>
          </Reveal>
        </section>

        <section id="skills" className="section">
          <Reveal>
            <p className="eyebrow">Skills</p>
            <h2>Tools I reach for</h2>
          </Reveal>
          <Reveal>
            <SkillsList />
          </Reveal>
        </section>

        <section id="experience" className="section">
          <Reveal>
            <p className="eyebrow">Experience</p>
            <h2>Where I&apos;ve built things</h2>
          </Reveal>
          <Reveal>
            <div className="tl-wrap">
              <span className="tl-fill" aria-hidden />
              <ol className="timeline">
                {experience.map((job) => (
                  <Job key={job.file} job={job} />
                ))}
              </ol>
            </div>
          </Reveal>
        </section>

        <section id="education" className="section">
          <Reveal>
            <p className="eyebrow">Education</p>
            <h2>Where I studied</h2>
            <div className="card edu">
              <div className="edu-main">
                <span className="ico" aria-hidden>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 9 12 4 2 9l10 5 10-5z" />
                    <path d="M6 11.5V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5M22 9v6" />
                  </svg>
                </span>
                <div>
                  <h3>{education.degree}</h3>
                  <p className="company">{education.school}</p>
                </div>
              </div>
              <p className="muted">
                {education.period} · {education.grade}
              </p>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="section">
          <Reveal>
            <div className="cta-band">
              <Spark size={28} />
              <h2>Let&apos;s build something great together.</h2>
              <p>Always up for interesting product UI and AI-interface problems.</p>
              <div className="cta">
                <a className="btn primary" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
                <a className="btn" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
                  {profile.phone}
                </a>
                {socials.map((s) => (
                  <a key={s.label} className="btn" href={s.href} target="_blank" rel="noreferrer">
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="foot">
        <Spark size={14} /> © {profile.name}
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  );
}
