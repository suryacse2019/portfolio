import { useState, useEffect, useRef } from "react";

const PROFILE_IMG = "/profile-img.webp";

const RESUME_PDF = "Resume.pdf";
const RESUME_FILENAME = "Suraj_Yadav_Resume.pdf";


/* ---------------------------------------------------------
   DATA — sourced from resume
--------------------------------------------------------- */

const skillGroups = [
  {
    title: "Frontend",
    items: [
      { name: "React.js", level: 78 },
      { name: "JavaScript (ES6+)", level: 75 },
      { name: "HTML5 / CSS3", level: 90 },
      { name: "Bootstrap", level: 90 },
      { name: "jQuery / AJAX", level: 85 },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Laravel", level: 95 },
      { name: "PHP", level: 85 },
      { name: "REST APIs", level: 93 },
      { name: "Node.js / Express.js", level: 62 },
      { name: "JWT · Sanctum · Passport", level: 80 },
    ],
  },
  {
    title: "Data & AI",
    items: [
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 60 },
      { name: "Firebase", level: 70 },
      { name: "OpenAI / Gemini / Claude APIs", level: 62 },
    ],
  },
  {
    title: "DevOps & Tools",
    items: [
      { name: "Git / GitHub", level: 88 },
      { name: "Docker", level: 55 },
      { name: "Postman", level: 80 },
      { name: "CI/CD", level: 55 },
    ],
  },
];

const integrations = ["Razorpay", "Stripe", "PayPal", "CCAvenue", "Paytm"];
const domains = ["Government", "Healthcare", "E-Commerce", "Real Estate", "Astrology", "SaaS ERP"];

const stats = [
  ["4+", "Years Experience"],
  ["20+", "Projects Delivered"],
  ["15+", "Client Engagements"],
  ["40%", "Query Perf. Gain"],
];

const experience = [
  {
    role: "Senior Software Engineer",
    company: "Akiko Sherman Infotech Pvt. Ltd.",
    project: "NPPA Government Portal — nppa.gov.in",
    period: "Nov 2025 – Present",
    desc: [
      "Architect and build the full-stack Laravel backend and frontend for the NPPA government portal, meeting government security and regulatory standards.",
      "Designed RBAC and audit logging across 5+ user roles, reducing unauthorized access and meeting national data compliance requirements.",
      "Built a WCAG-accessible frontend with HTML, CSS, Bootstrap and AJAX, improving cross-device usability for citizen and admin users.",
    ],
    current: true,
  },
  {
    role: "PHP Laravel Developer",
    company: "Invoidea Technology Pvt. Ltd.",
    project: "New Delhi",
    period: "Mar 2022 – Oct 2025",
    desc: [
      "Developed 20+ full-stack projects and services for web and mobile clients, improving integration efficiency across 15+ client engagements.",
      "Integrated 5 payment gateways — Razorpay, Stripe, PayPal, CCAvenue, Paytm — enabling reliable transaction processing.",
      "Refactored MySQL query logic and redesigned schemas, cutting query execution time by ~40%.",
      "Shipped full-stack features (Laravel + React/Bootstrap) across 4+ client projects in e-commerce, real estate and astrology, following Agile sprints.",
    ],
    current: false,
  },
];

const projects = [
  {
    name: "Healthcare Appointment System",
    url: null,
    stack: ["MongoDB", "Express.js", "React.js", "Node.js"],
    desc: "Full-stack MERN platform for doctor discovery, appointment scheduling and availability management, with secure record access across 3 user roles.",
    icon: "🩺",
    color: "#3ea6ff",
  },
  {
    name: "NPPA Government Portal",
    url: "nppa.gov.in",
    stack: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    desc: "Compliant, high-availability Laravel backend and cross-browser UI supporting 10,000+ monthly users at 99%+ uptime.",
    icon: "🏛️",
    color: "#ff8a3d",
  },
  {
    name: "Yards India",
    url: "yardsindia.com",
    stack: ["Laravel", "React.js", "REST API"],
    desc: "Real estate portal with a Laravel admin panel, multi-tier login (Admin, Agent, User) and REST APIs powering the React.js frontend.",
    icon: "🏠",
    color: "#5ad1a5",
  },
  {
    name: "Workerman",
    url: null,
    stack: ["Laravel", "MySQL", "REST API"],
    desc: "SaaS ERP with 6 core modules — CRM, HRM, Office, Projects, Recruitment, Support — mobile-first, serving 100+ subscribing businesses.",
    icon: "🧰",
    color: "#c58cff",
  },
  {
    name: "Sagetalkz",
    url: "sagetalkz.com",
    stack: ["Laravel", "REST API", "Firebase"],
    desc: "Astrology platform with real-time chat and video calls via Firebase, and custom REST APIs for 1,000+ active users.",
    icon: "🔮",
    color: "#ffb347",
  },
];

