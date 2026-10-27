import { education, experience, profile, skills } from "@/lib/data";

/** Public origin of the deployed site (with the GitHub Pages sub-path, if any). Override with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://rutvikpumak.github.io/portfolio").replace(/\/$/, "");

export const SITE_TITLE = `${profile.name} — ${profile.role} | React.js, Next.js, TypeScript`;
export const SITE_DESCRIPTION =
  "Rutvik Umak is a Senior Frontend Engineer in Pune, India with 6+ years building fast, accessible, production-ready web apps with React.js, Next.js and TypeScript — design systems, AG Grid and D3.js data UIs, and streaming AI chat interfaces.";

export const KEYWORDS = [
  "Rutvik Umak",
  "Senior Frontend Engineer",
  "Frontend Developer Pune",
  "React.js developer",
  "Next.js developer",
  "TypeScript",
  "Redux Toolkit",
  "AG Grid",
  "D3.js",
  "Tailwind CSS",
  "Design systems",
  "AI chat UI",
  "Web performance",
  "Accessibility",
  "Portfolio",
];

/** schema.org structured data: helps Google show a rich result for the person and their work. */
export function personJsonLd() {
  const current = experience[0];
  const sameAs = [profile.github, profile.linkedin].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: `${profile.name} — Portfolio`,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: `${SITE_URL}/`,
        name: SITE_TITLE,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        jobTitle: profile.role,
        description: SITE_DESCRIPTION,
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/portrait-wide.webp`,
        email: `mailto:${profile.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
        worksFor: { "@type": "Organization", name: current.company, url: current.url },
        alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
        knowsAbout: skills.flatMap((g) => g.items),
        award: (current.awards ?? []).map((a) => `${a.name} (${a.year}), ${current.company}`),
        sameAs,
      },
    ],
  };
}
