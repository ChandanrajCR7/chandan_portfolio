import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "../utils/animations";

const resumeUrl = `${import.meta.env.BASE_URL}cahndancv.pdf`;

// ─────────────────────────────────────────────────────────────────────────────
// Deep Space Canvas Hook
// ─────────────────────────────────────────────────────────────────────────────
function useDeepSpace(canvasRef, sectionRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    let W = 0, H = 0;
    let raf = null, paused = false;
    let stars = [], diskParticles = [];
    let shootingStar = null, nextShoot = 0;
    let diskRot = 0, bhHovered = false;
    let nebula = null;

    const EH = 60; // event horizon radius px
    const R = (a, b) => a + Math.random() * (b - a);

    // ── Stars ─────────────────────────────────────────────────────────────────
    function initStars() {
      stars = [];
      [
        { n: 300, rMin: 0.4, rMax: 0.8, vMin: 0.02, vMax: 0.05 },
        { n: 80,  rMin: 1.0, rMax: 1.8, vMin: 0.08, vMax: 0.15 },
        { n: 25,  rMin: 2.0, rMax: 3.5, vMin: 0.20, vMax: 0.30 },
      ].forEach(({ n, rMin, rMax, vMin, vMax }, li) => {
        for (let i = 0; i < n; i++) {
          stars.push({
            layer: li + 1,
            x: R(0, W), y: R(0, H),
            r: R(rMin, rMax),
            speed: R(vMin, vMax),
            phase: R(0, Math.PI * 2),
            warm: li === 1 && Math.random() < 0.3,
          });
        }
      });
    }

    // ── Nebula offscreen canvas ───────────────────────────────────────────────
    function buildNebula() {
      nebula = document.createElement("canvas");
      nebula.width = W;
      nebula.height = H;
      const nc = nebula.getContext("2d");
      [
        { cx: 0.30, cy: 0.40, r: 300, rgb: "88,28,220",   a: 0.08 },
        { cx: 0.75, cy: 0.55, r: 250, rgb: "249,115,22",  a: 0.06 },
        { cx: 0.50, cy: 0.25, r: 200, rgb: "20,184,166",  a: 0.05 },
      ].forEach(({ cx, cy, r, rgb, a }) => {
        const g = nc.createRadialGradient(W * cx, H * cy, 0, W * cx, H * cy, r);
        g.addColorStop(0,    `rgba(${rgb},${a})`);
        g.addColorStop(0.45, `rgba(${rgb},${a * 0.45})`);
        g.addColorStop(1,    `rgba(${rgb},0)`);
        nc.fillStyle = g;
        nc.fillRect(0, 0, W, H);
      });
    }

    // ── Accretion disk particles ──────────────────────────────────────────────
    function initDisk() {
      diskParticles = [];
      for (let i = 0; i < 20; i++) {
        const r = R(130, 180);
        diskParticles.push({
          r,
          angle: R(0, Math.PI * 2),
          speed: R(0.006, 0.012) / Math.sqrt(r / 130),
          radius: R(1, 2),
          warm: Math.random() < 0.5,
          wx: 0, wy: 0,
          trail: [],
        });
      }
    }

    // ── Shooting star ─────────────────────────────────────────────────────────
    function spawnShoot(bhX, bhY, ts) {
      const sx = R(W * 0.5, W * 0.95);
      const sy = R(0, H * 0.35);
      const ex = sx - R(100, 160);
      const ey = sy + R(100, 160);
      const mx = (sx + ex) / 2;
      const my = (sy + ey) / 2;
      const d  = Math.hypot(mx - bhX, my - bhY);
      const cpX = d < 250 ? mx + (bhX - mx) * 0.3 : mx;
      const cpY = d < 250 ? my + (bhY - my) * 0.3 : my;
      shootingStar = { sx, sy, ex, ey, cpX, cpY, t0: ts, dur: 600 };
    }

    // ── Resize ────────────────────────────────────────────────────────────────
    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      buildNebula();
      initStars();
      initDisk();
    }

    // ── Main draw loop ────────────────────────────────────────────────────────
    function frame(ts) {
      if (paused) { raf = requestAnimationFrame(frame); return; }

      if (nextShoot === 0) nextShoot = ts + R(6000, 10000);

      const bhX = W * 0.75;
      const bhY = H * 0.5;

      // Background
      ctx.fillStyle = "#00000F";
      ctx.fillRect(0, 0, W, H);

      // Nebula (drawn once to offscreen, blitted each frame)
      if (nebula) ctx.drawImage(nebula, 0, 0);

      // ── Aurora hint ──────────────────────────────────────────────────────────
      const aY   = H * 0.85;
      const aAmp = H * 0.025;
      // period ≈ 4 s → ω = 2π/4000 ms ≈ 0.00157
      [[249, 115, 22, 0, 0.00157, 0.55], [88, 28, 220, 1.2, 0.00118, 0.45]].forEach(
        ([r, g, b, ph, omega, widthFrac]) => {
          const freq = (Math.PI * 2) / (W * widthFrac);
          const spd  = ts * omega;
          const grad = ctx.createLinearGradient(0, aY - aAmp, 0, H);
          grad.addColorStop(0, `rgba(${r},${g},${b},0.04)`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.moveTo(0, H);
          for (let x = 0; x <= W; x += 3)
            ctx.lineTo(x, aY + Math.sin(x * freq + spd + ph) * aAmp);
          ctx.lineTo(W, H);
          ctx.closePath();
          ctx.fillStyle = grad;
          ctx.fill();
        }
      );

      // ── Stars ─────────────────────────────────────────────────────────────────
      for (const s of stars) {
        s.y -= s.speed;
        if (s.y < -5) { s.y = H + 5; s.x = R(0, W); }

        const tAmp = [0, 0.35, 0.45, 0.60][s.layer];
        const tSpd = [0, 0.0008, 0.0015, 0.003][s.layer];
        const base = [0, 0.55, 0.75, 0.95][s.layer];
        let op = Math.max(0.05, Math.min(1, base + Math.sin(ts * tSpd + s.phase) * tAmp));

        const dx = s.x - bhX, dy = s.y - bhY;
        const dist = Math.hypot(dx, dy);

        // Consumed by black hole
        if (dist < EH + 5) {
          do { s.x = R(0, W); s.y = R(0, H); }
          while (Math.hypot(s.x - bhX, s.y - bhY) < 220);
          continue;
        }

        // Gravitational lensing pull on nearby stars
        let px = s.x, py = s.y;
        if (dist < 180) {
          const pull = (bhHovered ? 450 : 200) / (dist * dist + 1);
          px = s.x - dx * pull;
          py = s.y - dy * pull;
          op = Math.min(1, op * (1 + (180 - dist) / 180 * 0.65));
        }

        if (s.layer < 3) {
          ctx.beginPath();
          ctx.arc(px, py, s.r, 0, Math.PI * 2);
          ctx.fillStyle = s.warm
            ? `rgba(255,240,200,${op})`
            : `rgba(255,255,255,${op})`;
          ctx.fill();
        } else {
          // Large bright stars — 4-pointed bloom
          ctx.save();
          ctx.translate(px, py);
          ctx.globalAlpha = op;

          const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, s.r * 3.5);
          halo.addColorStop(0, "rgba(255,255,255,0.28)");
          halo.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = halo;
          ctx.fillRect(-s.r * 3.5, -s.r * 3.5, s.r * 7, s.r * 7);

          ctx.beginPath();
          ctx.arc(0, 0, s.r, 0, Math.PI * 2);
          ctx.fillStyle = "#fff";
          ctx.fill();

          const arm = s.r * 4.5;
          for (let a = 0; a < 4; a++) {
            const ang = (a * Math.PI) / 2;
            const g = ctx.createLinearGradient(
              0, 0, Math.cos(ang) * arm, Math.sin(ang) * arm
            );
            g.addColorStop(0, "rgba(255,255,255,0.5)");
            g.addColorStop(1, "rgba(255,255,255,0)");
            ctx.strokeStyle = g;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(Math.cos(ang) * arm, Math.sin(ang) * arm);
            ctx.stroke();
          }
          ctx.restore();
        }
      }

      // ── Shooting star ─────────────────────────────────────────────────────────
      if (!shootingStar && ts >= nextShoot) {
        spawnShoot(bhX, bhY, ts);
        nextShoot = ts + R(6000, 10000);
      }
      if (shootingStar) {
        const t = Math.min(1, (ts - shootingStar.t0) / shootingStar.dur);
        if (t >= 1) {
          shootingStar = null;
        } else {
          const B = (p, a, b, c) =>
            a * (1 - p) * (1 - p) + 2 * b * (1 - p) * p + c * p * p;
          const hx = B(t, shootingStar.sx, shootingStar.cpX, shootingStar.ex);
          const hy = B(t, shootingStar.sy, shootingStar.cpY, shootingStar.ey);
          const t0 = Math.max(0, t - 0.18);
          const tx = B(t0, shootingStar.sx, shootingStar.cpX, shootingStar.ex);
          const ty = B(t0, shootingStar.sy, shootingStar.cpY, shootingStar.ey);
          const alpha = t < 0.5 ? t * 2 : (1 - t) * 2;
          const g = ctx.createLinearGradient(tx, ty, hx, hy);
          g.addColorStop(0, "rgba(255,255,255,0)");
          g.addColorStop(1, `rgba(255,255,255,${alpha * 0.9})`);
          ctx.save();
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(hx, hy);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(hx, hy, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
          ctx.restore();
        }
      }

      // ── Update disk particles ─────────────────────────────────────────────────
      diskRot += 0.002;
      const br = bhHovered ? 1.4 : 1.0;

      for (const p of diskParticles) {
        p.angle += p.speed;
        p.wx = bhX + Math.cos(p.angle) * p.r;
        p.wy = bhY + Math.sin(p.angle) * p.r * 0.22;
        p.trail.push({ x: p.wx, y: p.wy });
        if (p.trail.length > 5) p.trail.shift();
      }

      // ── Black hole (all layers in one translated context) ─────────────────────
      ctx.save();
      ctx.translate(bhX, bhY);

      // 1. Gravitational lensing rings (outermost, very faint warped ellipses)
      for (let i = 0; i < 8; i++) {
        const rr = 240 - i * 14;
        ctx.beginPath();
        ctx.ellipse(
          0, 0,
          rr * (1 + Math.sin(i * 0.9)  * 0.018),
          rr * (1 - Math.cos(i * 0.7)  * 0.015),
          i * 0.04, 0, Math.PI * 2
        );
        ctx.strokeStyle = "rgba(255,255,255,0.015)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // 2. Accretion disk glow (full ellipse, slowly rotating)
      ctx.save();
      ctx.rotate(diskRot - Math.PI / 12);
      [
        [`rgba(255,140,20,${0.06 * br})`, 40],
        [`rgba(255,160,40,${0.09 * br})`, 28],
        [`rgba(255,180,60,${0.12 * br})`, 18],
        [`rgba(255,200,80,${0.18 * br})`, 10],
        [`rgba(255,220,120,${0.25 * br})`, 4],
      ].forEach(([c, w]) => {
        ctx.beginPath();
        ctx.ellipse(0, 0, 160, 35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = c;
        ctx.lineWidth = w;
        ctx.stroke();
      });
      ctx.restore();

      // 3. Back-side disk particles (sin < 0 = upper half = behind BH in perspective)
      //    Drawn here so the event horizon circle (step 5) will occlude them.
      for (const p of diskParticles) {
        if (Math.sin(p.angle) >= 0) continue;
        const lx = p.wx - bhX;
        const ly = p.wy - bhY;
        const col = p.warm
          ? `rgba(255,220,100,${0.65 * br})`
          : `rgba(255,160,60,${0.48 * br})`;
        for (let ti = 0; ti < p.trail.length; ti++) {
          const a = (ti / p.trail.length) * 0.3 * br;
          ctx.beginPath();
          ctx.arc(p.trail[ti].x - bhX, p.trail[ti].y - bhY, p.radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = p.warm ? `rgba(255,220,100,${a})` : `rgba(255,160,60,${a})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(lx, ly, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
      }

      // 4. Photon sphere glow (inner bright ring just outside event horizon)
      {
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, 95);
        g.addColorStop(0.64, `rgba(255,200,100,0)`);
        g.addColorStop(0.72, `rgba(255,220,150,${0.55 * br})`);
        g.addColorStop(0.82, `rgba(255,160,60,${0.18 * br})`);
        g.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(-95, -95, 190, 190);
      }

      // 5. Event horizon — pure black circle, occludes everything behind it
      ctx.beginPath();
      ctx.arc(0, 0, EH, 0, Math.PI * 2);
      ctx.fillStyle = "#00000F";
      ctx.fill();
      // Inner vignette
      {
        const g = ctx.createRadialGradient(0, 0, EH * 0.78, 0, 0, EH);
        g.addColorStop(0, "rgba(0,0,0,0)");
        g.addColorStop(1, "rgba(0,0,0,1)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, EH, 0, Math.PI * 2);
        ctx.fill();
      }

      // 6. Relativistic jets (up and down, pulsing purple-white)
      {
        const ja = Math.sin(ts * 0.003) * 0.07 + 0.06;
        ctx.lineWidth = 2;
        [[0, -EH, 0, -220], [0, EH, 0, 220]].forEach(([x1, y1, x2, y2]) => {
          const g = ctx.createLinearGradient(x1, y1, x2, y2);
          g.addColorStop(0, `rgba(180,140,255,${ja})`);
          g.addColorStop(1, "rgba(180,140,255,0)");
          ctx.strokeStyle = g;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        });
      }

      ctx.restore(); // end BH translate

      // 7. Front-side disk particles (sin >= 0 = lower half = in front of BH)
      //    Drawn after ctx.restore so they render on top of the event horizon.
      for (const p of diskParticles) {
        if (Math.sin(p.angle) < 0) continue;
        const col = p.warm
          ? `rgba(255,220,100,${0.80 * br})`
          : `rgba(255,160,60,${0.65 * br})`;
        for (let ti = 0; ti < p.trail.length; ti++) {
          const a = (ti / p.trail.length) * 0.38 * br;
          ctx.beginPath();
          ctx.arc(p.trail[ti].x, p.trail[ti].y, p.radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = p.warm ? `rgba(255,220,100,${a})` : `rgba(255,160,60,${a})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(p.wx, p.wy, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    // ── Mouse — track hover near black hole ───────────────────────────────────
    function onMouse(e) {
      const rect = section.getBoundingClientRect();
      bhHovered =
        Math.hypot(e.clientX - rect.left - W * 0.75, e.clientY - rect.top - H * 0.5) < 300;
    }
    section.addEventListener("mousemove", onMouse);

    // ── Pause when off-screen ─────────────────────────────────────────────────
    const io = new IntersectionObserver(([e]) => { paused = !e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    // ── Resize observer ───────────────────────────────────────────────────────
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    raf = requestAnimationFrame(frame);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      section.removeEventListener("mousemove", onMouse);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const canvasRef  = useRef(null);
  const sectionRef = useRef(null);
  useDeepSpace(canvasRef, sectionRef);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen relative overflow-hidden"
      style={{ background: "#00000F" }}
    >
      {/* Deep space canvas — full-bleed, behind everything */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0, pointerEvents: "none" }}
      />

      {/* Hero content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-20">
          <motion.div
            className="max-w-lg"
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            animate="visible"
          >
            {/* Available for work */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8">
              <span className="relative flex h-2 w-2">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: "#16A34A" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: "#16A34A" }}
                />
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.78rem",
                  letterSpacing: "0.08em",
                  fontFamily: "monospace",
                  textTransform: "uppercase",
                }}
              >
                Available for work
              </span>
            </motion.div>

            {/* Name — text-reveal-wrapper spans */}
            <motion.div variants={fadeUp} className="mb-5">
              <span
                style={{
                  display: "block",
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "1.05rem",
                  fontWeight: 400,
                  marginBottom: "0.35em",
                  letterSpacing: "0.03em",
                }}
              >
                Hi, I&apos;m
              </span>
              <h1
                className="font-extrabold tracking-tight"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                  lineHeight: 1.08,
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                {/* text-reveal-wrapper: overflow hidden clip */}
                <span
                  className="text-reveal-wrapper"
                  style={{ display: "block", overflow: "hidden" }}
                >
                  <motion.span
                    className="text-reveal-inner"
                    style={{ display: "block" }}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                  >
                    Chandan Raj
                  </motion.span>
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.h2
              variants={fadeUp}
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "1.1rem",
                fontWeight: 400,
                marginBottom: "1.25rem",
                lineHeight: 1.6,
              }}
            >
              Cloud Engineer &amp;{" "}
              <span style={{ color: "#F97316", fontWeight: 600 }}>
                DevOps Enthusiast.
              </span>
            </motion.h2>

            {/* One-liner */}
            <motion.p
              variants={fadeUp}
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "0.97rem",
                lineHeight: 1.78,
                marginBottom: "1.75rem",
                maxWidth: "40ch",
              }}
            >
              Building and automating cloud infrastructure on AWS and Docker.
              Focused on DevOps, CI/CD pipelines, and making deployments
              faster, reliable, and hands-free.
            </motion.p>

            {/* Location */}
            <motion.p
              variants={fadeUp}
              style={{
                color: "rgba(255,255,255,0.25)",
                fontSize: "0.78rem",
                letterSpacing: "0.06em",
                marginBottom: "2.25rem",
                fontFamily: "monospace",
              }}
            >
              📍 Based in India
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {/* View Projects */}
              <a
                href="#projects"
                style={{
                  background: "#FFFFFF",
                  color: "#00000F",
                  border: "1.5px solid #FFFFFF",
                  padding: "0.72rem 1.6rem",
                  borderRadius: "0.75rem",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                View Projects
              </a>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "transparent",
                  color: "rgba(255,255,255,0.8)",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  padding: "0.72rem 1.6rem",
                  borderRadius: "0.75rem",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                }}
              >
                <svg style={{ width: "1rem", height: "1rem" }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>

              {/* Resume */}
              <a
                href={resumeUrl}
                download
                style={{
                  background: "transparent",
                  color: "rgba(255,255,255,0.55)",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  padding: "0.72rem 1.4rem",
                  borderRadius: "0.75rem",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                }}
              >
                <svg style={{ width: "0.9rem", height: "0.9rem" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Resume
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: "rgba(255,255,255,0.22)" }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