const education = [
  {
    degree: "B.Tech, Computer Science",
    school: "Madhu Vachaspati Institute of Engineering & Technology (AKTU)",
    meta: "Graduated 2025 · CGPA 7.9/10",
  },
  {
    degree: "Diploma, Computer Science",
    school: "Government College (BTEUP)",
    meta: "2021 · 80%",
  },
];

const certifications = ["Node.js Development Certification — Udemy (REST APIs, auth, DB integration, scalable architecture)"];

const socials = [
  {
    name: "Email",
    href: "mailto:dev.suraj.cse@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    name: "Phone",
    href: "tel:+917518141123",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/surajyadav8205",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/suryacse2019",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

/* ---------------------------------------------------------
   TOKENS
--------------------------------------------------------- */

const C = {
  ink: "#0A0C10",
  panel: "#12151C",
  panelAlt: "#171B24",
  line: "rgba(232,228,219,0.09)",
  lineStrong: "rgba(232,228,219,0.18)",
  paper: "#E8E4DB",
  muted: "#8B93A7",
  mutedDim: "#5A6274",
  signal: "#FF8A3D",
  signalDim: "rgba(255,138,61,0.14)",
  circuit: "#7C9CFF",
};

/* ---------------------------------------------------------
   SMALL COMPONENTS
--------------------------------------------------------- */

function Eyebrow({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <span style={{ width: 18, height: 1, background: C.signal }} />
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: C.signal, letterSpacing: 0.5 }}>
        {children}
      </span>
    </div>
  );
}

