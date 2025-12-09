import React from "react";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import content from "./content.json";
import { TechIcon } from "./icons";
import { FiDownload, FiMail, FiUser } from "react-icons/fi";
import { SiGithub, SiLinkedin } from "react-icons/si";

function Hero({ profile }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <section id="hero" className="section hero">
      <div className="container row">
        {imgOk ? (
          <img
            className="avatar"
            src={profile.avatar}
            alt={profile.name}
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="avatar-placeholder" aria-label={profile.name}>
            <FiUser size={56} />
          </div>
        )}
        <div>
          <h1 className="title">{profile.name}</h1>
          <div className="subtitle">{profile.role}</div>
          <p className="desc">{profile.description}</p>
          <div className="actions">
            <a className="btn" href={profile.cvUrl} download>
              <FiDownload /> Descargar CV
            </a>
            <a
              className="btn"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <SiGithub /> GitHub
            </a>
            <a
              className="btn"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <SiLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ text }) {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2>Sobre mí</h2>
        <p className="desc">{text}</p>
      </div>
    </section>
  );
}

function Skills({ skills }) {
  const isArray = Array.isArray(skills);
  if (isArray) {
    return (
      <section id="skills" className="section">
        <div className="container">
          <h2>Habilidades Técnicas</h2>
          <div className="skills">
            {skills.map((s) => (
              <span key={s} className="tag">
                <TechIcon name={s} /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }
  const entries = Object.entries(skills);
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2>Habilidades Técnicas</h2>
        <div style={{ display: "grid", gap: 24 }}>
          {entries.map(([group, list]) => (
            <div key={group}>
              <h3 style={{ margin: "6px 0 10px" }}>{group}</h3>
              <div className="skills">
                {list.map((s) => (
                  <span key={group + s} className="tag">
                    <TechIcon name={s} /> {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ projects }) {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2>Proyectos Destacados</h2>
        <div className="grid">
          {projects.map((p) => (
            <div key={p.title} className="card">
              <img src={p.image} alt={p.title} className="project-image" />
              <h3 style={{ margin: "8px 0" }}>{p.title}</h3>
              <p className="desc">{p.description}</p>
              <div className="actions">
                {p.url?.trim() && (
                  <a
                    className="btn"
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    🔗 Demo
                  </a>
                )}
                {p.repo?.trim() && (
                  <a
                    className="btn"
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📦 Repo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ items }) {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2>Experiencia Laboral</h2>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {items.map((x) => (
            <div key={x.company + x.role} className="card">
              <strong>{x.company}</strong>
              <div style={{ color: "var(--muted)" }}>
                {x.role} · {x.period}
              </div>
              <p className="desc">{x.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education({ items }) {
  return (
    <section id="education" className="section">
      <div className="container">
        <h2>Formación</h2>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {items.map((e) => (
            <div key={e.title + e.institution} className="card">
              <strong>{e.title}</strong>
              <div style={{ color: "var(--muted)" }}>{e.institution}</div>
              <div style={{ color: "var(--muted)" }}>{e.period}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ contact }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
    a: 0,
    b: 0,
    sum: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    ok: false,
    error: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  useEffect(() => {
    setForm((f) => ({
      ...f,
      a: Math.floor(1 + Math.random() * 9),
      b: Math.floor(1 + Math.random() * 9),
    }));
  }, []);

  const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.website) {
      setStatus({
        loading: false,
        ok: false,
        error: "Bloqueado por protección anti-bots",
      });
      return;
    }
    if (!validEmail(form.email)) {
      setStatus({ loading: false, ok: false, error: "Email inválido" });
      return;
    }
    const expected = form.a + form.b;
    if (String(expected) !== String(form.sum).trim()) {
      setStatus({
        loading: false,
        ok: false,
        error: "Verificación humana incorrecta",
      });
      return;
    }
    setStatus({ loading: true, ok: false, error: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          to: contact.email,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar el mensaje");
      setStatus({ loading: false, ok: true, error: "" });
      setForm({
        name: "",
        email: "",
        message: "",
        website: "",
        a: Math.floor(1 + Math.random() * 9),
        b: Math.floor(1 + Math.random() * 9),
        sum: "",
      });
    } catch (err) {
      setStatus({
        loading: false,
        ok: false,
        error: err.message || "Fallo de red",
      });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2>Contacto</h2>
        <div className="card" style={{ maxWidth: 640, margin: "0 auto" }}>
          <p className="desc">Escríbeme y te respondo a la brevedad.</p>
          <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
            <input
              name="name"
              type="text"
              placeholder="Tu nombre"
              value={form.name}
              onChange={onChange}
              required
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,.1)",
                background: "var(--card)",
                color: "var(--fg)",
              }}
            />
            <input
              name="email"
              type="email"
              placeholder="Tu email"
              value={form.email}
              onChange={onChange}
              required
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,.1)",
                background: "var(--card)",
                color: "var(--fg)",
              }}
            />
            <textarea
              name="message"
              placeholder="Mensaje"
              rows={5}
              value={form.message}
              onChange={onChange}
              required
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,.1)",
                background: "var(--card)",
                color: "var(--fg)",
              }}
            />
            <input
              name="website"
              value={form.website}
              onChange={onChange}
              style={{ position: "absolute", left: -9999 }}
              aria-hidden="true"
              tabIndex={-1}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                justifyContent: "center",
                color: "var(--muted)",
              }}
            >
              <span>Verificación humana:</span>
              <span>
                {form.a} + {form.b} =
              </span>
              <input
                name="sum"
                type="text"
                inputMode="numeric"
                value={form.sum}
                onChange={onChange}
                required
                style={{
                  width: 80,
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,.1)",
                  background: "var(--card)",
                  color: "var(--fg)",
                }}
              />
            </div>
            <div className="actions">
              <button className="btn" type="submit" disabled={status.loading}>
                <FiMail /> {status.loading ? "Enviando..." : "Enviar email"}
              </button>
            </div>
            {status.ok && (
              <div style={{ color: "#6ad27b" }}>
                Mensaje enviado correctamente.
              </div>
            )}
            {status.error && (
              <div style={{ color: "#e48b8b" }}>{status.error}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [pulsePos, setPulsePos] = useState({ x: "30%", y: "70%" });
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) setTheme(stored);
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const root = document.documentElement;
    if (theme === "light") root.classList.add("light");
    else root.classList.remove("light");
  }, [theme]);

  useEffect(() => {
    const id = setInterval(() => {
      const x = `${Math.round(20 + Math.random() * 60)}%`;
      const y = `${Math.round(20 + Math.random() * 60)}%`;
      setPulsePos({ x, y });
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const sections = [
    { id: "hero", label: content.profile.name },
    { id: "about", label: "Sobre mi" },
    { id: "skills", label: "Habilidades" },
    { id: "projects", label: "Proyectos" },
    { id: "experience", label: "Experiencia" },
    { id: "education", label: "Formación" },
    { id: "contact", label: "Contacto" },
  ];

  return (
    <div>
      <div
        className="grid-pulse"
        style={{ ["--x"]: pulsePos.x, ["--y"]: pulsePos.y }}
      />
      <Navbar
        sections={sections}
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <Hero profile={content.profile} />
      <About text={content.about.text} />
      <Skills skills={content.skills} />
      <Projects projects={content.projects} />
      <Experience items={content.experience} />
      <Education items={content.education} />
      <Contact contact={content.contact} />
      <footer className="footer">
        <div className="container">© {content.profile.actualization}</div>
      </footer>
    </div>
  );
}
