"use client";
import { useEffect, useRef } from "react";

const CursorTrail = () => {
  const canvasRef = useRef(null);
  const coords = { x: 0, y: 0 };
  let particles = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1;
      particles.push({
        x: coords.x,
        y: coords.y,
        alpha: 1,
        radius: Math.random() * 2 + 1, // smaller size
        color: `hsla(${Math.random() * 360}, 100%, 75%, 0.8)`, // softer pastel look
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.alpha -= 0.008; // slower fade
        p.x += p.vx;
        p.y += p.vy;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }

        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.radius * 3 // larger blur radius
        );
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2); // double for softer glow
        ctx.fillStyle = gradient;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      requestAnimationFrame(draw);
    };

    const move = (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
      for (let i = 0; i < 2; i++) createParticle(); // fewer particles
    };

    window.addEventListener("mousemove", move);
    draw();

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] mix-blend-screen"
    />
  );
};

export default CursorTrail;
