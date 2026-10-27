export const profile = {
  name: "Rutvik Umak",
  role: "Senior Frontend Engineer",
  location: "Pune, India",
  email: "rutvikumak@gmail.com",
  phone: "+91 89993 88484",
  // Fill these in with your real profile URLs; empty ones are hidden.
  github: "https://github.com/rutvikpumak/",
  linkedin: "https://www.linkedin.com/in/rutvikumak/",
  resume: "/Rutvik_Umak_Resume.pdf",
  summary:
    "Senior Frontend Engineer with 6+ years of turning designs into fast, accessible, pixel-perfect React.js and Next.js interfaces. I specialise in complex product UIs — design systems, AG Grid and D3.js data screens, and streaming AI chat experiences — and I lead a frontend team, own architecture and mentor engineers.",
};

export const metrics = [
  { value: "6+", label: "years building production React.js & TypeScript UIs" },
  { value: "25%", label: "higher team delivery efficiency under my frontend lead" },
  { value: "40%", label: "less time to build features with a reusable component library" },
  { value: "50%", label: "fewer bug reports after rewriting legacy apps" },
  { value: "90", label: "Lighthouse score on optimized apps" },
  { value: "80%+", label: "test coverage with Jest & React Testing Library" },
];

export const experience = [
  {
    file: "apptware.md",
    title: "Senior Frontend Developer",
    company: "Apptware Solutions LLP",
    url: "https://apptware.com/",
    period: "Jun 2024 – Present",
    awards: [
      {
        name: "Firefighters Award",
        year: "2026",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7506241903458185216/",
        note: "For taking ownership, showing up consistently and going the extra mile to keep the team moving.",
      },
      {
        name: "Client Hero Award",
        year: "2025",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7340977766906933248/",
        note: "For staying composed under client pressure and leading development planning with empathy and professionalism.",
      },
    ],
    points: [
      "Own frontend architecture across multiple React.js and Next.js products, and lead the team's move to modern practices — lifting delivery efficiency by 25%.",
      "Built a reusable component library (buttons, cards, modals, banners, toasts, tooltips, tabs) that cut new-feature build time by 40%.",
      "Shipped ChatGPT-style assistant panels with real-time streaming responses over LLM APIs, plus clear queued, running, failed and done states with in-place retry.",
      "Designed multi-stage workflows for AI-generated documents: live streaming views, source-trace drawers, and seal-and-lock flows with conflict cards and confirmation overlays.",
      "Delivered data-heavy screens with AG Grid (custom renderers, editable and nested grids, grouping, aggregation, filtering) and D3.js charts that stay smooth on large datasets.",
      "Architected a feature-modular customer portal on Vite, React.js, TypeScript, Redux Toolkit and RTK Query — Re-KYC with document preview and upload, e-mandate management, payments and documents — in accessible, mobile-first UI.",
      "Launched a public marketing site on Next.js and Tailwind CSS with Contentful-driven content, SEO and optimized, accessible imagery.",
      "Turn Figma designs into responsive, pixel-perfect, accessible interfaces, refining spacing, typography and component polish.",
      "Keep apps fast with lazy loading, memoization, optimized rendering and disciplined state management (Redux Toolkit with React Query).",
      "Secure the client with JWT protected routes, role-based access and interceptors that refresh tokens and retry after a 401; integrate GraphQL and encrypted REST APIs with backend teams.",
      "Run code reviews, drive architecture decisions and mentor junior developers.",
    ],
  },
  {
    file: "opcito.md",
    title: "Software Engineer",
    company: "Opcito Technologies Pvt. Ltd.",
    url: "https://www.opcito.com/",
    period: "Jun 2022 – Jun 2024",
    points: [
      "Led the rebuild of legacy web apps in React.js and TypeScript, cutting bug reports by 50%.",
      "Optimized performance and SEO to a 90 Lighthouse score, with significantly faster page loads.",
      "Introduced Jest and React Testing Library, reaching 80%+ code coverage.",
      "Integrated SonarQube static analysis into the workflow, reducing code vulnerabilities by 50%.",
      "Wrote the frontend architecture and coding-standards docs that sped up onboarding for new engineers.",
      "Coordinated with cross-functional teams to ship features on schedule and to spec.",
    ],
  },
  {
    file: "capgemini.md",
    title: "Software Engineer",
    company: "Capgemini Technology Services Ltd.",
    url: "https://www.capgemini.com/in-en/",
    period: "Sep 2021 – May 2022",
    points: [
      "Built and maintained dynamic, high-performance React.js applications.",
      "Applied responsive design principles for a consistent experience across devices and screen sizes.",
      "Integrated RESTful APIs with backend developers for reliable data flow.",
      "Contributed to sprint planning, stand-ups and reviews, supporting timely delivery.",
    ],
  },
  {
    file: "contextine.md",
    title: "Software Engineer",
    company: "Contextine Software Pvt. Ltd.",
    url: "https://contextine.com/",
    period: "Jul 2020 – Sep 2021",
    points: [
      "Built and optimized React.js applications that improved data extraction and user interaction.",
      "Designed parsing algorithms and rule engines using regular expressions and string matching.",
      "Cleaned receipt data and built custom parsers for customer-specific formats.",
    ],
  },
];

export const skills = [
  { group: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"] },
  { group: "Frontend", items: ["React.js (18/19)", "Next.js", "Vite", "Responsive Design", "Accessibility", "Cross-Browser"] },
  { group: "UI & Design Systems", items: ["TailwindCSS", "ShadCN", "Material-UI", "Flowbite", "Bootstrap", "Figma to Code"] },
  { group: "State & Data", items: ["Redux Toolkit", "RTK Query", "React Query", "REST", "GraphQL", "WebSockets", "Node.js (basic)"] },
  { group: "Data Viz & Grids", items: ["D3.js", "AG Grid", "Large-Dataset Rendering"] },
  { group: "Testing & Quality", items: ["Jest", "React Testing Library", "Lighthouse", "SonarQube", "Code Reviews"] },
  { group: "Tools", items: ["Git", "GitHub", "GitLab", "Bitbucket", "CI/CD", "Postman", "JIRA", "Agile/Scrum"] },
];

export const education = {
  degree: "Master of Computer Science",
  school: "University of Pune",
  period: "May 2018 – Apr 2020",
  grade: "CGPA 7.95 / 10",
};
