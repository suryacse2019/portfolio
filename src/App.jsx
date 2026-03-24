import { useState, useEffect, useRef } from "react";


const PROFILE_IMG =  '/profile-img.webp';


const skills = [
  { name: "Laravel", level: 95, cat: "Framework" },
  { name: "PHP", level: 80, cat: "Language" },
  { name: "ReactJS", level: 70, cat: "Framework" },
  { name: "JavaScript", level: 60, cat: "Language" },
  { name: "MySQL", level: 80, cat: "Database" },
  { name: "REST API", level: 93, cat: "Expertise" },
  { name: "Firebase", level: 70, cat: "Database" },
  { name: "Docker", level: 50, cat: "DevOps" },
  { name: "Git/GitHub", level: 88, cat: "Tool" },
  { name: "Bootstrap", level: 90, cat: "CSS" },
  { name: "jQuery/Ajax", level: 85, cat: "Library" },
  { name: "Node.js", level: 55, cat: "Language" },
];

const experience = [
  {
    role: "PHP Laravel Developer",
    company: "Akiko Sherman Infotech Pvt. Ltd.",
    project: "NPPA Project",
    period: "Nov 2025 – Present",
    desc: [
      "Designed and developed backend for NPPA government website using Laravel",
      "Ensured compliance with government standards and regulatory guidelines",
      "Built responsive frontend using HTML, CSS, Bootstrap, and AJAX",
    ],
    current: true,
  },
  {
    role: "PHP Laravel Developer",
    company: "Invoidea Technology Pvt. Ltd.",
    project: "New Delhi",
    period: "Mar 2022 – Oct 2025",
    desc: [
      "Designed REST APIs to improve system integration and scalability",
      "Integrated payment gateways: Razorpay, Stripe, PayPal, CCAvenue, Paytm",
      "Optimized backend architecture and database design for performance",
    ],
    current: false,
  },
];

const projects = [
  {
    name: "NPPA Government Website",
    url: "nppa.gov.in",
    stack: ["Laravel", "PHP", "Bootstrap"],
    desc: "Secure, scalable backend for official government website with accessibility standards compliance.",
    icon: "🏛️",
    color: "#1e40af",
  },
  {
    name: "Humsafar Holidays",
    url: "humsafarholidays.com",
    stack: ["Laravel", "HTML", "Bootstrap"],
    desc: "Dynamic travel booking platform with tour packages, hotel reservations, and car rental services.",
    icon: "✈️",
    color: "#047857",
  },
  {
    name: "Sagetalkz",
    url: "sagetalkz.com",
    stack: ["Laravel", "REST API", "Firebase"],
    desc: "Astrology platform with real-time chat and video call features powered by Firebase services.",
    icon: "🔮",
    color: "#7c3aed",
  },
  {
    name: "Yards India",
    url: "yardsindia.com",
    stack: ["Laravel", "ReactJS", "REST API"],
    desc: "Real estate platform with role-based access control, property listing, buying and rental workflows.",
    icon: "🏠",
    color: "#b45309",
  },
];

