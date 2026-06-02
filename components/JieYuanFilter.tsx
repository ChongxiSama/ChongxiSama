"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
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

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

export default function JieYuanFilter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [params, setParams] = useState<Params>(DEFAULTS);
  const [loadKey, setLoadKey] = useState(0);
  const [error, setError] = useState('');

  const applyEffect = useCallback((p: Params) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let { naturalWidth: w, naturalHeight: h } = img;
    const scale = Math.min(MAX_DIM / w, MAX_DIM / h, 1);
    w = Math.floor(w * scale);
    h = Math.floor(h * scale);

    if (w === 0 || h === 0) return;

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
        const src = ctx.getImageData(0, 0, w, h);
        const out = ctx.createImageData(w, h);
        const offset = Math.floor((w / 1500) * p.shift) || 1;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const i = (y * w + x) * 4;
            const ri = (y * w + Math.max(0, x - offset)) * 4;
            out.data[i] = src.data[ri];
            out.data[i + 1] = src.data[i + 1];
            out.data[i + 2] = src.data[i + 2];
            out.data[i + 3] = src.data[i + 3];
          }
        }
        ctx.putImageData(out, 0, 0);
      } catch {}
    }

    const ga = p.glow / 100;
    if (ga > 0) {
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = `blur(${Math.max(4, Math.floor(w * 0.008))}px)`;
      ctx.globalAlpha = ga;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
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

    ctx.filter = `brightness(${p.bright / 100}) contrast(${p.contrast / 100}) saturate(${p.saturate / 100})`;
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';

    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    for (let y = 0; y < h; y += 4) {
      ctx.fillRect(0, y, w, 1);
    }
  }, []);

  useEffect(() => {
    if (loadKey > 0) {
      const id = setTimeout(() => { applyEffect(params); }, 200);
      return () => clearTimeout(id);
    }
  }, [loadKey, params, applyEffect]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('仅支持图片文件 (JPEG/PNG/WebP/GIF/AVIF)');
      return;
    }
    if (file.size > MAX_SIZE) {
      setError('文件大小超过 20 MiB 限制');
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      setLoadKey((k) => k + 1);
    };
    img.onerror = () => {
      setError('图片加载失败');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleDownload = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const blob = await canvasToBlob(canvas);
      if (!blob) { setError('导出失败，图片过大'); return; }
      const link = document.createElement('a');
      link.download = `JieGarden_${Date.now()}.png`;
      link.href = URL.createObjectURL(blob);
      link.click();
    } catch { setError('导出失败'); }
  };

  const handleReset = () => { setParams(DEFAULTS); };

  const handleView = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const blob = await canvasToBlob(canvas);
      if (!blob) return;
      window.open(URL.createObjectURL(blob), '_blank');
    } catch {}
  };

  const updateParam = (key: keyof Params, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const commitRender = () => {
    if (loadKey > 0) applyEffect(params);
  };

  const formatLabel = (key: keyof Params) => {
    const v = params[key];
    return key === 'shift' ? String(v) : `${v}%`;
  };

  const controls = [
    { key: 'color' as const, label: '染色浓度', min: 0, max: 100 },
    { key: 'shift' as const, label: '色散', min: 0, max: 20 },
    { key: 'glow' as const, label: '辉光', min: 0, max: 100 },
    { key: 'noise' as const, label: '噪点', min: 0, max: 60 },
    { key: 'bright' as const, label: '亮度', min: 0, max: 200 },
    { key: 'contrast' as const, label: '对比度', min: 0, max: 200 },
    { key: 'saturate' as const, label: '饱和度', min: 0, max: 200 },
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
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          onClick={(e) => { e.currentTarget.value = ''; }}
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
                  <span className="font-mono text-[9px] text-lt-muted font-bold uppercase tracking-widest">
                    {label}
                  </span>
                  <span className="font-mono text-[9px] text-lt-accent font-black tabular-nums">
                    {formatLabel(key)}
                  </span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  value={params[key]}
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    updateParam(key, v);
                  }}
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
              <canvas
                ref={canvasRef}
                onClick={handleView}
                className="w-full h-auto cursor-pointer block"
              />
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
            <button
              onClick={handleDownload}
              className="group relative border border-lt-border bg-lt-bg px-6 py-2.5 text-[11px] font-mono font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:bg-lt-ink hover:text-lt-bg"
            >
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-lt-ink"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-lt-ink"></div>
              下载
            </button>
            <button
              onClick={handleReset}
              className="group relative border border-lt-border bg-lt-bg px-6 py-2.5 text-[11px] font-mono font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:bg-lt-ink hover:text-lt-bg"
            >
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
