"use client";

import { useEffect, useRef } from "react";

/** 与 `docs/source/主页面.html` 中 Canvas 背景 + 羽毛拖尾逻辑一致 */
export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;
    const canvasCtx = ctx;

    const cursorDot = document.getElementById("cursor-dot");
    const cursorRing = document.getElementById("cursor-ring");
    const orbs: Orb[] = [];
    const feathers: Feather[] = [];
    let lastFeatherTime = 0;
    let mouseX = 0;
    let mouseY = 0;
    let width = 0;
    let height = 0;
    let raf = 0;

    class Orb {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.r = Math.random() * 180 + 80;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        const colors = ["#4f46e5", "#8b5cf6", "#06b6d4", "#eab308", "#ec4899"];
        this.color = colors[Math.floor(Math.random() * colors.length)]!;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -this.r) this.x = width + this.r;
        if (this.x > width + this.r) this.x = -this.r;
        if (this.y < -this.r) this.y = height + this.r;
        if (this.y > height + this.r) this.y = -this.r;
      }
      draw() {
        canvasCtx.save();
        canvasCtx.globalAlpha = this.alpha;
        const grad = canvasCtx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grad.addColorStop(0, "rgba(255,255,255,0.9)");
        grad.addColorStop(0.3, this.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        canvasCtx.fillStyle = grad;
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        canvasCtx.fill();
        canvasCtx.restore();
      }
    }

    type Feather = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      angle: number;
      va: number;
    };

    function createFeather(x: number, y: number) {
      const now = performance.now();
      if (now - lastFeatherTime < 150) return;
      lastFeatherTime = now;
      if (feathers.length > 40) return;
      feathers.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: (Math.random() - 0.5) * 0.3,
        vy: 0.1 + Math.random() * 0.15,
        life: 0,
        maxLife: 100 + Math.floor(Math.random() * 50),
        size: 10 + Math.random() * 6,
        angle: (Math.random() - 0.5) * 0.5,
        va: (Math.random() - 0.5) * 0.01,
      });
    }

    function drawFeathers() {
      for (let i = feathers.length - 1; i >= 0; i--) {
        const f = feathers[i]!;
        f.life++;
        f.x += f.vx;
        f.y += f.vy;
        f.vy += 0.002;
        f.angle += f.va;
        const t = f.life / f.maxLife;
        if (t >= 1) {
          feathers.splice(i, 1);
          continue;
        }
        const alpha = (1 - t) * 0.7;
        const scale = 1 - t * 0.3;
        canvasCtx.save();
        canvasCtx.translate(f.x, f.y + t * 10);
        canvasCtx.rotate(f.angle);
        const w = f.size * 2.5 * scale;
        const h = f.size * 0.8 * scale;
        const grad = canvasCtx.createLinearGradient(-w / 2, 0, w / 2, 0);
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.1})`);
        grad.addColorStop(0.3, `rgba(255, 255, 255, ${alpha})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        canvasCtx.fillStyle = grad;
        canvasCtx.beginPath();
        canvasCtx.moveTo(-w / 2, 0);
        canvasCtx.quadraticCurveTo(0, -h, w / 2, 0);
        canvasCtx.quadraticCurveTo(0, h, -w / 2, 0);
        canvasCtx.closePath();
        canvasCtx.fill();
        canvasCtx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
        canvasCtx.lineWidth = 0.5;
        canvasCtx.beginPath();
        canvasCtx.moveTo(-w / 2 + 2, 0);
        canvasCtx.lineTo(w / 2 - 2, 0);
        canvasCtx.stroke();
        canvasCtx.restore();
      }
    }

    function resize() {
      const el = canvasRef.current;
      if (!el) return;
      width = el.width = window.innerWidth;
      height = el.height = window.innerHeight;
    }

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot && cursorRing) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        cursorRing.style.left = `${mouseX}px`;
        cursorRing.style.top = `${mouseY}px`;
      }
      createFeather(mouseX, mouseY);
    }

    function animate(timestamp: number) {
      const t = timestamp || 0;
      const shift = (t * 0.04) % (width * 2);
      const bgGrad = canvasCtx.createLinearGradient(-width + shift, 0, shift, height);
      bgGrad.addColorStop(0, "hsla(210, 80%, 16%, 1)");
      bgGrad.addColorStop(0.25, "hsla(260, 80%, 20%, 1)");
      bgGrad.addColorStop(0.5, "hsla(330, 80%, 22%, 1)");
      bgGrad.addColorStop(0.75, "hsla(40, 85%, 24%, 1)");
      bgGrad.addColorStop(1, "hsla(180, 80%, 18%, 1)");
      canvasCtx.fillStyle = bgGrad;
      canvasCtx.fillRect(0, 0, width, height);
      canvasCtx.fillStyle = "rgba(4, 7, 20, 0.45)";
      canvasCtx.fillRect(0, 0, width, height);
      canvasCtx.globalCompositeOperation = "screen";
      orbs.forEach((o) => {
        o.update();
        o.draw();
      });
      canvasCtx.globalCompositeOperation = "lighter";
      drawFeathers();
      canvasCtx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    for (let i = 0; i < 12; i++) orbs.push(new Orb());
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas id="bg-canvas" ref={canvasRef} className="bg-canvas" aria-hidden="true" />;
}
