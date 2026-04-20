"use client";

import { useEffect, useRef } from "react";

type Feather = { x: number; y: number; vx: number; vy: number; age: number; life: number; size: number; angle: number; va: number };
type Orb = { x: number; y: number; r: number; vx: number; vy: number; color: string; alpha: number };

const MAX_FEATHERS = 56;
const MIN_SPAWN_STEP = 12;
const MAX_SPAWN_INTERVAL = 90;

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;

    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");
    const orbs: Orb[] = [];
    const feathers: Feather[] = [];
    const orbColors = ["#4f46e5", "#8b5cf6", "#06b6d4", "#eab308", "#ec4899"];

    let width = 0, height = 0, raf = 0, lastTs = 0;
    let px = 0, py = 0, tx = 0, ty = 0, pvx = 0, pvy = 0, lastSpawn = 0;

    const spawnFeather = (x: number, y: number, speedX: number, speedY: number) => {
      if (feathers.length >= MAX_FEATHERS) feathers.shift();
      const speed = Math.hypot(speedX, speedY);
      const dirX = speed > 0.0001 ? speedX / speed : 0;
      const dirY = speed > 0.0001 ? speedY / speed : 1;
      feathers.push({
        x: x - dirX * 8 + (Math.random() - 0.5) * 6,
        y: y - dirY * 8 + (Math.random() - 0.5) * 6,
        vx: speedX * 0.12 + (Math.random() - 0.5) * 0.25,
        vy: speedY * 0.12 + 0.1 + Math.random() * 0.12,
        age: 0,
        life: 650 + Math.random() * 350,
        size: 8 + Math.random() * 7,
        angle: Math.atan2(speedY || 0.1, speedX || 0.1) + (Math.random() - 0.5) * 0.5,
        va: (Math.random() - 0.5) * 0.002,
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      width = window.innerWidth;
      height = window.innerHeight;
      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const onPointer = (e: PointerEvent) => {
      const events = e.getCoalescedEvents?.() ?? [e];
      const last = events[events.length - 1]!;
      tx = last.clientX;
      ty = last.clientY;
    };

    const drawFeathers = (dtMs: number) => {
      const dt = dtMs / 1000;
      for (let i = feathers.length - 1; i >= 0; i--) {
        const f = feathers[i]!;
        f.age += dtMs;
        if (f.age >= f.life) { feathers.splice(i, 1); continue; }
        f.vy += 0.45 * dt;
        f.vx *= 1 - Math.min(0.45 * dt, 0.12);
        f.vy *= 1 - Math.min(0.28 * dt, 0.08);
        f.x += f.vx * dtMs * 0.12;
        f.y += f.vy * dtMs * 0.12;
        f.angle += f.va * dtMs;
        const t = f.age / f.life;
        const alpha = (1 - t) * 0.72;
        const scale = 1 - t * 0.36;
        const w = f.size * 2.5 * scale;
        const h = f.size * 0.82 * scale;
        ctx.save();
        ctx.translate(f.x, f.y + t * 10);
        ctx.rotate(f.angle);
        const grad = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
        grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.1})`);
        grad.addColorStop(0.28, `rgba(255,255,255,${alpha})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-w / 2, 0);
        ctx.quadraticCurveTo(0, -h, w / 2, 0);
        ctx.quadraticCurveTo(0, h, -w / 2, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.33})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(-w / 2 + 2, 0);
        ctx.lineTo(w / 2 - 2, 0);
        ctx.stroke();
        ctx.restore();
      }
    };

    const animate = (timestamp: number) => {
      const dtMs = lastTs ? Math.min(34, timestamp - lastTs) : 16.7;
      lastTs = timestamp;
      const smooth = Math.min(dtMs / 16.7, 2);
      px += (tx - px) * Math.min(0.35 * smooth, 0.95);
      py += (ty - py) * Math.min(0.35 * smooth, 0.95);
      pvx = tx - px;
      pvy = ty - py;

      const dx = tx - px, dy = ty - py;
      const dist = Math.hypot(dx, dy);
      const now = performance.now();
      if (dist > MIN_SPAWN_STEP || now - lastSpawn > MAX_SPAWN_INTERVAL) {
        const steps = Math.max(1, Math.floor(dist / MIN_SPAWN_STEP));
        for (let i = 1; i <= steps; i++) {
          const r = i / steps;
          spawnFeather(px + dx * r, py + dy * r, pvx, pvy);
        }
        lastSpawn = now;
      }

      if (cursorDot && cursorRing) {
        cursorDot.style.left = `${px}px`; cursorDot.style.top = `${py}px`;
        cursorRing.style.left = `${px}px`; cursorRing.style.top = `${py}px`;
      }

      const shift = (timestamp * 0.04) % (width * 2);
      const bg = ctx.createLinearGradient(-width + shift, 0, shift, height);
      bg.addColorStop(0, "hsla(210, 80%, 16%, 1)");
      bg.addColorStop(0.25, "hsla(260, 80%, 20%, 1)");
      bg.addColorStop(0.5, "hsla(330, 80%, 22%, 1)");
      bg.addColorStop(0.75, "hsla(40, 85%, 24%, 1)");
      bg.addColorStop(1, "hsla(180, 80%, 18%, 1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "rgba(4, 7, 20, 0.45)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";
      for (const o of orbs) {
        o.x += o.vx; o.y += o.vy;
        if (o.x < -o.r) o.x = width + o.r;
        if (o.x > width + o.r) o.x = -o.r;
        if (o.y < -o.r) o.y = height + o.r;
        if (o.y > height + o.r) o.y = -o.r;
        const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
        g.addColorStop(0, "rgba(255,255,255,0.9)");
        g.addColorStop(0.3, o.color);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalAlpha = o.alpha;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "lighter";
      drawFeathers(dtMs);
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(animate);
    };

    resize();
    px = tx = width / 2;
    py = ty = height / 2;
    for (let i = 0; i < 12; i++) {
      orbs.push({
        x: Math.random() * width, y: Math.random() * height, r: Math.random() * 180 + 80,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, color: orbColors[Math.floor(Math.random() * orbColors.length)]!, alpha: Math.random() * 0.5 + 0.2,
      });
    }
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} className="bg-canvas" aria-hidden="true" />;
}
