import React from "react";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiTerminal, FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ sections, theme, onToggleTheme }) {
  // Set initial active to the first linkable section (skip brand/hero)
  const [active, setActive] = useState(sections[1]?.id || sections[0]?.id);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.12 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    const onScroll = () => {
      // Fallback: pick section whose top is closest to 30% viewport height
      const targetY = window.innerHeight * 0.3;
      let bestId = active;
      let bestDist = Infinity;
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - targetY);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = s.id;
        }
      });
      if (bestId && bestId !== active) setActive(bestId);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div
          className="brand"
          role="link"
          tabIndex={0}
          onClick={() => scrollTo(sections[0]?.id || "hero")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              scrollTo(sections[0]?.id || "hero");
            }
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
          }}
          title="Ir al inicio"
        >
          <FiTerminal color="#5b47d3" />
          {sections[0]?.label || "Portfolio"}
        </div>
        <button
          className="menu-btn"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {sections.slice(1).map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(s.id);
              }}
              className={active === s.id ? "active" : ""}
            >
              {s.label}
            </a>
          ))}
          <button
            className="btn"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>
    </nav>
  );
}
