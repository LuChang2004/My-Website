import { useEffect, useRef } from 'react';

interface BloodDrop {
  x: number;
  y: number;
  radius: number;
  targetRadius: number;
  opacity: number;
  expanding: boolean;
  birthTime: number;
  trailDrops: { angle: number; dist: number; size: number }[];
  seed: number;
}

export default function BloodCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999, prevX: -999, prevY: -999, idleSince: 0, isIdle: false });
  const dropsRef = useRef<BloodDrop[]>([]);
  const animRef = useRef<number>(0);
  const screenSizeRef = useRef(1000);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      screenSizeRef.current = Math.sqrt(canvas.width ** 2 + canvas.height ** 2);
    }
    resize();
    window.addEventListener('resize', resize);

    // Seedable random for consistent shape
    function seededRandom(seed: number) {
      const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
      return x - Math.floor(x);
    }

    // Generate irregular blood shape points
    function generateTrailDrops(seed: number): { angle: number; dist: number; size: number }[] {
      const drops: { angle: number; dist: number; size: number }[] = [];
      const count = 12 + Math.floor(seededRandom(seed) * 16);
      for (let i = 0; i < count; i++) {
        const s = seed * 100 + i * 37;
        drops.push({
          angle: (i / count) * Math.PI * 2 + (seededRandom(s) - 0.5) * 0.5,
          dist: 0.4 + seededRandom(s + 1) * 0.5,
          size: 0.15 + seededRandom(s + 2) * 0.25,
        });
      }
      return drops;
    }

    function onMove(e: MouseEvent) {
      const m = mouseRef.current;
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = e.clientX;
      m.y = e.clientY;

      if (!m.isIdle) {
        // Moving: add tiny trail dots
        const dx = m.x - m.prevX;
        const dy = m.y - m.prevY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 3) {
          const seed = Math.random() * 10000;
          dropsRef.current.push({
            x: m.x + (Math.random() - 0.5) * 4,
            y: m.y + (Math.random() - 0.5) * 4,
            radius: 1.5 + Math.random() * 3,
            targetRadius: 2 + Math.random() * 4,
            opacity: 0.3 + Math.random() * 0.3,
            expanding: false,
            birthTime: performance.now(),
            trailDrops: generateTrailDrops(seed),
            seed,
          });
        }
      } else {
        // Just started moving again
        m.isIdle = false;
      }
      m.idleSince = performance.now();
    }
    window.addEventListener('mousemove', onMove);

    // Animation
    let lastTime = performance.now();

    function animate() {
      if (!ctx || !canvas) return;
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05); // seconds, clamped
      lastTime = now;

      const m = mouseRef.current;
      const idleTime = (now - m.idleSince) / 1000; // seconds

      // Check idle state
      m.isIdle = idleTime > 0.15;

      // Update/create main cursor drop
      let mainDrop = dropsRef.current.find(d => d.expanding);

      if (m.isIdle && m.x > 0) {
        if (!mainDrop) {
          // Create new main drop when stopping
          const seed = Math.random() * 10000;
          mainDrop = {
            x: m.x,
            y: m.y,
            radius: 3,
            targetRadius: 200,
            opacity: 0.9,
            expanding: true,
            birthTime: now,
            trailDrops: generateTrailDrops(seed),
            seed,
          };
          dropsRef.current.push(mainDrop);
        }

        // ACCELERATING EXPANSION
        // r = a * t^2  where t is how long we've been idle
        // This gives accelerating growth
        const t = idleTime; // seconds idle
        const acceleration = 15; // quadratic growth factor
        const newRadius = 3 + acceleration * t * t;

        // Max radius: up to 1.5x screen diagonal (can cover entire screen)
        const maxR = screenSizeRef.current * 0.75;
        mainDrop.radius = Math.min(newRadius, maxR);
        mainDrop.targetRadius = maxR;

        // Follow mouse smoothly
        mainDrop.x += (m.x - mainDrop.x) * 0.2;
        mainDrop.y += (m.y - mainDrop.y) * 0.2;

        // Opacity stays high while idle
        mainDrop.opacity = Math.min(0.9, mainDrop.opacity + dt * 0.5);
      } else {
        // Moving: all drops fade
        if (mainDrop) {
          mainDrop.expanding = false;
        }
      }

      // Update all drops
      dropsRef.current = dropsRef.current.filter(drop => {
        if (drop.expanding) return true; // Main expanding drop stays

        // Fade out non-expanding drops when moving — FAST fade
        drop.opacity -= dt * 0.5;
        return drop.opacity > 0.001;
      });

      // Limit total drops for performance
      if (dropsRef.current.length > 80) {
        dropsRef.current = dropsRef.current
          .sort((a, b) => (a.expanding ? 1 : 0) - (b.expanding ? 1 : 0) || b.radius - a.radius)
          .slice(0, 80);
      }

      // ---- DRAW ----
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Use multiply-style blending for blood
      ctx.globalCompositeOperation = 'source-over';

      // Draw all drops: large ones first, then details
      const sorted = [...dropsRef.current].sort((a, b) => b.radius - a.radius);

      for (const drop of sorted) {
        if (drop.opacity <= 0.001) continue;

        ctx.save();

        // Main body of the blood drop
        ctx.translate(drop.x, drop.y);

        // Create organic irregular shape
        ctx.beginPath();
        const points = 32;
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const baseR = drop.radius;

          // Add organic variation
          const s1 = Math.sin(angle * 3 + drop.seed) * 0.03;
          const s2 = Math.sin(angle * 5 + drop.seed * 2) * 0.02;
          const s3 = Math.sin(angle * 7 + drop.seed * 3) * 0.015;
          const variation = 1 + s1 + s2 + s3;

          const r = baseR * variation;
          const px = Math.cos(angle) * r;
          const py = Math.sin(angle) * r;

          if (i === 0) ctx.moveTo(px, py);
          else {
            // Smooth curve
            const prevAngle = ((i - 1) / points) * Math.PI * 2;
            const prevR = baseR * (1 + Math.sin(prevAngle * 3 + drop.seed) * 0.03 + Math.sin(prevAngle * 5 + drop.seed * 2) * 0.02 + Math.sin(prevAngle * 7 + drop.seed * 3) * 0.015);
            const cpx = Math.cos((angle + prevAngle) / 2) * (r + prevR) / 2;
            const cpy = Math.sin((angle + prevAngle) / 2) * (r + prevR) / 2;
            ctx.quadraticCurveTo(cpx, cpy, px, py);
          }
        }
        ctx.closePath();

        // Fill with radial gradient
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, drop.radius);
        const coreOpacity = drop.opacity;
        const edgeFade = Math.max(0.02, 3 / (drop.radius * 0.1 + 1));

        grad.addColorStop(0, `rgba(200, 16, 46, ${coreOpacity})`);
        grad.addColorStop(0.2, `rgba(200, 16, 46, ${coreOpacity * 0.9})`);
        grad.addColorStop(0.5, `rgba(200, 16, 46, ${coreOpacity * 0.5})`);
        grad.addColorStop(0.8, `rgba(200, 16, 46, ${coreOpacity * edgeFade})`);
        grad.addColorStop(1, `rgba(200, 16, 46, 0)`);

        ctx.fillStyle = grad;
        ctx.fill();

        // Darker center (blood pool depth)
        if (drop.radius > 8) {
          const centerR = drop.radius * 0.12;
          const cgrad = ctx.createRadialGradient(0, 0, 0, 0, 0, centerR);
          cgrad.addColorStop(0, `rgba(140, 8, 25, ${coreOpacity * 0.6})`);
          cgrad.addColorStop(1, 'rgba(140, 8, 25, 0)');
          ctx.beginPath();
          ctx.arc(0, 0, centerR, 0, Math.PI * 2);
          ctx.fillStyle = cgrad;
          ctx.fill();
        }

        // Small trail drops around the edge for realism
        if (drop.radius > 10) {
          for (const td of drop.trailDrops) {
            const tx = Math.cos(td.angle) * drop.radius * td.dist;
            const ty = Math.sin(td.angle) * drop.radius * td.dist;
            const ts = drop.radius * td.size;

            ctx.beginPath();
            ctx.arc(tx, ty, ts, 0, Math.PI * 2);
            const tgrad = ctx.createRadialGradient(tx, ty, 0, tx, ty, ts);
            tgrad.addColorStop(0, `rgba(200, 16, 46, ${coreOpacity * 0.4})`);
            tgrad.addColorStop(1, `rgba(200, 16, 46, 0)`);
            ctx.fillStyle = tgrad;
            ctx.fill();
          }
        }

        // Highlight on top-left (wet blood reflection)
        if (drop.radius > 5) {
          const hx = -drop.radius * 0.25;
          const hy = -drop.radius * 0.25;
          const hr = drop.radius * 0.08;
          const hgrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, hr);
          hgrad.addColorStop(0, `rgba(255, 80, 80, ${coreOpacity * 0.15})`);
          hgrad.addColorStop(1, 'rgba(255, 80, 80, 0)');
          ctx.beginPath();
          ctx.arc(hx, hy, hr, 0, Math.PI * 2);
          ctx.fillStyle = hgrad;
          ctx.fill();
        }

        ctx.restore();
      }

      // Reset composite
      ctx.globalCompositeOperation = 'source-over';

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
      }}
    />
  );
}
