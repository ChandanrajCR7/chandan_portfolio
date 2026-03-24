import { useState, useEffect } from "react";

const resumeUrl = `${import.meta.env.BASE_URL}cahndancv.pdf`;

const navLinks = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Projects",     href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Journey",      href: "#journey" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar({ onToggleTheme, theme }) {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Nav is always dark-space styled regardless of section theme
  const navBg = scrolled
    ? "rgba(0,0,15,0.95)"
    : "transparent";
  const navBorder = scrolled
    ? "1px solid rgba(255,255,255,0.06)"
    : "1px solid transparent";
  const linkColor = scrolled
    ? "rgba(255,255,255,0.8)"
    : "#FFFFFF";

  return (
    <nav
      style={{
        background: navBg,
        borderBottom: navBorder,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.35)" : "none",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="#home"
            style={{ color: "#FFFFFF" }}
            className="text-xl font-bold tracking-tight"
          >
            <span style={{ color: "#A855F7" }}>C</span>handan{" "}
            <span style={{ color: "#A855F7" }}>R</span>aj
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ color: linkColor }}
                className="relative text-sm font-medium group transition-colors duration-200 hover:text-white"
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-0.5 rounded-full group-hover:w-full transition-all duration-300"
                  style={{ background: "#A855F7" }}
                />
              </a>
            ))}

            {/* Resume button */}
            <a
              href={resumeUrl}
              download
              style={{
                background: "#FFFFFF",
                color: "#00000F",
                border: "1.5px solid #FFFFFF",
                padding: "0.38rem 1rem",
                borderRadius: "0.55rem",
                fontWeight: 600,
                fontSize: "0.82rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg style={{ width: "0.82rem", height: "0.82rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Resume
            </a>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                borderRadius: "9999px",
                padding: "0.4rem",
              }}
              className="transition-colors hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-1 transition-colors"
            style={{ color: "rgba(255,255,255,0.75)" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            style={{
              background: "rgba(0,0,15,0.97)",
              borderTop: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            className="md:hidden py-2 rounded-b-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{ color: "rgba(255,255,255,0.75)" }}
                className="block px-4 py-3 text-sm font-medium transition-colors hover:text-white hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-3 pb-4 flex items-center gap-3">
              <a
                href={resumeUrl}
                download
                style={{
                  background: "#FFFFFF",
                  color: "#00000F",
                  padding: "0.45rem 1.1rem",
                  borderRadius: "0.55rem",
                  fontWeight: 600,
                  fontSize: "0.82rem",
                  textDecoration: "none",
                }}
                onClick={() => setIsOpen(false)}
              >
                Resume
              </a>
              <button
                type="button"
                onClick={onToggleTheme}
                style={{
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#FFFFFF",
                  borderRadius: "9999px",
                  padding: "0.38rem 0.75rem",
                  fontSize: "0.8rem",
                }}
                className="transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? "Switch to light" : "Switch to dark"}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
