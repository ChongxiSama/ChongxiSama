"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 20 * 1024 * 1024;
const MAX_DIM = 2048;

interface Params {
  color: number;
  shift: number;
  glow: number;
  noise: number;
  bright: number;
  contrast: number;
  saturate: number;
}

const DEFAULTS: Params = { color: 30, shift: 4, glow: 20, noise: 12, bright: 100, contrast: 100, saturate: 100 };

export default function JieYuanFilter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [params, setParams] = useState<Params>(DEFAULTS);
  const [loadKey, setLoadKey] = useState(0);
  const [error, setError] = useState('');

  const applyEffect = useCallback((p: Params) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = img.naturalWidth;
    let h = img.naturalHeight;
    if (w === 0 || h === 0) return;
    const s = Math.min(MAX_DIM / w, MAX_DIM / h, 1);
    w = Math.floor(w * s);
    h = Math.floor(h * s);
    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(img, 0, 0, w, h);

    const ca = p.color / 100;
    if (ca > 0) {
      ctx.globalCompositeOperation = 'color';
      ctx.fillStyle = `rgba(255, 80, 150, ${ca * 0.7})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = `rgba(255, 120, 180, ${ca * 0.4})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'soft-light';
      ctx.fillStyle = `rgba(0, 255, 200, ${ca * 0.5})`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';
    }

    if (p.shift > 0) {
      try {
        const sd = ctx.getImageData(0, 0, w, h);
        const dd = ctx.createImageData(w, h);
        const off = Math.floor((w / 1500) * p.shift) || 1;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const ri = (y * w + Math.max(0, x - off)) * 4;
            dd.data[i] = sd.data[ri];
            dd.data[i + 1] = sd.data[i + 1];
            dd.data[i + 2] = sd.data[i + 2];
            dd.data[i + 3] = sd.data[i + 3];
          }
        }
        ctx.putImageData(dd, 0, 0);
      } catch {}
    }

    if (p.glow > 0) {
      try {
        const ga = p.glow / 100;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.filter = `blur(${Math.max(4, Math.floor(w * 0.008))}px)`;
        ctx.globalAlpha = ga;
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
      } catch {}
    }

    if (p.noise > 0) {
      try {
        const d = ctx.getImageData(0, 0, w, h);
        for (let i = 0; i < d.data.length; i += 4) {
          const n = (Math.random() - 0.5) * (p.noise * 2);
          d.data[i] += n;
          d.data[i + 1] += n;
          d.data[i + 2] += n;
        }
        ctx.putImageData(d, 0, 0);
      } catch {}
    }

    try {
      ctx.save();
      ctx.filter = `brightness(${p.bright / 100}) contrast(${p.contrast / 100}) saturate(${p.saturate / 100})`;
      ctx.drawImage(canvas, 0, 0);
      ctx.restore();
    } catch {}

    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    for (let y = 0; y < h; y += 4) {
      ctx.fillRect(0, y, w, 1);
    }
  }, []);

  useEffect(() => {
    if (loadKey > 0) {
      const id = setTimeout(() => applyEffect(params), 200);
      return () => clearTimeout(id);
    }
  }, [loadKey, params, applyEffect]);

  const urlRef = useRef<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('仅支持 JPEG/PNG/WebP 格式');
      return;
    }
    if (file.size > MAX_SIZE) {
      setError('文件大小超过 20 MiB');
      return;
    }

    if (urlRef.current) { URL.revokeObjectURL(urlRef.current); }

    const url = URL.createObjectURL(file);
    urlRef.current = url;
    const img = new Image();
    img.onerror = () => { setError('图片解析失败，文件可能已损坏'); };
    img.onload = () => {
      img.decode().then(() => {
        imageRef.current = img;
        setLoadKey((k) => k + 1);
      }).catch(() => {
        setError('图片解码失败，尝试转换格式');
        URL.revokeObjectURL(url);
      });
    };
    img.src = url;
  };

  const handleDownload = () => {
    const c = canvasRef.current;
    if (!c) return;
    c.toBlob((b) => {
      if (!b) { setError('导出失败'); return; }
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

  const updateParam = (k: keyof Params, v: number) => setParams((p) => ({ ...p, [k]: v }));
  const commitRender = () => { if (loadKey > 0) applyEffect(params); };

  const controls = [
    { key: 'color' as const, label: '染色浓度', min: 0, max: 100, unit: '%' },
    { key: 'shift' as const, label: '色散', min: 0, max: 20, unit: '' },
    { key: 'glow' as const, label: '辉光', min: 0, max: 100, unit: '%' },
    { key: 'noise' as const, label: '噪点', min: 0, max: 60, unit: '' },
    { key: 'bright' as const, label: '亮度', min: 0, max: 200, unit: '%' },
    { key: 'contrast' as const, label: '对比度', min: 0, max: 200, unit: '%' },
    { key: 'saturate' as const, label: '饱和度', min: 0, max: 200, unit: '%' },
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
        <input
          key={loadKey}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleUpload}
          className="hidden"
          id="jieyuan-upload"
        />
        <label
          htmlFor="jieyuan-upload"
          className="group relative border border-lt-border bg-lt-bg px-8 py-3 text-[11px] font-mono font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:bg-lt-ink hover:text-lt-bg cursor-pointer inline-block"
        >
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-lt-ink"></div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-lt-ink"></div>
          {loadKey > 0 ? '重新选择图片' : '选择图片'}
        </label>

        {error && (
          <p className="font-mono text-[11px] text-rl-red font-bold">{error}</p>
        )}

        <div className="w-full space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 p-4 border border-lt-border bg-lt-surface/30">
            {controls.map(({ key, label, min, max }) => (
              <div key={key} className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-[9px] text-lt-muted font-bold uppercase tracking-widest">{label}</span>
                  <span className="font-mono text-[9px] text-lt-accent font-black tabular-nums">
                    {key === 'shift' ? String(params[key]) : `${params[key]}%`}
                  </span>
                </div>
                <input
                  type="range" min={min} max={max}
                  value={params[key]}
                  onChange={(e) => updateParam(key, parseInt(e.target.value))}
                  onPointerUp={commitRender}
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
