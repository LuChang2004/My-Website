import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CameraOff, Loader2 } from 'lucide-react';
import * as faceapi from 'face-api.js';

const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@latest/model';

type FeatureType = 'eye' | 'mouth';

interface FeatureSlot {
  id: string;
  type: FeatureType;
  side: 'left' | 'right';
  imageData: string | null;
  x: number;
  y: number;
  size: number;
  delay: number;
  breathDuration: number;
  breathAmp: number;
  rotation: number;
  zIndex: number;
  opacity: number;
}

// Clustered irregular distribution: 14 eyes, 6 mouths
function generateSlots(): Omit<FeatureSlot, 'imageData'>[] {
  const slots: Omit<FeatureSlot, 'imageData'>[] = [];
  let seed = 42;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };

  // Pre-assign types: 14 eyes, 6 mouths
  const types: FeatureType[] = [
    'eye', 'eye', 'eye', 'eye', 'eye', 'eye', 'eye',
    'eye', 'eye', 'eye', 'eye', 'eye', 'eye', 'eye',
    'mouth', 'mouth', 'mouth', 'mouth', 'mouth', 'mouth',
  ];

  // Shuffle types
  for (let i = types.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [types[i], types[j]] = [types[j], types[i]];
  }

  // Clustered Y positions: group into 5 vertical clusters with gaps between
  const clusterCenters = [10, 28, 50, 72, 88];

  for (let i = 0; i < 20; i++) {
    const side = i % 2 === 0 ? 'left' : 'right';
    const clusterIdx = i % 5;
    const baseY = clusterCenters[clusterIdx];
    // Scatter within cluster + global jitter
    const yPct = baseY + (rand() - 0.5) * 18;
    const xOffset = 2 + rand() * 50;

    const sizeRoll = rand();
    let size: number;
    let opacity: number;
    if (sizeRoll < 0.28) {
      size = 38 + rand() * 28;
      opacity = 0.28 + rand() * 0.16;
    } else if (sizeRoll < 0.58) {
      size = 68 + rand() * 36;
      opacity = 0.44 + rand() * 0.2;
    } else if (sizeRoll < 0.82) {
      size = 105 + rand() * 42;
      opacity = 0.62 + rand() * 0.18;
    } else {
      size = 148 + rand() * 48;
      opacity = 0.8 + rand() * 0.16;
    }

    slots.push({
      id: `slot-${side}-${i}-${types[i]}`,
      type: types[i],
      side,
      x: xOffset,
      y: Math.max(2, Math.min(94, yPct)),
      size,
      delay: rand() * 0.6,
      breathDuration: 2.8 + rand() * 3.5,
      breathAmp: 4 + rand() * 10,
      rotation: (rand() - 0.5) * 50,
      zIndex: Math.floor(rand() * 15),
      opacity,
    });
  }
  return slots;
}

const INITIAL_SLOTS: FeatureSlot[] = generateSlots().map((s) => ({
  ...s,
  imageData: null,
}));

