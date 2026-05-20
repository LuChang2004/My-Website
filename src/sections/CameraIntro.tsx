import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Camera, Check, AlertCircle, RefreshCw } from 'lucide-react';
import * as faceapi from 'face-api.js';

const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@latest/model';

interface CameraIntroProps {
  onComplete: (fragments: FaceFragmentData[]) => void;
}

export interface FaceFragmentData {
  id: string;
  type: 'eye' | 'nose' | 'mouth';
  imageData: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
}

type CaptureStatus = 'pending' | 'capturing' | 'done';

interface FeatureStatus {
  leftEye: CaptureStatus;
  rightEye: CaptureStatus;
  nose: CaptureStatus;
  mouth: CaptureStatus;
}

export default function CameraIntro({ onComplete }: CameraIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState<'loading' | 'request' | 'capturing' | 'preview' | 'error'>('loading');
  const [featureStatus, setFeatureStatus] = useState<FeatureStatus>({
    leftEye: 'pending',
    rightEye: 'pending',
    nose: 'pending',
    mouth: 'pending',
  });
  const [capturedPieces, setCapturedPieces] = useState<FaceFragmentData[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const streamRef = useRef<MediaStream | null>(null);
  const detectIntervalRef = useRef<number | null>(null);
  const fragmentIdRef = useRef(0);
  const featureStatusRef = useRef<FeatureStatus>({
    leftEye: 'pending',
    rightEye: 'pending',
    nose: 'pending',
    mouth: 'pending',
  });

  // Keep ref in sync
  useEffect(() => {
    featureStatusRef.current = featureStatus;
  }, [featureStatus]);

  // Load models
  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        setStep('request');
      } catch (err) {
        console.error('Failed to load models:', err);
        setStep('error');
        setErrorMsg('模型加载失败，请检查网络连接');
      }
    };
    loadModels();
  }, []);

  // Extract facial feature with contour clipping
  const extractRegion = useCallback(
    (video: HTMLVideoElement, points: faceapi.Point[], type: 'eye' | 'nose' | 'mouth'): string | null => {
      if (!canvasRef.current || points.length < 3) return null;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const xs = points.map((p) => p.x);
      const ys = points.map((p) => p.y);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);

      const padX = type === 'mouth' ? 18 : type === 'nose' ? 14 : 10;
      const padY = type === 'mouth' ? 14 : type === 'nose' ? 18 : 10;
      const w = maxX - minX + padX * 2;
      const h = maxY - minY + padY * 2;
      if (w < 15 || h < 15) return null;

      canvas.width = w;
      canvas.height = h;
      ctx.clearRect(0, 0, w, h);

      const offsetX = minX - padX;
      const offsetY = minY - padY;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(points[0].x - offsetX, points[0].y - offsetY);
      for (let i = 0; i < points.length; i++) {
        const next = points[(i + 1) % points.length];
        const next2 = points[(i + 2) % points.length];
        const endX = (next.x + next2.x) / 2 - offsetX;
        const endY = (next.y + next2.y) / 2 - offsetY;
        ctx.quadraticCurveTo(next.x - offsetX, next.y - offsetY, endX, endY);
      }
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(video, minX - padX, minY - padY, w, h, 0, 0, w, h);
      ctx.restore();

      // Soft edge mask
      ctx.save();
      ctx.globalCompositeOperation = 'destination-in';
      ctx.filter = 'blur(3px)';
      ctx.beginPath();
      ctx.moveTo(points[0].x - offsetX, points[0].y - offsetY);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x - offsetX, points[i].y - offsetY);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // Grayscale
      const imageData = ctx.getImageData(0, 0, w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] < 10) continue;
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }
      ctx.putImageData(imageData, 0, 0);

      return canvas.toDataURL('image/png');
    },
    []
  );

  // Check if all features are captured
  const allCaptured = (status: FeatureStatus): boolean => {
    return status.leftEye === 'done' && status.rightEye === 'done' && status.nose === 'done' && status.mouth === 'done';
  };

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStep('capturing');
        startDetection();
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      setStep('error');
      setErrorMsg('无法访问摄像头，请在浏览器设置中允许摄像头权限');
    }
  }, []);

  // Face detection loop — captures ALL features individually
  const startDetection = useCallback(() => {
    if (detectIntervalRef.current) clearInterval(detectIntervalRef.current);

    detectIntervalRef.current = window.setInterval(async () => {
      const video = videoRef.current;
      if (!video || video.paused || video.ended) return;

      try {
        const detection = await faceapi
          .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        if (!detection) return;

        const positions = detection.landmarks.positions;
        const currentStatus = featureStatusRef.current;
        const newPieces: FaceFragmentData[] = [];
        let updated = false;

        // Try to capture each pending feature
        // Left eye
        if (currentStatus.leftEye !== 'done') {
          const leftEye = positions.slice(36, 42);
          const data = extractRegion(video, leftEye, 'eye');
          if (data) {
            newPieces.push({
              id: `frag-${fragmentIdRef.current++}`,
              type: 'eye',
              imageData: data,
              x: Math.random() * 15 + 2,
              y: Math.random() * 80 + 10,
              scale: 0.6 + Math.random() * 0.4,
              rotation: -20 + Math.random() * 40,
              opacity: 0.4 + Math.random() * 0.3,
            });
            featureStatusRef.current = { ...featureStatusRef.current, leftEye: 'done' };
            updated = true;
          } else if (currentStatus.leftEye === 'pending') {
            featureStatusRef.current = { ...featureStatusRef.current, leftEye: 'capturing' };
            updated = true;
          }
        }

        // Right eye
        if (currentStatus.rightEye !== 'done') {
          const rightEye = positions.slice(42, 48);
          const data = extractRegion(video, rightEye, 'eye');
          if (data) {
            newPieces.push({
              id: `frag-${fragmentIdRef.current++}`,
              type: 'eye',
              imageData: data,
              x: 83 + Math.random() * 15,
              y: Math.random() * 80 + 10,
              scale: 0.6 + Math.random() * 0.4,
              rotation: -20 + Math.random() * 40,
              opacity: 0.4 + Math.random() * 0.3,
            });
            featureStatusRef.current = { ...featureStatusRef.current, rightEye: 'done' };
            updated = true;
          } else if (currentStatus.rightEye === 'pending') {
            featureStatusRef.current = { ...featureStatusRef.current, rightEye: 'capturing' };
            updated = true;
          }
        }

        // Nose
        if (currentStatus.nose !== 'done') {
          const nose = positions.slice(27, 36);
          const data = extractRegion(video, nose, 'nose');
          if (data) {
            newPieces.push({
              id: `frag-${fragmentIdRef.current++}`,
              type: 'nose',
              imageData: data,
              x: Math.random() < 0.5 ? Math.random() * 12 + 1 : 87 + Math.random() * 12,
              y: Math.random() * 70 + 15,
              scale: 0.8 + Math.random() * 0.3,
              rotation: -15 + Math.random() * 30,
              opacity: 0.35 + Math.random() * 0.25,
            });
            featureStatusRef.current = { ...featureStatusRef.current, nose: 'done' };
            updated = true;
          } else if (currentStatus.nose === 'pending') {
            featureStatusRef.current = { ...featureStatusRef.current, nose: 'capturing' };
            updated = true;
          }
        }

        // Mouth
        if (currentStatus.mouth !== 'done') {
          const mouth = positions.slice(48, 60);
          const data = extractRegion(video, mouth, 'mouth');
          if (data) {
            newPieces.push({
              id: `frag-${fragmentIdRef.current++}`,
              type: 'mouth',
              imageData: data,
              x: Math.random() < 0.5 ? Math.random() * 10 + 2 : 88 + Math.random() * 10,
              y: Math.random() * 75 + 15,
              scale: 0.7 + Math.random() * 0.4,
              rotation: -25 + Math.random() * 50,
              opacity: 0.35 + Math.random() * 0.25,
            });
            featureStatusRef.current = { ...featureStatusRef.current, mouth: 'done' };
            updated = true;
          } else if (currentStatus.mouth === 'pending') {
            featureStatusRef.current = { ...featureStatusRef.current, mouth: 'capturing' };
            updated = true;
          }
        }

        if (updated) {
          setFeatureStatus({ ...featureStatusRef.current });
        }

        if (newPieces.length > 0) {
          setCapturedPieces((prev) => [...prev, ...newPieces]);
        }

        // Check if ALL features are captured
        if (allCaptured(featureStatusRef.current)) {
          if (detectIntervalRef.current) {
            clearInterval(detectIntervalRef.current);
            detectIntervalRef.current = null;
          }
          setStep('preview');
        }
      } catch (err) {
        console.error('Detection error:', err);
      }
    }, 600);
  }, [extractRegion]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (detectIntervalRef.current) {
      clearInterval(detectIntervalRef.current);
      detectIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // Confirm and close
  const handleConfirm = useCallback(() => {
    stopCamera();
    onComplete(capturedPieces);
  }, [capturedPieces, onComplete, stopCamera]);

  // Skip camera
  const handleSkip = useCallback(() => {
    stopCamera();
    onComplete([]);
  }, [onComplete, stopCamera]);

  // Retry
  const handleRetry = useCallback(() => {
    setStep('request');
    setErrorMsg('');
    setFeatureStatus({ leftEye: 'pending', rightEye: 'pending', nose: 'pending', mouth: 'pending' });
    featureStatusRef.current = { leftEye: 'pending', rightEye: 'pending', nose: 'pending', mouth: 'pending' };
    setCapturedPieces([]);
  }, []);

  // Restart capture
  const handleRestart = useCallback(() => {
    stopCamera();
    setStep('request');
    setFeatureStatus({ leftEye: 'pending', rightEye: 'pending', nose: 'pending', mouth: 'pending' });
    featureStatusRef.current = { leftEye: 'pending', rightEye: 'pending', nose: 'pending', mouth: 'pending' };
    setCapturedPieces([]);
    setTimeout(() => startCamera(), 100);
  }, [startCamera, stopCamera]);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const getStatusIcon = (status: CaptureStatus) => {
    switch (status) {
      case 'done':
        return <div className="w-3 h-3 rounded-full bg-[#c8102e]" />;
      case 'capturing':
        return <div className="w-3 h-3 rounded-full border border-[#c8102e] animate-pulse" />;
      default:
        return <div className="w-3 h-3 rounded-full border border-[rgba(245,245,240,0.15)]" />;
    }
  };

  const doneCount = Object.values(featureStatus).filter((s) => s === 'done').length;
  const totalCount = 4;

  return (
    <div className="camera-intro-modal fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center">
      {/* Hidden elements */}
      <video ref={videoRef} className="hidden" width={640} height={480} muted playsInline />
      <canvas ref={canvasRef} className="hidden" />

      <motion.div
        className="max-w-md w-full mx-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Step: Loading */}
        {step === 'loading' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-[#c8102e] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#888888] text-[13px] font-sans-sc">正在加载面部识别模型...</p>
          </div>
        )}

        {/* Step: Request */}
        {step === 'request' && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[rgba(200,16,46,0.1)] flex items-center justify-center">
              <Camera className="w-7 h-7 text-[#c8102e]" />
            </div>
            <div>
              <p className="text-[#f5f5f0] text-xl font-semibold font-sans-sc mb-3">
                开启面部捕捉
              </p>
              <p className="text-[#888888] text-[13px] font-sans-sc leading-relaxed mb-6">
                本页面包含面部交互体验。我们需要访问您的摄像头来捕捉五官轮廓，
                <br />
                并将其作为视觉元素融入页面。所有处理均在本地完成，不会上传任何数据。
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={startCamera}
                className="w-full bg-[#c8102e] text-white py-3 font-sans-sc text-[13px] hover:bg-[#a00c24] transition-colors flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" /> 允许并开启摄像头
              </button>
              <button
                onClick={handleSkip}
                className="w-full bg-transparent text-[#666666] py-2 font-sans-sc text-[12px] hover:text-[#f5f5f0] transition-colors"
              >
                跳过，直接进入页面
              </button>
            </div>
          </div>
        )}

        {/* Step: Capturing */}
        {step === 'capturing' && (
          <div className="flex flex-col items-center gap-5">
            {/* Video preview */}
            <div className="relative w-[280px] h-[210px] bg-[#111] border border-[rgba(245,245,240,0.08)] overflow-hidden">
              <video
                ref={(el) => {
                  if (el && videoRef.current) {
                    el.srcObject = videoRef.current.srcObject;
                    el.play();
                  }
                }}
                className="w-full h-full object-cover"
                muted
                playsInline
                autoPlay
              />
              {/* Face guide overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[120px] h-[160px] border-2 border-dashed border-[rgba(200,16,46,0.3)] rounded-full" />
              </div>
              {/* Corner markers */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#c8102e]" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#c8102e]" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#c8102e]" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#c8102e]" />
            </div>

            <div>
              <p className="text-[#f5f5f0] text-lg font-semibold font-sans-sc mb-2">
                请转动头部
              </p>
              <p className="text-[#888888] text-[12px] font-sans-sc">
                缓慢转动头部，让摄像头捕捉您的全部五官
              </p>
            </div>

            {/* Feature status indicators */}
            <div className="w-full max-w-[240px] bg-[rgba(245,245,240,0.03)] border border-[rgba(245,245,240,0.06)] px-4 py-3">
              <div className="flex justify-between text-[10px] text-[#888888] font-space mb-2">
                <span>五官捕捉状态</span>
                <span>
                  {doneCount}/{totalCount}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(featureStatus.leftEye)}
                    <span className="text-[11px] text-[#f5f5f0] font-sans-sc">左眼</span>
                  </div>
                  <span className="text-[9px] text-[#888888] font-space">
                    {featureStatus.leftEye === 'done' ? '已捕捉' : featureStatus.leftEye === 'capturing' ? '捕捉中...' : '待捕捉'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(featureStatus.rightEye)}
                    <span className="text-[11px] text-[#f5f5f0] font-sans-sc">右眼</span>
                  </div>
                  <span className="text-[9px] text-[#888888] font-space">
                    {featureStatus.rightEye === 'done' ? '已捕捉' : featureStatus.rightEye === 'capturing' ? '捕捉中...' : '待捕捉'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(featureStatus.nose)}
                    <span className="text-[11px] text-[#f5f5f0] font-sans-sc">鼻子</span>
                  </div>
                  <span className="text-[9px] text-[#888888] font-space">
                    {featureStatus.nose === 'done' ? '已捕捉' : featureStatus.nose === 'capturing' ? '捕捉中...' : '待捕捉'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(featureStatus.mouth)}
                    <span className="text-[11px] text-[#f5f5f0] font-sans-sc">嘴巴</span>
                  </div>
                  <span className="text-[9px] text-[#888888] font-space">
                    {featureStatus.mouth === 'done' ? '已捕捉' : featureStatus.mouth === 'capturing' ? '捕捉中...' : '待捕捉'}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 h-[2px] bg-[rgba(245,245,240,0.1)]">
                <motion.div
                  className="h-full bg-[#c8102e]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(doneCount / totalCount) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            <button onClick={handleSkip} className="text-[#666666] text-[11px] font-sans-sc hover:text-[#f5f5f0] transition-colors">
              跳过
            </button>
          </div>
        )}

        {/* Step: Preview */}
        {step === 'preview' && (
          <div className="flex flex-col items-center gap-5">
            <p className="text-[#f5f5f0] text-lg font-semibold font-sans-sc">五官捕捉完成</p>

            {/* Preview all captured pieces */}
            <div className="flex flex-row gap-3 justify-center">
              {capturedPieces.map((frag) => (
                <div
                  key={frag.id}
                  className="w-14 h-14 bg-[#111] border border-[rgba(245,245,240,0.08)] flex items-center justify-center overflow-hidden"
                >
                  <img src={frag.imageData} alt={frag.type} className="w-full h-full object-contain" />
                </div>
              ))}
            </div>

            <p className="text-[#888888] text-[12px] font-sans-sc">您的五官轮廓将作为视觉元素融入页面</p>

            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleConfirm}
                className="w-full bg-[#c8102e] text-white py-3 font-sans-sc text-[13px] hover:bg-[#a00c24] transition-colors flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> 确认并进入页面
              </button>
              <button
                onClick={handleRestart}
                className="w-full bg-transparent text-[#666666] py-2 font-sans-sc text-[12px] hover:text-[#f5f5f0] transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3 h-3" /> 重新捕捉
              </button>
            </div>
          </div>
        )}

        {/* Step: Error */}
        {step === 'error' && (
          <div className="flex flex-col items-center gap-5">
            <AlertCircle className="w-10 h-10 text-[#c8102e]" />
            <div>
              <p className="text-[#f5f5f0] text-lg font-semibold font-sans-sc mb-2">出错了</p>
              <p className="text-[#888888] text-[12px] font-sans-sc">{errorMsg}</p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleRetry}
                className="w-full bg-[#c8102e] text-white py-3 font-sans-sc text-[13px] hover:bg-[#a00c24] transition-colors"
              >
                重试
              </button>
              <button
                onClick={handleSkip}
                className="w-full bg-transparent text-[#666666] py-2 font-sans-sc text-[12px] hover:text-[#f5f5f0] transition-colors"
              >
                跳过，直接进入页面
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
