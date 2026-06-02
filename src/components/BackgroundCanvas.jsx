import React, { useEffect, useRef } from 'react';

export default function BackgroundCanvas({ isDashboard }) {
  const bgRef = useRef(null);
  const grainRef = useRef(null);

  useEffect(() => {
    const bg = bgRef.current;
    const grain = grainRef.current;
    if (!bg || !grain) return;

    const W = 1400, H = 820;
    bg.width = W; bg.height = H;
    const ctx = bg.getContext('2d');

    // ── 1. BASE GRADIENT: very dark top → deep navy → medium blue → light periwinkle/white bottom ──
    const base = ctx.createLinearGradient(0, 0, 0, H);
    base.addColorStop(0,    '#02030a');
    base.addColorStop(0.12, '#050818');
    base.addColorStop(0.35, '#090f3a');
    base.addColorStop(0.55, '#112890');
    base.addColorStop(0.72, '#2a4cc0');
    base.addColorStop(0.85, '#5878d8');
    base.addColorStop(0.93, '#96aae0');
    base.addColorStop(1,    '#dde4f4');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, W, H);

    // ── 2. LARGE WHITE BLOOM — bottom-right, very prominent ──
    ctx.save();
    ctx.filter = 'blur(80px)';
    const wb = ctx.createRadialGradient(W * 0.92, H * 0.98, 0, W * 0.82, H * 0.92, H * 0.75);
    wb.addColorStop(0,    'rgba(255,255,255,0.95)');
    wb.addColorStop(0.15, 'rgba(240,244,255,0.8)');
    wb.addColorStop(0.35, 'rgba(200,215,250,0.55)');
    wb.addColorStop(0.55, 'rgba(160,185,235,0.25)');
    wb.addColorStop(0.8,  'rgba(80,110,200,0.05)');
    wb.addColorStop(1,    'rgba(10,20,80,0)');
    ctx.fillStyle = wb;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // ── 3. THE WAVE/CRESCENT BLOB ──
    function blurredBezier(pts, lineWidth, r, g, b, alpha, blurAmt) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.filter = `blur(${blurAmt}px)`;
      ctx.strokeStyle = `rgb(${r},${g},${b})`;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(pts[0], pts[1]);
      ctx.bezierCurveTo(pts[2], pts[3], pts[4], pts[5], pts[6], pts[7]);
      ctx.stroke();
      ctx.restore();
    }

    const wavePts = [
      -60, H + 60,          // start: off-screen bottom-left
      W * 0.15, H * 0.75,   // cp1: lower-left area pulling upward
      W * 0.55, H * 0.25,   // cp2: upper-center pulling it up and right
      W + 80,  H * 0.42     // end: off-screen right, mid-height
    ];

    // Outermost wide soft atmosphere
    blurredBezier(wavePts, 700, 30, 65, 190,  0.32, 130);
    // Wide glow layer
    blurredBezier(wavePts, 480, 45, 90, 220,  0.45, 100);
    // Mid glow
    blurredBezier(wavePts, 300, 60, 110, 245, 0.55, 75);
    // Inner brighter core
    blurredBezier(wavePts, 160, 85, 135, 255, 0.5,  50);
    // Bright inner edge highlight
    blurredBezier(wavePts, 70,  130, 165, 255, 0.35, 30);

    // ── 4. TOP-LEFT DARK VIGNETTE ──
    ctx.save();
    ctx.filter = 'none';
    const tl = ctx.createRadialGradient(0, 0, 0, 0, 0, 750);
    tl.addColorStop(0,    'rgba(1,2,7,0.96)');
    tl.addColorStop(0.35, 'rgba(1,2,7,0.55)');
    tl.addColorStop(0.65, 'rgba(1,2,7,0.1)');
    tl.addColorStop(1,    'rgba(1,2,7,0)');
    ctx.fillStyle = tl;
    ctx.fillRect(0, 0, W, H);

    // Top-right dark corner
    const tr = ctx.createRadialGradient(W, 0, 0, W, 0, 480);
    tr.addColorStop(0,   'rgba(1,2,7,0.88)');
    tr.addColorStop(0.5, 'rgba(1,2,7,0.3)');
    tr.addColorStop(1,   'rgba(1,2,7,0)');
    ctx.fillStyle = tr;
    ctx.fillRect(0, 0, W, H);

    // Top strip darkener
    const ts = ctx.createLinearGradient(0, 0, 0, 160);
    ts.addColorStop(0, 'rgba(1,2,7,0.75)');
    ts.addColorStop(1, 'rgba(1,2,7,0)');
    ctx.fillStyle = ts;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // ── 5. GRID WITH SOME FILLED SQUARES ──
    const gs = 58; // grid cell size
    const filledCells = new Set([
      '0,1','0,2','0,3','0,4',
      '1,2','1,3','1,4','1,5',
      '2,3','2,4','2,5',
      '3,4','3,5',
      '4,5','4,6',
      '0,5','1,6','2,6',
      '0,6'
    ]);

    ctx.save();

    // Draw filled cells first
    for (const key of filledCells) {
      const [ci, ri] = key.split(',').map(Number);
      const x = ci * gs;
      const y = ri * gs;
      const distFade = Math.max(0, 1 - ci / 6);
      const heightFade = Math.max(0, 1 - ri / 10);
      const alpha = distFade * heightFade * 0.13;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgba(100,140,255,1)';
      ctx.fillRect(x + 0.5, y + 0.5, gs - 1, gs - 1);
    }

    // Draw grid lines — only left portion fading right
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= 700; x += gs) {
      const fade = Math.pow(Math.max(0, 1 - x / 520), 1.6) * 0.4;
      ctx.globalAlpha = fade;
      ctx.strokeStyle = 'rgba(110,145,240,1)';
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H * 0.78);
      ctx.stroke();
    }
    for (let y = 0; y <= H * 0.78; y += gs) {
      const xEnd = Math.max(0, 500 - (y / (H * 0.78)) * 200);
      const fade = Math.pow(Math.max(0, 1 - y / (H * 0.55)), 0.8) * 0.28;
      ctx.globalAlpha = fade;
      ctx.strokeStyle = 'rgba(110,145,240,1)';
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(xEnd, y);
      ctx.stroke();
    }
    ctx.restore();

    // ── 6. FILM GRAIN ──
    grain.width = W; grain.height = H;
    const gctx = grain.getContext('2d');
    const imgData = gctx.createImageData(W, H);
    const d = imgData.data;
    let s = 9301;
    for (let i = 0; i < d.length; i += 4) {
      s = (Math.imul(s, 1664525) + 1013904223) | 0;
      const v = (s >>> 24);
      d[i] = v; d[i+1] = v; d[i+2] = v;
      d[i+3] = 22;
    }
    gctx.putImageData(imgData, 0, 0);
  }, []);

  return (
    <div className={`mesh-background ${isDashboard ? 'dashboard-mode' : ''}`}>
      <canvas ref={bgRef} id="bg-canvas"></canvas>
      <canvas ref={grainRef} id="grain-canvas"></canvas>
    </div>
  );
}
