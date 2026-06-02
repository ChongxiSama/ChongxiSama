"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';

const MAX_SIZE = 20 * 1024 * 1024;
const MAX_DIM = 2048;

interface Params {
  color: number; shift: number; glow: number; noise: number;
  bright: number; contrast: number; saturate: number;
}

const DEFAULTS: Params = { color: 30, shift: 4, glow: 20, noise: 12, bright: 100, contrast: 100, saturate: 100 };

export default function JieYuanFilter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [params, setParams] = useState<Params>(DEFAULTS);
  const [loadKey, setLoadKey] = useState(0);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const applyEffect = useCallback((p: Params) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) { setError('Canvas or image not ready'); return; }
    const ctx = canvas.getContext('2d');
    if (!ctx) { setError('Canvas context not available'); return; }

    let w = img.naturalWidth;
    let h = img.naturalHeight;
    if (!w || !h || w < 1 || h < 1) {
      w = img.width;
      h = img.height;
    }
    if (!w || !h || w < 1 || h < 1) { setError(`Invalid image dimensions: ${w}x${h}`); return; }

    const s = Math.min(MAX_DIM / w, MAX_DIM / h, 1);
    const dw = Math.floor(w * s);
    const dh = Math.floor(h * s);
    canvas.width = dw;
    canvas.height = dh;

    ctx.drawImage(img, 0, 0, dw, dh);

    const ca = p.color / 100;
    if (ca > 0) {
      ctx.globalCompositeOperation = 'color';
      ctx.fillStyle = `rgba(255, 80, 150, ${ca * 0.7})`;
      ctx.fillRect(0, 0, dw, dh);
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = `rgba(255, 120, 180, ${ca * 0.4})`;
      ctx.fillRect(0, 0, dw, dh);
      ctx.globalCompositeOperation = 'soft-light';
      ctx.fillStyle = `rgba(0, 255, 200, ${ca * 0.5})`;
      ctx.fillRect(0, 0, dw, dh);
      ctx.globalCompositeOperation = 'source-over';
    }

    if (p.shift > 0) {
      try {
        const sd = ctx.getImageData(0, 0, dw, dh);
        const dd = ctx.createImageData(dw, dh);
        const off = Math.floor((dw / 1500) * p.shift) || 1;
        for (let y = 0; y < dh; y++) {
          for (let x = 0; x < dw; x++) {
            const i = (y * dw + x) * 4;
            const ri = (y * dw + Math.max(0, x - off)) * 4;
            dd.data[i] = sd.data[ri];
            dd.data[i + 1] = sd.data[i + 1];
            dd.data[i + 2] = sd.data[i + 2];
            dd.data[i + 3] = sd.data[i + 3];
          }
        }
        ctx.putImageData(dd, 0, 0);
      } catch (e) { setError(`RGB shift failed: ${e}`); }
    }

    if (p.glow > 0) {
      try {
        const ga = p.glow / 100;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.filter = `blur(${Math.max(4, Math.floor(dw * 0.008))}px)`;
        ctx.globalAlpha = ga;
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
      } catch (e) { setError(`Glow failed: ${e}`); }
    }

    if (p.noise > 0) {
      try {
        const d = ctx.getImageData(0, 0, dw, dh);
        for (let i = 0; i < d.data.length; i += 4) {
          const n = (Math.random() - 0.5) * (p.noise * 2);
          d.data[i] += n;
          d.data[i + 1] += n;
          d.data[i + 2] += n;
        }
        ctx.putImageData(d, 0, 0);
      } catch (e) { setError(`Noise failed: ${e}`); }
    }

    try {
      ctx.save();
      ctx.filter = `brightness(${p.bright / 100}) contrast(${p.contrast / 100}) saturate(${p.saturate / 100})`;
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
    } catch (e) { setError(`Filter failed: ${e}`); }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    for (let y = 0; y < dh; y += 4) ctx.fillRect(0, y, dw, 1);

    setInfo(`Canvas ${dw}×${dh}`);
  }, []);

  useEffect(() => {
    if (loadKey > 0) {
      const id = setTimeout(() => applyEffect(params), 200);
      return () => clearTimeout(id);
    }
  }, [loadKey, params, applyEffect]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    setInfo(`File: ${file.name} (${(file.size / 1024).toFixed(0)} KB)`);

    if (file.size > MAX_SIZE) { setError('超过 20 MiB 限制'); return; }

    const reader = new FileReader();
    reader.onerror = () => setError('FileReader 读取失败');
    reader.onload = (ev) => {
      const img = new Image();
      img.onerror = () => setError(`Image 加载失败: ${file.name}`);
      img.onload = () => {
        setInfo(`Loaded: ${img.naturalWidth}×${img.naturalHeight}`);
        img.decode().then(() => {
          setInfo(`Decoded: ${img.naturalWidth}×${img.naturalHeight}`);
          imageRef.current = img;
          setLoadKey((k) => k + 1);
        }).catch((e) => setError(`decode() 失败: ${e.message}`));
      };
      img.src = ev.target!.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const c = canvasRef.current;
    if (!c) return;
    c.toBlob((b) => {
      if (!b) { setError('toBlob 返回 null'); return; }
      const a = document.createElement('a');
      a.download = `JieGarden_${Date.now()}.png`;
      a.href = URL.createObjectURL(b);
      a.click();
    });
  };

  const handleReset = () => setParams(DEFAULTS);

  const handleView = () => {
    const c = canvasRef.current;
    if (!c) return;
    c.toBlob((b) => {
      if (!b) return;
      window.open(URL.createObjectURL(b), '_blank');
    });
  };

  const u = (k: keyof Params, v: number) => setParams((p) => ({ ...p, [k]: v }));
  const cr = () => { if (loadKey > 0) applyEffect(params); };

  const controls = [
    { k: 'color' as const, l: '染色浓度', min: 0, max: 100, u: '%' },
    { k: 'shift' as const, l: '色散', min: 0, max: 20, u: '' },
    { k: 'glow' as const, l: '辉光', min: 0, max: 100, u: '%' },
    { k: 'noise' as const, l: '噪点', min: 0, max: 60, u: '' },
    { k: 'bright' as const, l: '亮度', min: 0, max: 200, u: '%' },
    { k: 'contrast' as const, l: '对比度', min: 0, max: 200, u: '%' },
    { k: 'saturate' as const, l: '饱和度', min: 0, max: 200, u: '%' },
  ];

  return (
    <>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-[3px] h-[10px] bg-lt-accent"></div>
        <span className="text-[11px] font-mono tracking-[0.2em] font-semibold text-lt-ink uppercase">
          Workshop // Generator
        </span>
        <div className="flex-1 h-[1px] bg-lt-border"></div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="jieyuan-upload" />
        <label htmlFor="jieyuan-upload" className="group relative border border-lt-border bg-lt-bg px-8 py-3 text-[11px] font-mono font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:bg-lt-ink hover:text-lt-bg cursor-pointer inline-block">
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-lt-ink"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-lt-ink"></div>
          {loadKey > 0 ? '重新选择图片' : '选择图片'}
        </label>

        {error && <p className="font-mono text-[11px] text-rl-red font-bold whitespace-pre-wrap">{error}</p>}
        {info && !error && <p className="font-mono text-[9px] text-lt-accent">{info}</p>}

        <div className="w-full space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 p-4 border border-lt-border bg-lt-surface/30">
            {controls.map(({ k, l, min, max }) => (
              <div key={k} className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[9px] text-lt-muted font-bold uppercase tracking-widest">{l}</span>
                  <span className="font-mono text-[9px] text-lt-accent font-black tabular-nums">
                    {k === 'shift' ? String(params[k]) : `${params[k]}%`}
                  </span>
                </div>
                <input type="range" min={min} max={max} value={params[k]}
                  onChange={(e) => u(k, parseInt(e.target.value))}
                  onPointerUp={cr}
                  className="w-full accent-lt-accent cursor-pointer h-1 appearance-none bg-lt-border [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:bg-lt-accent touch-none"
                />
              </div>
            ))}
          </div>

          <div className="relative border border-lt-border p-1 bg-lt-surface/20 min-h-[200px] flex items-center justify-center">
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-lt-ink"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-lt-ink"></div>
            {loadKey > 0 ? (
              <canvas ref={canvasRef} onClick={handleView} className="w-full h-auto cursor-pointer block" />
            ) : (
              <div className="flex flex-col items-center gap-3 py-12">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-lt-ghost">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span className="font-mono text-[10px] text-lt-ghost uppercase tracking-widest">No Image Selected</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <button onClick={handleDownload} className="group relative border border-lt-border bg-lt-bg px-6 py-2.5 text-[11px] font-mono font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:bg-lt-ink hover:text-lt-bg">
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-lt-ink"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-lt-ink"></div>
              下载
            </button>
            <button onClick={handleReset} className="group relative border border-lt-border bg-lt-bg px-6 py-2.5 text-[11px] font-mono font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:bg-lt-ink hover:text-lt-bg">
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-lt-ink"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-lt-ink"></div>
              重置
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