function SkillBar({ skill, visible, delay }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: C.paper, fontWeight: 500, fontSize: 13.5 }}>{skill.name}</span>
        <span style={{ color: C.signal, fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace" }}>{skill.level}%</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 3, height: 4, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            borderRadius: 3,
            background: `linear-gradient(90deg, ${C.signal}, ${C.circuit})`,
            width: visible ? `${skill.level}%` : "0%",
            transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

const TERMINAL_LINES = [
  { cmd: "Who I Am", out: "Suraj Yadav — Full Stack Developer" },
  { cmd: "Current Role", out: "Senior Software Engineer @ Akiko Sherman Infotech" },
  { cmd: "Tech Stack", out: '["Laravel","Node.js","React.js","MySQL","MongoDB"]' },
  { cmd: "Status", out: "open to new opportunities" },
];

function TerminalHero() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), 480);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div
      style={{
        background: C.panel,
        border: `1px solid ${C.line}`,
        borderRadius: 10,
        overflow: "hidden",
        width: "100%",
        maxWidth: 480,
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: `1px solid ${C.line}`, background: C.panelAlt }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ marginLeft: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: C.mutedDim }}>
          Suraj
        </span>
      </div>
      <div style={{ padding: "20px 20px 24px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.9, minHeight: 190 }}>
        {TERMINAL_LINES.slice(0, shown).map((l, i) => (
          <div key={i} style={{ marginBottom: 8, animation: "fadeInUp 0.35s ease forwards" }}>
            <div style={{ color: C.muted }}>
              <span style={{ color: C.signal }}>❯</span> {l.cmd}
            </div>
            <div style={{ color: C.paper, paddingLeft: 16 }}>{l.out}</div>
          </div>
        ))}
        <span style={{ color: C.signal }}>❯</span>{" "}
         
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   MAIN
--------------------------------------------------------- */

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const skillsRef = useRef(null);

  const navItems = ["home", "about", "skills", "experience", "projects", "contact"];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navItems.map((id) => document.getElementById(id));
      const current = sections.filter(Boolean).findLast((s) => s.getBoundingClientRect().top <= 110);
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSkillsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (skillsRef.current) observer.observe(skillsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const styles = {
    page: { background: C.ink, color: C.paper, fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", width: "100%", overflowX: "hidden" },
    section: { maxWidth: 1080, margin: "0 auto", padding: "88px 28px" },
    h2: { fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px,4.5vw,40px)", fontWeight: 700, color: C.paper, letterSpacing: -0.5, marginBottom: 10 },
    card: { background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12, padding: 26 },
    btnPrimary: { background: C.signal, color: "#1a1206", border: "none", borderRadius: 8, padding: "13px 28px", fontWeight: 700, fontSize: 14.5, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" },
    btnOutline: { background: "transparent", color: C.paper, border: `1px solid ${C.lineStrong}`, borderRadius: 8, padding: "12px 26px", fontWeight: 600, fontSize: 14.5, cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" },
    tag: { background: "rgba(124,156,255,0.1)", color: C.circuit, border: "1px solid rgba(124,156,255,0.22)", borderRadius: 5, padding: "4px 11px", fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace" },
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        html, body { width: 100%; margin: 0; padding: 0; scroll-behavior: smooth; overflow-x: hidden; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        #root, #app { width: 100%; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .nav-link { color: ${C.mutedDim}; transition: color 0.2s; }
        .nav-link:hover, .nav-link.active { color: ${C.signal} !important; }
        .nav-tab:hover { background: rgba(255,255,255,0.06) !important; color: ${C.paper} !important; }
        .nav-resume-link:hover { color: ${C.signal} !important; border-color: rgba(255,138,61,0.35) !important; }
        .card-hover { transition: border-color 0.25s, transform 0.25s; }
        .card-hover:hover { border-color: rgba(255,138,61,0.35) !important; transform: translateY(-3px); }
        .social-btn:hover { border-color: ${C.signal} !important; color: ${C.signal} !important; }
        .btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
        .btn-outline:hover { border-color: ${C.signal} !important; color: ${C.signal} !important; }
        ::-webkit-scrollbar { width:6px } ::-webkit-scrollbar-track{background:${C.ink}} ::-webkit-scrollbar-thumb{background:${C.signal};border-radius:3px}
        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
        .desktop-nav-links, .desktop-nav-actions { display: flex; }
        .mobile-menu-btn { display: none; }
        .mobile-menu-panel { display: none; max-height: 0; overflow: hidden; }
        .mobile-menu-panel.open { display: flex; max-height: 70vh; overflow-y: auto; }
        @media (max-width: 1040px) {
          .desktop-nav-links { display: none !important; }
          .desktop-nav-actions { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 999,
          background: scrolled || menuOpen ? "rgba(10,12,16,0.85)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px) saturate(140%)" : "none",
          borderBottom: `1px solid ${scrolled || menuOpen ? C.line : "transparent"}`,
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, padding: "0 24px" }}>
          {/* logo */}
          <button
            onClick={() => scrollTo("home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              fontSize: 15,
              color: C.paper,
              flexShrink: 0,
              padding: 4,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.signal, boxShadow: `0 0 8px ${C.signal}` }} />
            Suraj
          </button>

          {/* desktop tab-style links */}
          <div className="desktop-nav-links" style={{ alignItems: "center", gap: 2, background: "rgba(255,255,255,0.03)", border: `1px solid ${C.line}`, borderRadius: 10, padding: 4 }}>
            {navItems.map((item) => {
              const active = activeSection === item;
              return (
                <button
                  key={item}
                  className="nav-tab"
                  style={{
                    position: "relative",
                    background: active ? C.signalDim : "transparent",
                    border: "none",
                    borderRadius: 7,
                    cursor: "pointer",
                    padding: "7px 14px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    fontWeight: active ? 600 : 400,
                    color: active ? C.signal : C.mutedDim,
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "background 0.2s, color 0.2s",
                  }}
                  onClick={() => scrollTo(item)}
                >
                  {active && <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.signal }} />}
                  {item}
                </button>
              );
            })}
          </div>

          {/* desktop actions */}
          <div className="desktop-nav-actions" style={{ alignItems: "center", gap: 8, flexShrink: 0 }}>
            <a
              href={RESUME_PDF}
              download={RESUME_FILENAME}
              className="nav-resume-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: C.mutedDim,
                textDecoration: "none",
                padding: "9px 12px",
                borderRadius: 8,
                border: `1px solid ${C.line}`,
                whiteSpace: "nowrap",
                transition: "color 0.2s, border-color 0.2s",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ flexShrink: 0 }}>
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Resume
            </a>
            <button
              onClick={() => window.open("mailto:dev.suraj.cse@gmail.com")}
              style={{ ...styles.btnPrimary, padding: "9px 20px", fontSize: 13, whiteSpace: "nowrap" }}
              className="btn-primary"
            >
              Hire Me
            </button>
          </div>

          {/* mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 38,
              height: 38,
              background: menuOpen ? C.signalDim : "rgba(255,255,255,0.03)",
              border: `1px solid ${menuOpen ? "rgba(255,138,61,0.3)" : C.line}`,
              borderRadius: 9,
              color: menuOpen ? C.signal : C.paper,
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* mobile slide-down panel */}
        <div className={`mobile-menu-panel ${menuOpen ? "open" : ""}`} style={{ flexDirection: "column", borderTop: `1px solid ${C.line}`, padding: "8px 20px 20px" }}>
          {navItems.map((item, i) => {
            const active = activeSection === item;
            return (
              <button
                key={item}
                className="nav-tab"
                style={{
                  background: active ? C.signalDim : "transparent",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  padding: "13px 12px",
                  textAlign: "left",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14.5,
                  fontWeight: active ? 600 : 400,
                  color: active ? C.signal : C.paper,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  animation: menuOpen ? `fadeInUp 0.3s ease ${i * 40}ms both` : "none",
                }}
                onClick={() => scrollTo(item)}
              >
                {active && <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.signal }} />}
                ./{item}
              </button>
            );
          })}
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <a
              href={RESUME_PDF}
              download={RESUME_FILENAME}
              style={{ ...styles.btnOutline, flex: 1, textAlign: "center", textDecoration: "none", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Resume
            </a>
            <button
              onClick={() => window.open("mailto:dev.suraj.cse@gmail.com")}
              style={{ ...styles.btnPrimary, flex: 1, fontSize: 13 }}
            >
              Hire Me
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 55% at 82% 30%, rgba(255,138,61,0.07) 0%, transparent 70%)",
          }}
        />
        <div style={{ ...styles.section, paddingTop: 100, display: "flex", alignItems: "center", gap: 56, flexWrap: "wrap", position: "relative" }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: C.signal, fontSize: 13, marginBottom: 18, letterSpacing: 0.5 }}>
              Available For Work
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(38px,6vw,60px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5, marginBottom: 18 }}>
              Suraj Yadav
            </h1>
            <p style={{ fontSize: "clamp(16px,2vw,19px)", color: C.circuit, fontWeight: 600, marginBottom: 16, fontFamily: "'JetBrains Mono', monospace" }}>
              Full Stack Developer — Laravel · Node.js · React
            </p>
            <p style={{ color: C.muted, lineHeight: 1.75, fontSize: 16, maxWidth: 460, marginBottom: 34 }}>
              4+ years building scalable, end-to-end web applications — from RESTful API design and database
              architecture to responsive interfaces. Shipped systems across government, healthcare, e-commerce and
              SaaS, with hands-on AI feature development using OpenAI, Claude and Gemini.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
              <a
                href={RESUME_PDF}
                download={RESUME_FILENAME}
                className="btn-primary"
                style={{ ...styles.btnPrimary, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Download Resume
              </a>
              <button className="btn-outline" style={styles.btnOutline} onClick={() => scrollTo("projects")}>
                View Projects
              </button>
              <button className="btn-outline" style={styles.btnOutline} onClick={() => scrollTo("contact")}>
                Get In Touch
              </button>
            </div>
            <div style={{ display: "flex", gap: 22, flexWrap: "wrap" }}>
              {stats.map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: C.paper }}>{num}</div>
                  <div style={{ fontSize: 11.5, color: C.mutedDim, fontFamily: "'JetBrains Mono', monospace" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <TerminalHero />
            <div style={{ display: "flex", gap: 12 }}>
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 38,
                    height: 38,
                    borderRadius: 8,
                    border: `1px solid ${C.line}`,
                    color: C.muted,
                    textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: C.panelAlt, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={styles.section}>
          <Eyebrow>About</Eyebrow>
          <h2 style={styles.h2}>Who I am</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 48, marginTop: 32, alignItems: "start" }}>
            <div>
              <p style={{ color: C.muted, lineHeight: 1.9, fontSize: 15.5, marginBottom: 18 }}>
                I'm a <strong style={{ color: C.paper }}>Full Stack Developer</strong> based in New Delhi, with over 4
                years building scalable web applications end-to-end using PHP, Laravel, Node.js, React.js and MySQL.
                My work spans the full lifecycle — REST API design, database architecture, payment integration and
                responsive, accessible interfaces.
              </p>
              <p style={{ color: C.muted, lineHeight: 1.9, fontSize: 15.5, marginBottom: 28 }}>
                I've delivered <strong style={{ color: C.paper }}>20+ full-stack projects</strong> across government,
                healthcare, e-commerce, real estate and SaaS domains, and I bring hands-on MERN stack and AI feature
                experience — integrating OpenAI, Gemini and Claude APIs into production systems.
              </p>

              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.mutedDim, marginBottom: 10 }}>
                // domain expertise
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {domains.map((d) => (
                  <span key={d} style={styles.tag}>
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ position: "relative", width: "100%", maxWidth: 260 }}>
                <span style={{ position: "absolute", top: -6, left: -6, width: 20, height: 20, borderTop: `2px solid ${C.signal}`, borderLeft: `2px solid ${C.signal}` }} />
                <span style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderTop: `2px solid ${C.signal}`, borderRight: `2px solid ${C.signal}` }} />
                <span style={{ position: "absolute", bottom: -6, left: -6, width: 20, height: 20, borderBottom: `2px solid ${C.signal}`, borderLeft: `2px solid ${C.signal}` }} />
                <span style={{ position: "absolute", bottom: -6, right: -6, width: 20, height: 20, borderBottom: `2px solid ${C.signal}`, borderRight: `2px solid ${C.signal}` }} />
                <div style={{ borderRadius: 6, overflow: "hidden", border: `1px solid ${C.line}` }}>
                  <img src={PROFILE_IMG} alt="Suraj Yadav" style={{ width: "100%", height: 280, objectFit: "cover", objectPosition: "center top", display: "block" }} />
                </div>
              </div>

              {[
                ["Location", "New Delhi, India"],
                ["Experience", "4+ Years Professional"],
                ["Education", "B.Tech CS, AKTU · 2025"],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${C.line}`, paddingBottom: 8 }}>
                  <span style={{ color: C.mutedDim, fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace" }}>{label}</span>
                  <span style={{ color: C.paper, fontSize: 13.5, fontWeight: 500 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={skillsRef}>
        <div style={styles.section}>
          <Eyebrow>Skills</Eyebrow>
          <h2 style={styles.h2}>My expertise</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginTop: 40 }}>
            {skillGroups.map((group, gi) => (
              <div key={group.title} style={{ ...styles.card }}>
                <h3 style={{ fontFamily: "'JetBrains Mono', monospace", color: C.signal, marginBottom: 20, fontSize: 13, letterSpacing: 0.5, textTransform: "uppercase" }}>
                  {group.title}
                </h3>
                {group.items.map((s, i) => (
                  <SkillBar key={s.name} skill={s} visible={skillsVisible} delay={gi * 60 + i * 60} />
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: C.mutedDim, marginRight: 6 }}>
              Payment Integrations
            </span>
            {integrations.map((tag) => (
              <span key={tag} style={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ background: C.panelAlt, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={styles.section}>
          <Eyebrow>Experience</Eyebrow>
          <h2 style={styles.h2}>Work history</h2>
          <div style={{ marginTop: 40, position: "relative" }}>
            <div style={{ position: "absolute", left: 5, top: 8, bottom: 8, width: 1, background: C.line }} />
            {experience.map((exp, i) => (
              <div key={i} style={{ display: "flex", gap: 28, marginBottom: 32 }}>
                <div style={{ flexShrink: 0, paddingTop: 6 }}>
                  <div
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      background: exp.current ? C.signal : C.mutedDim,
                      boxShadow: exp.current ? `0 0 0 4px ${C.signalDim}` : "none",
                    }}
                  />
                </div>
                <div className="card-hover" style={{ ...styles.card, flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                    <div>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.paper, fontWeight: 700, fontSize: 18 }}>{exp.role}</h3>
                      <div style={{ color: C.signal, fontWeight: 600, fontSize: 14, marginTop: 2 }}>{exp.company}</div>
                      <div style={{ color: C.mutedDim, fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{exp.project}</div>
                    </div>
                    <span
                      style={{
                        background: exp.current ? C.signalDim : "rgba(255,255,255,0.05)",
                        border: `1px solid ${exp.current ? "rgba(255,138,61,0.3)" : C.line}`,
                        color: exp.current ? C.signal : C.mutedDim,
                        borderRadius: 6,
                        padding: "4px 12px",
                        fontSize: 11.5,
                        fontFamily: "'JetBrains Mono', monospace",
                        whiteSpace: "nowrap",
                        height: "fit-content",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                    {exp.desc.map((d, j) => (
                      <li key={j} style={{ color: C.muted, fontSize: 14, display: "flex", gap: 10, lineHeight: 1.6 }}>
                        <span style={{ color: C.signal, flexShrink: 0 }}>▸</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div style={styles.section}>
          <Eyebrow>Projects</Eyebrow>
          <h2 style={styles.h2}>Featured work</h2>
          <p style={{ color: C.mutedDim, marginBottom: 40, fontSize: 14.5 }}>5 of 20+ delivered projects</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
            {projects.map((p) => (
              <div
                key={p.name}
                className="card-hover"
                style={{ ...styles.card, cursor: p.url ? "pointer" : "default" }}
                onClick={() => p.url && window.open(`https://${p.url}`, "_blank")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: `${p.color}1a`,
                      border: `1px solid ${p.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.paper, fontWeight: 700, fontSize: 15.5 }}>{p.name}</h3>
                    {p.url ? (
                      <a
                        href={`https://${p.url}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: C.circuit, fontSize: 12, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace" }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {p.url} ↗
                      </a>
                    ) : (
                      <span style={{ color: C.mutedDim, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>internal project</span>
                    )}
                  </div>
                </div>
                <p style={{ color: C.muted, fontSize: 13.5, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.stack.map((t) => (
                    <span key={t} style={styles.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {/* Education / Certifications card fills the grid */}
            <div style={{ ...styles.card, display: "flex", flexDirection: "column", gap: 16 }}>
              <h3 style={{ fontFamily: "'JetBrains Mono', monospace", color: C.signal, fontSize: 13, letterSpacing: 0.5, textTransform: "uppercase" }}>
                Education & Certs
              </h3>
              {education.map((e) => (
                <div key={e.degree}>
                  <div style={{ color: C.paper, fontWeight: 600, fontSize: 13.5 }}>{e.degree}</div>
                  <div style={{ color: C.muted, fontSize: 12.5, marginTop: 2 }}>{e.school}</div>
                  <div style={{ color: C.mutedDim, fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{e.meta}</div>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 12 }}>
                {certifications.map((c) => (
                  <div key={c} style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.6 }}>
                    🏅 {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: C.panelAlt, borderTop: `1px solid ${C.line}` }}>
        <div style={styles.section}>
          <Eyebrow>// contact</Eyebrow>
          <h2 style={styles.h2}>Let's connect</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", marginTop: 14, marginBottom: 6 }}>
            {[
              ["Availability", "Immediate"],
              ["Work Type", "On-site · Hybrid · Remote"],
              ["Location", "New Delhi, India"],
            ].map(([label, val]) => (
              <div key={label} style={{ fontSize: 13.5 }}>
                <span style={{ color: C.mutedDim, fontFamily: "'JetBrains Mono', monospace" }}>{label}: </span>
                <span style={{ color: C.paper, fontWeight: 500 }}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginTop: 40 }}>
            {[
              { icon: "📧", label: "Email", val: "dev.suraj.cse@gmail.com", href: "mailto:dev.suraj.cse@gmail.com" },
              { icon: "📞", label: "Phone", val: "+91 7518141123", href: "tel:+917518141123" },
              { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/surajyadav8205", href: "https://linkedin.com/in/surajyadav8205" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="card-hover"
                style={{ ...styles.card, textDecoration: "none", display: "flex", gap: 16, alignItems: "center" }}
              >
                <div style={{ fontSize: 26 }}>{c.icon}</div>
                <div>
                  <div style={{ color: C.mutedDim, fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {c.label}
                  </div>
                  <div style={{ color: C.paper, fontWeight: 600, fontSize: 14, marginTop: 3 }}>{c.val}</div>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 44, display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ ...styles.btnPrimary, fontSize: 15, padding: "15px 36px" }} onClick={() => window.open("mailto:dev.suraj.cse@gmail.com")}>
              Send Me a Message →
            </button>
            <a
              href={RESUME_PDF}
              download={RESUME_FILENAME}
              className="btn-outline"
              style={{ ...styles.btnOutline, fontSize: 15, padding: "15px 30px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15">
                <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.line}`, padding: "22px", textAlign: "center", color: C.mutedDim, fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace" }}>
        built by Suraj Yadav — Full Stack Developer, New Delhi
      </footer>
    </div>
  );
}