export default function FaceCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading-models' | 'ready' | 'starting-camera' | 'detecting' | 'error'>('idle');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [slots, setSlots] = useState<FeatureSlot[]>(INITIAL_SLOTS);
  const [detectedCount, setDetectedCount] = useState(0);
  const streamRef = useRef<MediaStream | null>(null);
  const detectIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slotsRef = useRef<FeatureSlot[]>(INITIAL_SLOTS);
  const isDetectingRef = useRef(false);

  useEffect(() => { slotsRef.current = slots; }, [slots]);

  useEffect(() => {
    setStatus('loading-models');
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        setStatus('ready');
      } catch (err) {
        console.error('Model load failed:', err);
        setStatus('error');
        setErrorMsg('模型加载失败');
      }
    };
    loadModels();
  }, []);

  const extractRegion = useCallback(
    (video: HTMLVideoElement, points: faceapi.Point[], type: FeatureType): string | null => {
      const canvas = canvasRef.current;
      if (!canvas || points.length < 3) return null;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const xs = points.map((p) => p.x);
      const ys = points.map((p) => p.y);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      const padX = type === 'mouth' ? 18 : 18;
      const padY = type === 'mouth' ? 14 : 22;
      const w = maxX - minX + padX * 2;
      const h = maxY - minY + padY * 2;
      if (w < 10 || h < 10) return null;

      canvas.width = w;
      canvas.height = h;
      ctx.clearRect(0, 0, w, h);

      const ox = minX - padX;
      const oy = minY - padY;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(points[0].x - ox, points[0].y - oy);
      for (let i = 0; i < points.length; i++) {
        const next = points[(i + 1) % points.length];
        const next2 = points[(i + 2) % points.length];
        ctx.quadraticCurveTo(next.x - ox, next.y - oy, (next.x + next2.x) / 2 - ox, (next.y + next2.y) / 2 - oy);
      }
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(video, minX - padX, minY - padY, w, h, 0, 0, w, h);
      ctx.restore();

      try {
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 20) continue;
          const g = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
          data[i] = g;
          data[i + 1] = g;
          data[i + 2] = g;
        }
        ctx.putImageData(imgData, 0, 0);
      } catch { /* Canvas tainted */ }

      try { return canvas.toDataURL('image/png'); } catch { return null; }
    },
    []
  );

  const runDetection = useCallback(async () => {
    if (isDetectingRef.current) return;
    isDetectingRef.current = true;

    const video = videoRef.current;
    if (!video || video.readyState < 2) { isDetectingRef.current = false; return; }

    try {
      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 416, scoreThreshold: 0.3 }))
        .withFaceLandmarks();

      if (!detection) { isDetectingRef.current = false; return; }

      const positions = detection.landmarks.positions;
      const pool: Record<string, string[]> = {};

      try {
        const leftEye = extractRegion(video, positions.slice(36, 42), 'eye');
        const rightEye = extractRegion(video, positions.slice(42, 48), 'eye');
        if (leftEye) pool.eye = [leftEye];
        if (rightEye) pool.eye = [...(pool.eye || []), rightEye];
      } catch { /* ignore */ }

      try {
        const mouth = extractRegion(video, positions.slice(48, 60), 'mouth');
        if (mouth) pool.mouth = [mouth];
      } catch { /* ignore */ }

      const currentSlots = slotsRef.current;
      let updatedCount = 0;
      const newSlots = currentSlots.map((slot) => {
        const imgs = pool[slot.type];
        if (!imgs || imgs.length === 0) return slot;
        const idx = Math.abs(slot.id.charCodeAt(slot.id.length - 1) + slot.id.charCodeAt(0)) % imgs.length;
        const img = imgs[idx];
        if (img && img !== slot.imageData) {
          updatedCount++;
          return { ...slot, imageData: img };
        }
        return slot;
      });

      if (updatedCount > 0) {
        slotsRef.current = newSlots;
        setSlots(newSlots);
        setDetectedCount((c) => c + 1);
      }
    } catch (err) {
      console.error('Detection error:', err);
    }
    isDetectingRef.current = false;
  }, [extractRegion]);

  const startCamera = useCallback(async () => {
    setStatus('starting-camera');
    setErrorMsg('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraOn(true);
        setStatus('detecting');
        if (detectIntervalRef.current) clearInterval(detectIntervalRef.current);
        detectIntervalRef.current = setInterval(() => runDetection(), 250);
      }
    } catch (err: unknown) {
      console.error('Camera error:', err);
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : '无法访问摄像头');
      setIsCameraOn(false);
    }
  }, [runDetection]);

  const stopCamera = useCallback(() => {
    if (detectIntervalRef.current) { clearInterval(detectIntervalRef.current); detectIntervalRef.current = null; }
    if (streamRef.current) { streamRef.current.getTracks().forEach((t) => t.stop()); streamRef.current = null; }
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsCameraOn(false);
    setHasBeenClosed(true);
    setStatus('ready');
    setDetectedCount(0);
    setSlots(INITIAL_SLOTS);
    slotsRef.current = INITIAL_SLOTS;
  }, []);

  // ===== DRAG =====
  const dragRef = useRef<{
    active: boolean; slotId: string | null;
    startX: number; startY: number;
    origX: number; origY: number;
  }>({ active: false, slotId: null, startX: 0, startY: 0, origX: 0, origY: 0 });

  const handlePointerDown = useCallback((e: React.PointerEvent, slotId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const slot = slotsRef.current.find((s) => s.id === slotId);
    if (!slot) return;
    dragRef.current = { active: true, slotId, startX: e.clientX, startY: e.clientY, origX: slot.x, origY: slot.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent, slotId: string) => {
    if (!dragRef.current.active || dragRef.current.slotId !== slotId) return;
    e.preventDefault();
    const dx = (e.clientX - dragRef.current.startX) * 0.4;
    const dy = (e.clientY - dragRef.current.startY) * 0.4;
    setSlots((prev) => {
      const newSlots = prev.map((s) =>
        s.id === slotId
          ? { ...s, x: dragRef.current.origX + (s.side === 'left' ? dx : -dx), y: dragRef.current.origY + dy }
          : s
      );
      slotsRef.current = newSlots;
      return newSlots;
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    dragRef.current = { active: false, slotId: null, startX: 0, startY: 0, origX: 0, origY: 0 };
  }, []);

  useEffect(() => {
    return () => {
      if (detectIntervalRef.current) clearInterval(detectIntervalRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const showStartBtn = status === 'ready' && !isCameraOn && !hasBeenClosed;
  const showRestartBtn = status === 'ready' && !isCameraOn && hasBeenClosed;
  const showLoading = status === 'loading-models' || status === 'starting-camera';

  return (
    <>
      <video
        ref={videoRef}
        width={640}
        height={480}
        muted
        playsInline
        style={{ position: 'fixed', top: 0, left: 0, width: 1, height: 1, opacity: 0, pointerEvents: 'none', zIndex: -1 }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', top: 0, left: 0, width: 1, height: 1, opacity: 0, pointerEvents: 'none', zIndex: -1 }}
      />

      {/* ===== SIDE FEATURES ===== */}
      {/* CRITICAL: container has pointerEvents:'none' so gaps between fragments pass through to page content */}
      <div className="fixed inset-0 z-[30]" style={{ pointerEvents: 'none' }}>
        <AnimatePresence>
          {isCameraOn &&
            slots.map((slot) =>
              slot.imageData ? (
                <motion.div
                  key={slot.id}
                  className="absolute"
                  style={{
                    [slot.side === 'left' ? 'left' : 'right']: `${slot.x}px`,
                    top: `${slot.y}%`,
                    width: slot.size,
                    zIndex: slot.zIndex,
                    // Each fragment individually receives pointer events; gaps between them are transparent
                    pointerEvents: 'auto',
                    touchAction: 'none',
                  }}
                  initial={{ opacity: 0, scale: 0.15 }}
                  animate={{
                    opacity: slot.opacity,
                    scale: [1, 1.05, 0.97, 1],
                    y: [0, -slot.breathAmp, slot.breathAmp * 0.5, 0],
                  }}
                  exit={{ opacity: 0, scale: 0.15 }}
                  transition={{
                    opacity: { duration: 0.6, delay: slot.delay },
                    scale: {
                      duration: slot.breathDuration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: slot.delay,
                    },
                    y: {
                      duration: slot.breathDuration * 1.3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: slot.delay * 0.5,
                    },
                  }}
                  onPointerDown={(e) => handlePointerDown(e, slot.id)}
                  onPointerMove={(e) => handlePointerMove(e, slot.id)}
                  onPointerUp={handlePointerUp}
                >
                  <img
                    src={slot.imageData}
                    alt=""
                    className="block w-full h-auto"
                    draggable={false}
                    style={{
                      filter: 'contrast(1.15) brightness(1.3) saturate(0)',
                      transform: `rotate(${slot.rotation}deg)`,
                      userSelect: 'none',
                      cursor: 'grab',
                      pointerEvents: 'none',
                    }}
                  />
                </motion.div>
              ) : null
            )}
        </AnimatePresence>
      </div>

      {/* ===== START / RESTART / LOADING / ERROR / CLOSE BUTTONS ===== */}
      <AnimatePresence>
        {showStartBtn && (
          <motion.div
            className="fixed bottom-6 right-6 z-[60]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <button
              onClick={startCamera}
              className="flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-3.5 font-sans-sc text-[13px] hover:bg-[#c8102e] transition-colors shadow-lg rounded-sm"
            >
              <Camera className="w-4 h-4" />
              <span>开启面部捕捉</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRestartBtn && (
          <motion.div
            className="fixed bottom-6 right-6 z-[60]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <button
              onClick={() => { setHasBeenClosed(false); setTimeout(startCamera, 50); }}
              className="flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-3.5 font-sans-sc text-[13px] hover:bg-[#c8102e] transition-colors shadow-lg rounded-sm"
            >
              <Camera className="w-4 h-4" />
              <span>再次捕捉</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLoading && (
          <motion.div
            className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 bg-[#333] text-white px-5 py-3.5 font-sans-sc text-[13px] rounded-sm shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{status === 'loading-models' ? '加载模型中...' : '启动摄像头...'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            className="fixed bottom-6 right-6 z-[60] bg-[#c8102e] text-white px-5 py-3.5 font-sans-sc text-[13px] rounded-sm shadow-lg max-w-[280px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="font-medium mb-0.5">出错了</p>
            <p className="text-[11px] opacity-80">{errorMsg || '请检查摄像头权限'}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCameraOn && (
          <motion.button
            className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 bg-[#c8102e] text-white px-5 py-3.5 font-sans-sc text-[13px] hover:bg-[#1A1A1A] transition-colors shadow-lg rounded-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={stopCamera}
          >
            <CameraOff className="w-4 h-4" />
            <span>关闭</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Detection indicator */}
      <AnimatePresence>
        {status === 'detecting' && detectedCount === 0 && (
          <motion.div
            className="fixed top-4 right-4 z-[60] bg-[#1A1A1A] text-white px-3 py-2 font-sans-sc text-[11px] rounded-sm shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#c8102e] animate-pulse mr-2" />
            正在识别面部...
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