const socials = [
  {
    name: "Email",
    href: "mailto:suryacse2019@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    name: "Phone",
    href: "tel:+917518141123",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/surajyadav8205",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/suryacse2019",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
];

function SkillBar({ skill, visible }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{skill.name}</span>
        <span style={{ color: "#10b981", fontSize: 12, fontWeight: 700 }}>{skill.level}%</span>
      </div>
      <div style={{ background: "#1e2a3a", borderRadius: 999, height: 6, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            borderRadius: 999,
            background: "linear-gradient(90deg, #10b981, #06b6d4)",
            width: visible ? `${skill.level}%` : "0%",
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const skillsRef = useRef(null);

  const navItems = ["home", "about", "skills", "experience", "projects", "contact"];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((id) => document.getElementById(id));
      const current = sections.findLast((s) => s && s.getBoundingClientRect().top <= 100);
      if (current) setActiveSection(current.id);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSkillsVisible(true); },
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
    page: { background: "#060d1a", color: "#e2e8f0", fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh" },
    nav: {
      position: "fixed", top: 0, width: "100%", zIndex: 999,
      background: scrolled ? "rgba(6,13,26,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(16,185,129,0.15)" : "none",
      transition: "all 0.3s ease", padding: "0 24px",
    },
    navInner: { maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 },
    logo: { fontWeight: 800, fontSize: 20, color: "#10b981", letterSpacing: -0.5 },
    navLinks: { display: "flex", gap: 8, listStyle: "none", margin: 0, padding: 0 },
    navLink: (active) => ({
      padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500,
      color: active ? "#10b981" : "#94a3b8",
      background: active ? "rgba(16,185,129,0.1)" : "transparent",
      border: "none", outline: "none", transition: "all 0.2s",
      textTransform: "capitalize",
    }),
    section: { maxWidth: 1100, margin: "0 auto", padding: "80px 24px" },
    badge: { display: "inline-block", background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 16 },
    h2: { fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, color: "#f1f5f9", letterSpacing: -1, marginBottom: 8 },
    accent: { color: "#10b981" },
    card: { background: "linear-gradient(135deg, #0f1e2f 0%, #0a1525 100%)", border: "1px solid rgba(16,185,129,0.12)", borderRadius: 16, padding: 28, transition: "transform 0.3s, border-color 0.3s" },
    btn: { background: "linear-gradient(135deg, #10b981, #06b6d4)", color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer", transition: "all 0.3s" },
    btnOutline: { background: "transparent", color: "#10b981", border: "2px solid rgba(16,185,129,0.5)", borderRadius: 12, padding: "12px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer", transition: "all 0.3s" },
    tag: { background: "rgba(6,182,212,0.15)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.25)", borderRadius: 6, padding: "3px 10px", fontSize: 11, fontWeight: 600 },
    dot: { width: 10, height: 10, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 12px rgba(16,185,129,0.8)" },
  };

  return (
    <div style={styles.page}>
      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(16,185,129,0.3)} 50%{box-shadow:0 0 40px rgba(16,185,129,0.6)} }
        .nav-link:hover { color: #10b981 !important; background: rgba(16,185,129,0.08) !important; }
        .project-card:hover { transform: translateY(-6px); border-color: rgba(16,185,129,0.35) !important; }
        .social-btn:hover { transform: scale(1.12); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(16,185,129,0.35); }
        .btn-outline:hover { background: rgba(16,185,129,0.1) !important; }
        ::-webkit-scrollbar { width:6px } ::-webkit-scrollbar-track{background:#060d1a} ::-webkit-scrollbar-thumb{background:#10b981;border-radius:3px}
      `}</style>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logo}>SY<span style={{ color: "#06b6d4" }}>.</span></div>
          <ul style={{ ...styles.navLinks, display: menuOpen ? "none" : "flex" }}>
            {navItems.map((item) => (
              <li key={item}>
                <button className="nav-link" style={styles.navLink(activeSection === item)} onClick={() => scrollTo(item)}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => window.open("mailto:suryacse2019@gmail.com")} style={{ ...styles.btn, padding: "8px 20px", fontSize: 13 }} className="btn-primary">
            Hire Me
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(16,185,129,0.06) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: 80, right: 80, width: 400, height: 400, background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
        
        <div style={{ ...styles.section, paddingTop: 120, display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap", position: "relative" }}>
          {/* Text */}
          <div style={{ flex: 1, minWidth: 280, animation: "fadeInUp 0.8s ease forwards" }}>
            <div style={styles.badge}>Available for Work</div>
            <h1 style={{ fontSize: "clamp(36px,6vw,64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: -2, marginBottom: 20 }}>
              Hi, I'm <span style={styles.accent}>Suraj</span><br />Yadav
            </h1>
            <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "#64748b", fontWeight: 600, marginBottom: 12, letterSpacing: 1, textTransform: "uppercase" }}>
              Laravel & React Developer
            </p>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: 16, maxWidth: 460, marginBottom: 32 }}>
              Crafting high-performance web applications with <span style={styles.accent}>4+ years</span> of expertise in PHP, Laravel, ReactJS & REST APIs. Delivered <span style={styles.accent}>15+ projects</span> including government portals and enterprise platforms.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
              <button className="btn-primary" style={styles.btn} onClick={() => scrollTo("projects")}>View Projects</button>
              <button className="btn-outline" style={styles.btnOutline} onClick={() => scrollTo("contact")}>Get In Touch</button>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="social-btn"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 42, height: 42, borderRadius: 12, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981", textDecoration: "none", transition: "transform 0.2s" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <div style={{ position: "relative", animation: "float 6s ease-in-out infinite", flexShrink: 0 }}>
            <div style={{ position: "absolute", inset: -3, borderRadius: "50% 30% 50% 30%", background: "linear-gradient(135deg, #10b981, #06b6d4)", zIndex: 0, animation: "spin 8s linear infinite" }} />
            <div style={{ position: "relative", width: 280, height: 320, borderRadius: "45% 25% 45% 25%", overflow: "hidden", zIndex: 1, border: "4px solid #060d1a" }}>
              <img src={PROFILE_IMG} alt="Suraj Yadav"
                style={{ width: "100%", height: "160%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
            <div style={{ position: "absolute", bottom: -12, right: -16, background: "linear-gradient(135deg, #10b981, #047857)", borderRadius: 16, padding: "10px 18px", fontSize: 13, fontWeight: 700, color: "#fff", zIndex: 2 }}>
              4+ Years Exp
            </div>
            <div style={{ position: "absolute", top: -12, left: -16, background: "linear-gradient(135deg, #1e40af, #1e3a8a)", borderRadius: 16, padding: "10px 18px", fontSize: 13, fontWeight: 700, color: "#fff", zIndex: 2 }}>
              15+ Projects
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ position: "absolute", bottom: 40, left: 0, right: 0 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[["4+", "Years Experience"], ["15+", "Projects Delivered"], ["5", "Payment Gateways"], ["3", "Frameworks"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#10b981" }}>{num}</div>
                <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: "rgba(15,30,47,0.3)" }}>
        <div style={styles.section}>
          <div style={styles.badge}>About Me</div>
          <h2 style={styles.h2}>Who I <span style={styles.accent}>Am</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 40 }}>
            <div style={{ gridColumn: "span 2" }}>
              <p style={{ color: "#94a3b8", lineHeight: 1.9, fontSize: 16, marginBottom: 20 }}>
                I'm a passionate <strong style={{ color: "#e2e8f0" }}>Full Stack Web Developer</strong> based in New Delhi, India, with over 4 years of hands-on experience building scalable, high-performance web applications. My expertise spans the entire development lifecycle from REST API design to payment integration and real-time features.
              </p>
              <p style={{ color: "#94a3b8", lineHeight: 1.9, fontSize: 16 }}>
                I've successfully delivered <strong style={{ color: "#e2e8f0" }}>15+ projects</strong> across government portals, travel platforms, astrology apps, and real estate platforms. I'm driven by clean code, performance optimization, and building seamless user experiences.
              </p>
            </div>
            {[
              { icon: "🎓", title: "Education", val: "B.Tech CS, AKTU · CGPA 7.9/10 · 2025" },
              { icon: "📍", title: "Location", val: "New Delhi, India" },
              { icon: "💼", title: "Experience", val: "4+ Years Professional" },
              { icon: "🎯", title: "Specialty", val: "Laravel, REST APIs, Payment Gateway" },
            ].map((item) => (
              <div key={item.title} style={{ ...styles.card, display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ color: "#64748b", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={skillsRef}>
        <div style={styles.section}>
          <div style={styles.badge}>Technical Skills</div>
          <h2 style={styles.h2}>My <span style={styles.accent}>Expertise</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, marginTop: 48 }}>
            <div style={styles.card}>
              <h3 style={{ color: "#10b981", marginBottom: 24, fontWeight: 700 }}>Core Technologies</h3>
              {skills.slice(0, 6).map((s) => <SkillBar key={s.name} skill={s} visible={skillsVisible} />)}
            </div>
            <div style={styles.card}>
              <h3 style={{ color: "#06b6d4", marginBottom: 24, fontWeight: 700 }}>Tools & More</h3>
              {skills.slice(6).map((s) => <SkillBar key={s.name} skill={s} visible={skillsVisible} />)}
            </div>
          </div>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Payment Gateways", "Razorpay", "Stripe", "PayPal", "CCAvenue", "Paytm", "Role-Based Access", "Real-time Chat", "Video Calls", "System Optimization"].map((tag) => (
              <span key={tag} style={{ ...styles.tag, fontSize: 13, padding: "6px 14px" }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ background: "rgba(15,30,47,0.3)" }}>
        <div style={styles.section}>
          <div style={styles.badge}>Work History</div>
          <h2 style={styles.h2}>My <span style={styles.accent}>Experience</span></h2>
          <div style={{ marginTop: 48, position: "relative" }}>
            <div style={{ position: "absolute", left: 20, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, #10b981, #06b6d4, transparent)" }} />
            {experience.map((exp, i) => (
              <div key={i} style={{ display: "flex", gap: 32, marginBottom: 40, animation: "fadeInUp 0.6s ease forwards" }}>
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, paddingTop: 4 }}>
                  <div style={{ ...styles.dot, animation: exp.current ? "glow 2s ease-in-out infinite" : "none" }} />
                </div>
                <div style={{ ...styles.card, flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                    <div>
                      <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 18 }}>{exp.role}</h3>
                      <div style={{ color: "#10b981", fontWeight: 600, fontSize: 14 }}>{exp.company}</div>
                      <div style={{ color: "#64748b", fontSize: 13 }}>{exp.project}</div>
                    </div>
                    <div>
                      <span style={{ background: exp.current ? "rgba(16,185,129,0.15)" : "rgba(30,42,60,0.8)", border: `1px solid ${exp.current ? "rgba(16,185,129,0.4)" : "rgba(100,116,139,0.3)"}`, color: exp.current ? "#10b981" : "#64748b", borderRadius: 999, padding: "4px 14px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                        {exp.current ? "🟢 Current" : exp.period}
                      </span>
                      {exp.current && <div style={{ color: "#64748b", fontSize: 11, textAlign: "right", marginTop: 4 }}>{exp.period}</div>}
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                    {exp.desc.map((d, j) => (
                      <li key={j} style={{ color: "#94a3b8", fontSize: 14, display: "flex", gap: 10 }}>
                        <span style={{ color: "#10b981", flexShrink: 0 }}>▸</span>{d}
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
          <div style={styles.badge}>Portfolio</div>
          <h2 style={styles.h2}>Featured <span style={styles.accent}>Projects</span></h2>
          <p style={{ color: "#64748b", marginBottom: 48, fontSize: 15 }}>Showcasing 4 of 15+ delivered projects</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {projects.map((p) => (
              <div key={p.name} className="project-card" style={{ ...styles.card, cursor: "pointer" }} onClick={() => window.open(`https://${p.url}`, "_blank")}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${p.color}22`, border: `1px solid ${p.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{p.icon}</div>
                  <div>
                    <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16 }}>{p.name}</h3>
                    <a href={`https://${p.url}`} target="_blank" rel="noreferrer" style={{ color: "#10b981", fontSize: 12, textDecoration: "none" }} onClick={(e) => e.stopPropagation()}>{p.url} ↗</a>
                  </div>
                </div>
                <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.stack.map((t) => <span key={t} style={styles.tag}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, ...styles.card, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16 }}>+ 11 More Projects</div>
              <div style={{ color: "#64748b", fontSize: 14 }}>Including internal tools, CRMs, and custom dashboards</div>
            </div>
            <button className="btn-outline" style={styles.btnOutline} onClick={() => scrollTo("contact")}>Request Portfolio</button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "rgba(15,30,47,0.3)" }}>
        <div style={styles.section}>
          <div style={styles.badge}>Get In Touch</div>
          <h2 style={styles.h2}>Let's <span style={styles.accent}>Connect</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 48 }}>
            {[
              { icon: "📧", label: "Email", val: "suryacse2019@gmail.com", href: "mailto:suryacse2019@gmail.com" },
              { icon: "📞", label: "Phone", val: "+91 7518141123", href: "tel:+917518141123" },
              { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/surajyadav8205", href: "https://linkedin.com/in/surajyadav8205" },
            ].map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="project-card"
                style={{ ...styles.card, textDecoration: "none", display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ fontSize: 32 }}>{c.icon}</div>
                <div>
                  <div style={{ color: "#64748b", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{c.label}</div>
                  <div style={{ color: "#10b981", fontWeight: 600, fontSize: 14, marginTop: 2 }}>{c.val}</div>
                </div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn-primary" style={{ ...styles.btn, fontSize: 16, padding: "16px 40px" }} onClick={() => window.open("mailto:suryacse2019@gmail.com")}>
              Send Me a Message →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(16,185,129,0.1)", padding: "24px", textAlign: "center", color: "#334155", fontSize: 13 }}>
        <span>Designed & built by </span><span style={{ color: "#10b981", fontWeight: 700 }}>Suraj Yadav</span>
        <span> · </span><span>Laravel Developer · New Delhi, India</span>
      </footer>
    </div>
  );
}
