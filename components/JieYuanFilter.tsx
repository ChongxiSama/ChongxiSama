"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
const MAX_SIZE = 20 * 1024 * 1024;

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [params, setParams] = useState<Params>(DEFAULTS);
  const [loadKey, setLoadKey] = useState(0);
  const [rendering, setRendering] = useState(false);
  const [error, setError] = useState('');

  const applyEffect = useCallback((p: Params) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;
    const w = canvas.width;
    const h = canvas.height;

    ctx.drawImage(img, 0, 0);

    const colorAlpha = p.color / 100;
    if (colorAlpha > 0) {
      ctx.globalCompositeOperation = 'color';
      ctx.fillStyle = `rgba(255, 80, 150, ${colorAlpha * 0.7})`;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = `rgba(255, 120, 180, ${colorAlpha * 0.4})`;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'soft-light';
      ctx.fillStyle = `rgba(0, 255, 200, ${colorAlpha * 0.5})`;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = 'source-over';

    if (p.shift > 0) {
      const imgData = ctx.getImageData(0, 0, w, h);
      const pixels = imgData.data;
      const outData = ctx.createImageData(w, h);
      const outPixels = outData.data;
      const offset = Math.floor((w / 1500) * p.shift) || 1;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          const rx = x - offset;
          const ri = (y * w + rx) * 4;
          outPixels[i] = (rx >= 0) ? pixels[ri] : pixels[i];
          outPixels[i + 1] = pixels[i + 1];
          outPixels[i + 2] = pixels[i + 2];
          outPixels[i + 3] = pixels[i + 3];
        }
      }
      ctx.putImageData(outData, 0, 0);
    }

    const glowAlpha = p.glow / 100;
    if (glowAlpha > 0) {
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = `blur(${Math.max(4, Math.floor(w * 0.008))}px)`;
      ctx.globalAlpha = glowAlpha;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';
    }

    if (p.noise > 0) {
      const finalData = ctx.getImageData(0, 0, w, h);
      const fPixels = finalData.data;
      for (let i = 0; i < fPixels.length; i += 4) {
        const noise = (Math.random() - 0.5) * (p.noise * 2);
        fPixels[i] += noise;
        fPixels[i + 1] += noise;
        fPixels[i + 2] += noise;
      }
      ctx.putImageData(finalData, 0, 0);
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
      setRendering(true);
      const id = requestAnimationFrame(() => {
        applyEffect(params);
        setRendering(false);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [loadKey, params, applyEffect]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('仅支持图片文件 (JPEG/PNG/WebP/GIF/AVIF)');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    if (file.size > MAX_SIZE) {
      setError('文件大小超过 20 MiB 限制');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        setLoadKey((k) => k + 1);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `JieGarden_${new Date().getTime()}.png`;
    link.href = canvas.toDataURL('image/png', 0.9);
    link.click();
  };

  const handleReset = () => {
    setParams(DEFAULTS);
  };

  const handleView = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    window.open(canvas.toDataURL('image/png'), '_blank');
  };

  const updateParam = (key: keyof Params, value: number) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const formatLabel = (key: keyof Params) => {
    const v = params[key];
    if (key === 'shift') return String(v);
    return `${v}%`;
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

        {rendering && (
          <p className="font-mono text-[11px] text-lt-accent animate-pulse font-bold tracking-widest uppercase">
            Rendering pixels...
          </p>
        )}

        {loadKey === 0 && !error && (
          <p className="font-cn text-[15px] text-lt-muted text-center leading-relaxed max-w-md">
            选择一张图片，应用界园风格滤镜效果
          </p>
        )}

        {loadKey > 0 && (
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
                    className="w-full accent-lt-accent cursor-pointer h-1 appearance-none bg-lt-border [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:bg-lt-accent"
                  />
                </div>
              ))}
            </div>

            <div className="relative border border-lt-border p-1 bg-lt-surface/20">
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-lt-ink"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-lt-ink"></div>
              <canvas
                ref={canvasRef}
                onClick={handleView}
                className="w-full h-auto cursor-pointer block"
              />
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={handleDownload}
                className="group relative border border-lt-border bg-lt-bg px-6 py-2.5 text-[11px] font-mono font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:bg-lt-ink hover:text-lt-bg"
              >
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-lt-ink"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-lt-ink"></div>
                Download
              </button>
              <button
                onClick={handleReset}
                className="group relative border border-lt-border bg-lt-bg px-6 py-2.5 text-[11px] font-mono font-black uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:bg-lt-ink hover:text-lt-bg"
              >
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-lt-ink"></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-lt-ink"></div>
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
