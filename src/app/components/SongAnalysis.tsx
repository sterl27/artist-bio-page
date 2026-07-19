import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Layers, 
  Settings, 
  Activity, 
  Volume2, 
  Sparkles, 
  Music, 
  ChevronDown, 
  Menu,
  FileAudio,
  Radio,
  Sliders,
  SlidersHorizontal
} from 'lucide-react';

const TRACK_SEGMENTS_PRESETS = [
  { id: 'intro', name: "Intro", duration: "00:00", rawSeconds: 0, durationLabel: "00:37", intensity: "Medium", color: "from-neutral-800/20 to-transparent", textColor: "text-neutral-300", borderColor: "border-neutral-500/30" },
  { id: 'verse1', name: "Verse 1", duration: "00:37", rawSeconds: 37, durationLabel: "00:43", intensity: "High", color: "from-neutral-100/10 to-transparent", textColor: "text-white", borderColor: "border-neutral-200/30" },
  { id: 'hook', name: "Hook", duration: "01:20", rawSeconds: 80, durationLabel: "00:39", intensity: "High", color: "from-neutral-100/10 to-transparent", textColor: "text-white", borderColor: "border-neutral-200/30" },
  { id: 'outro', name: "Drop / Outro", duration: "01:59", rawSeconds: 119, durationLabel: "00:41", intensity: "Medium", color: "from-neutral-800/20 to-transparent", textColor: "text-neutral-300", borderColor: "border-neutral-500/30" }
];

const LYRICS_PRESETS = [
  { time: "00:00", seconds: 0, text: "The last bold borders" },
  { time: "00:05", seconds: 5, text: "Want you're swarth go every knot" },
  { time: "00:12", seconds: 12, text: "Don't even raise award the first" },
  { time: "00:18", seconds: 18, text: "Cold Case - Protocol Zero" },
  { time: "00:23", seconds: 23, text: "Hooks a know share" },
  { time: "00:30", seconds: 30, text: "Trra you like close" },
  { time: "00:35", seconds: 35, text: "Until you can't inside" },
  { time: "00:42", seconds: 42, text: "Wanan't get over the fixes" },
  { time: "00:48", seconds: 48, text: "Local instances running cold on the iron ring layout." },
  { time: "00:55", seconds: 55, text: "Resonating frequencies locking into the master matrix." },
  { time: "01:02", seconds: 62, text: "Decrypting the secondary audio channel feed..." }
];

export function SongAnalysis() {
  const [activeTab, setActiveTab] = useState('Analytics');
  const [pipelineActive, setPipelineActive] = useState(false);
  const [audioSource, setAudioSource] = useState('simulation'); // 'simulation' or 'microphone'
  const [activeSegment, setActiveSegment] = useState('intro');
  const [lyrics] = useState(LYRICS_PRESETS);
  const [bpm, setBpm] = useState(138);
  const [harmonicRoot] = useState('E minor');
  const [spectralCentroid, setSpectralCentroid] = useState(2450);
  const [energy, setEnergy] = useState(84);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [grainActive, setGrainActive] = useState(true);
  const [chiaroscuroContrast, setChiaroscuroContrast] = useState(100);
  const [micVolume, setMicVolume] = useState(0);
  const [, setCurrentPlayTime] = useState(0);
  const [telemetryLog, setTelemetryLog] = useState<string[]>([
    'Chiaroscuro audio visualizer matrix online.',
    'Granular synthesis sequencer loaded.'
  ]);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevSpectrumRef = useRef<Uint8Array | null>(null);
  
  // Custom synth engine sequencer state references
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentStepRef = useRef(0);
  const gainNodeRef = useRef<GainNode | null>(null);

  const addTelemetryLog = (msg: string) => {
    setTelemetryLog((prev) => [msg, ...prev.slice(0, 5)]);
  };

  // Granular synthesis engine
  const startSimulationSynth = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      
      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.12, audioCtx.currentTime); // Comfortable volume

      masterGain.connect(analyser);
      analyser.connect(audioCtx.destination);

      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
      gainNodeRef.current = masterGain;

      // Create a 1-second buffer for granular slicing
      const bufferSize = audioCtx.sampleRate * 1.0;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        // Generate complex harmonics with high-frequency noise elements
        data[i] = Math.sin(i * 0.05) * 0.4 + Math.sin(i * 0.02) * 0.3 + (Math.random() * 2 - 1) * 0.15;
      }

      // Sequencer step clock (138 BPM, 8th notes)
      const stepInterval = (60 / 138) / 2; // in seconds
      currentStepRef.current = 0;

      const frequencies = [82.41, 98.00, 110.00, 123.47, 146.83, 164.81, 196.00, 220.00]; // E minor root scale

      const runSequencer = () => {
        const time = audioCtx.currentTime;
        
        // Trigger Grain synthesis slice
        if (currentStepRef.current % 1 === 0) {
          const grain = audioCtx.createBufferSource();
          grain.buffer = buffer;
          
          // Random offset slice and grain duration
          const offset = Math.random() * 0.8;
          const duration = 0.06 + Math.random() * 0.1;
          
          // Pitch variation playback rate
          grain.playbackRate.value = 0.8 + Math.random() * 0.8;

          const gGain = audioCtx.createGain();
          gGain.gain.setValueAtTime(0.25, time);
          gGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

          const filter = audioCtx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(800 + Math.random() * 1500, time);

          grain.connect(filter);
          filter.connect(gGain);
          gGain.connect(masterGain);

          grain.start(time, offset, duration);
        }

        // Synth bassline trigger
        if (currentStepRef.current % 2 === 0) {
          const osc = audioCtx.createOscillator();
          const filter = audioCtx.createBiquadFilter();
          const amp = audioCtx.createGain();

          osc.type = 'sawtooth';
          const noteIndex = Math.floor(currentStepRef.current / 4) % 4;
          osc.frequency.setValueAtTime(frequencies[noteIndex] / 2, time);

          filter.type = 'lowpass';
          filter.Q.setValueAtTime(5, time);
          filter.frequency.setValueAtTime(300, time);
          filter.frequency.exponentialRampToValueAtTime(1200, time + 0.1);
          filter.frequency.exponentialRampToValueAtTime(100, time + 0.2);

          amp.gain.setValueAtTime(0.35, time);
          amp.gain.exponentialRampToValueAtTime(0.01, time + 0.25);

          osc.connect(filter);
          filter.connect(amp);
          amp.connect(masterGain);

          osc.start(time);
          osc.stop(time + 0.3);
        }

        // Upbeat noise hits
        if (currentStepRef.current % 8 === 4) {
          const snareOsc = audioCtx.createOscillator();
          const snareFilter = audioCtx.createBiquadFilter();
          const snareAmp = audioCtx.createGain();

          snareOsc.type = 'triangle';
          snareOsc.frequency.setValueAtTime(220, time);

          snareFilter.type = 'highpass';
          snareFilter.frequency.setValueAtTime(1000, time);

          snareAmp.gain.setValueAtTime(0.2, time);
          snareAmp.gain.exponentialRampToValueAtTime(0.01, time + 0.08);

          snareOsc.connect(snareFilter);
          snareFilter.connect(snareAmp);
          snareAmp.connect(masterGain);

          snareOsc.start(time);
          snareOsc.stop(time + 0.1);
        }

        currentStepRef.current = (currentStepRef.current + 1) % 32;
      };

      synthIntervalRef.current = setInterval(runSequencer, stepInterval * 1000);
      addTelemetryLog('Granular simulation clock triggers active.');
    } catch (e) {
      console.error("Web Audio simulation context failed to load:", e);
    }
  };

  const startMicrophoneInput = async () => {
    try {
      if (micStreamRef.current) {
        stopAudioEngine();
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      micStreamRef.current = stream;
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      
      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
      setAudioSource('microphone');
      setPipelineActive(true);
      addTelemetryLog('Local microphone interface linked.');
    } catch (err) {
      console.warn("Hardware Microphone access declined, falling back to simulated generation.", err);
      setAudioSource('simulation');
      setPipelineActive(true);
    }
  };

  const stopAudioEngine = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close();
    }
    audioCtxRef.current = null;
    analyserRef.current = null;
    prevSpectrumRef.current = null;
  };

  const togglePipeline = async () => {
    if (pipelineActive) {
      setPipelineActive(false);
      stopAudioEngine();
      addTelemetryLog('Audio pipeline stopped.');
    } else {
      if (audioSource === 'microphone') {
        await startMicrophoneInput();
      } else {
        startSimulationSynth();
        setPipelineActive(true);
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pipelineActive) {
      interval = setInterval(() => {
        setBpm(prev => {
          const shift = Math.floor(Math.random() * 3) - 1;
          const target = 138 + shift;
          return target >= 135 && target <= 141 ? target : prev;
        });

        setSpectralCentroid(prev => {
          const shift = Math.floor(Math.random() * 80) - 40;
          const target = 2450 + shift;
          return target >= 2200 && target <= 2650 ? target : prev;
        });

        setEnergy(prev => {
          const shift = Math.floor(Math.random() * 5) - 2;
          const target = 84 + shift;
          const nextVal = target >= 75 && target <= 92 ? target : prev;
          setMicVolume(nextVal / 100);
          return nextVal;
        });

        setCurrentPlayTime(prev => {
          const nextTime = prev + 1;
          const totalLength = 160;
          const currentSecs = nextTime % totalLength;

          if (currentSecs < 37) setActiveSegment('intro');
          else if (currentSecs < 80) setActiveSegment('verse1');
          else if (currentSecs < 119) setActiveSegment('hook');
          else setActiveSegment('outro');

          return currentSecs;
        });
      }, 1000);
    } else {
      setMicVolume(0);
    }
    return () => {
      clearInterval(interval);
    };
  }, [pipelineActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    const numBins = 64;
    const spectrumHistory: number[][] = [];
    const historyLimit = Math.floor(width / 3.5);

    for (let i = 0; i < historyLimit; i++) {
      const mockSpectrum = Array.from({ length: numBins }, (_, index) => {
        const factor = Math.sin(index / 10) * Math.cos(i / 15) * 0.5 + 0.5;
        return Math.max(0, Math.min(255, factor * 80 + Math.random() * 15));
      });
      spectrumHistory.push(mockSpectrum);
    }

    let isTransientDetected = false;
    let transientTimeout: NodeJS.Timeout | null = null;

    const drawLoop = () => {
      animationFrameId.current = requestAnimationFrame(drawLoop);

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

      const numGridLinesX = 14;
      for (let i = 1; i < numGridLinesX; i++) {
        const x = (width / numGridLinesX) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height - 30);
        ctx.stroke();
      }

      const hzLabels = [2000, 1800, 1500, 1200, 600, 500, 400, 300, 200, 100, 0];
      const plotHeight = height - 30;
      const labelSpacing = plotHeight / (hzLabels.length - 1);

      hzLabels.forEach((label, index) => {
        const y = labelSpacing * index;
        ctx.beginPath();
        ctx.moveTo(45, y);
        ctx.lineTo(width, y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.font = '9px "Courier New", Courier, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(label.toString(), 35, y + 3);
      });

      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = '10px "Courier New", Courier, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Hz', width / 2, height - 10);

      ctx.save();
      ctx.translate(12, plotHeight / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center';
      ctx.fillText('Hz', 0, 0);
      ctx.restore();

      const currentFrameData = new Uint8Array(numBins);
      if (pipelineActive && analyserRef.current) {
        analyserRef.current.getByteFrequencyData(currentFrameData);
        
        // Spectral processing: Boost frequency bins between 200Hz and 800Hz
        // Frequency bin width = 44100 / 512 = 86Hz. Bins 2 to 9 correspond to ~172Hz-774Hz.
        for (let i = 2; i <= 9; i++) {
          currentFrameData[i] = Math.min(255, Math.round(currentFrameData[i] * 1.4));
        }

        let sum = 0;
        for (let i = 0; i < currentFrameData.length; i++) {
          sum += currentFrameData[i];
        }
        setMicVolume(sum / (currentFrameData.length * 255));
      } else if (pipelineActive) {
        for (let i = 0; i < numBins; i++) {
          const t = Date.now() * 0.002;
          let val = Math.sin(i * 0.15 - t * 2) * 50;
          val += Math.cos(i * 0.08 + t * 4) * 40;
          if (i < 8) val += (8 - i) * 12;
          currentFrameData[i] = Math.max(0, Math.min(255, val + 115 + Math.random() * 15));
        }
        setMicVolume(0.4 + Math.sin(Date.now() * 0.001) * 0.15);
      } else {
        for (let i = 0; i < numBins; i++) {
          currentFrameData[i] = 0;
        }
        setMicVolume(0);
      }

      // Spectral Flux analysis
      let flux = 0;
      if (prevSpectrumRef.current) {
        for (let i = 0; i < numBins; i++) {
          flux += Math.max(0, currentFrameData[i] - prevSpectrumRef.current[i]);
        }
      }
      if (!prevSpectrumRef.current) {
        prevSpectrumRef.current = new Uint8Array(numBins);
      }
      prevSpectrumRef.current.set(currentFrameData);

      const normalizedFlux = flux / numBins;
      if (normalizedFlux > 15 && !isTransientDetected) {
        isTransientDetected = true;
        if (transientTimeout) clearTimeout(transientTimeout);
        transientTimeout = setTimeout(() => { isTransientDetected = false; }, 150);
      }

      // Render onset transient directly on canvas
      if (isTransientDetected) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px "Courier New", Courier, monospace';
        ctx.fillText('[TRANSIENT ONSET]', width - 120, height - 10);
      }

      spectrumHistory.shift();
      spectrumHistory.push(Array.from(currentFrameData));

      const graphXStart = 45;
      const graphWidth = width - graphXStart;
      const colWidth = graphWidth / historyLimit;

      for (let colIdx = 0; colIdx < historyLimit; colIdx++) {
        const frame = spectrumHistory[colIdx];
        const xPos = graphXStart + (colIdx * colWidth);

        for (let binIdx = 0; binIdx < numBins; binIdx++) {
          const amplitude = frame[binIdx];
          if (amplitude > 5) {
            const intensityRatio = amplitude / 255;
            const baseBrightness = Math.floor(intensityRatio * 215) + 40;
            const alpha = Math.min(1, intensityRatio * 1.8);
            
            ctx.fillStyle = `rgba(${baseBrightness}, ${baseBrightness}, ${baseBrightness}, ${alpha})`;

            const binHeight = plotHeight / numBins;
            const yPos = plotHeight - (binIdx * binHeight) - binHeight;

            ctx.fillRect(
              xPos,
              yPos,
              colWidth + 0.5,
              binHeight + 0.5
            );
          }
        }
      }
    };

    drawLoop();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (transientTimeout) clearTimeout(transientTimeout);
    };
  }, [pipelineActive, audioSource]);

  useEffect(() => {
    return () => stopAudioEngine();
  }, []);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#000000] text-[#eaeaea] font-sans antialiased selection:bg-[#eeeeee] selection:text-[#000000]">
      
      {grainActive && (
        <div 
          className="pointer-events-none absolute inset-0 z-50 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      )}

      {/* Sidebar navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-[#151515] bg-[#000000] flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="px-5 py-6 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.25)]">
                  <span className="text-black font-extrabold text-sm tracking-tighter">A3</span>
                </div>
                <div>
                  <span className="font-bold tracking-tight text-md text-white block">Alic3x Pro</span>
                  <span className="text-[9px] text-[#555] font-mono tracking-widest uppercase">IntelliOS v1.8</span>
                </div>
              </div>
              <button 
                className="md:hidden text-neutral-400 hover:text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <ChevronDown className="h-5 w-5 rotate-90" />
              </button>
            </div>

            <nav className="space-y-1">
              {[
                { name: 'Overview', icon: LayoutDashboard },
                { name: 'Analytics', icon: BarChart3 },
                { name: 'Projects', icon: Layers },
                { name: 'Settings', icon: Settings }
              ].map((item) => {
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActiveTab(item.name);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 px-3 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                      isActive 
                        ? 'bg-[#0a0a0a] border border-[#1e1e1e] text-white shadow-inner' 
                        : 'text-[#666] hover:bg-[#050505] hover:text-[#eee]'
                    }`}
                  >
                    <item.icon className={`h-4.5 w-4.5 ${isActive ? 'text-white' : 'text-[#444]'}`} />
                    {item.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-[#111111] pt-5 mt-auto space-y-4">
            <div className="p-3 bg-[#030303] border border-[#111111] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded overflow-hidden bg-black border border-[#222] flex-shrink-0">
                  <svg 
                    viewBox="0 0 100 100" 
                    className="w-full h-full object-cover"
                    style={{ filter: `contrast(${chiaroscuroContrast}%)` }}
                  >
                    <rect width="100" height="100" fill="#020202" />
                    <path 
                      d="M15,10 C40,5 50,20 48,50 C46,75 35,90 20,95 L15,95 Z" 
                      fill="#f0f0f0" 
                    />
                    <path 
                      d="M48,0 C50,20 48,50 46,100 L0,100 L0,0 Z" 
                      fill="url(#chiaroscuroGrad)" 
                      opacity="0.95"
                    />
                    <ellipse cx="32" cy="40" rx="4" ry="2" fill="#000" />
                    <circle cx="32" cy="40" r="1" fill="#fff" />
                    <path d="M26,35 Q32,33 38,36" stroke="#000" strokeWidth="1.5" fill="none" />
                    <path d="M46,45 L43,58 L47,59" stroke="#000" strokeWidth="2.5" fill="none" />
                    <path d="M30,72 Q36,69 42,72" stroke="#000" strokeWidth="1.5" fill="none" />
                    <path d="M32,73 Q36,75 40,73" stroke="#000" strokeWidth="1" fill="none" />

                    <defs>
                      <linearGradient id="chiaroscuroGrad" x1="1" y1="0" x2="0" y2="0">
                        <stop offset="0%" stopColor="#000000" />
                        <stop offset="35%" stopColor="#000000" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {pipelineActive && (
                    <div 
                      className="absolute inset-0 border border-white rounded transition-transform pointer-events-none animate-ping"
                      style={{ 
                        transform: `scale(${1 + micVolume * 0.5})`,
                        opacity: Math.max(0.1, micVolume * 0.8)
                      }} 
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">Chiaroscuro</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-300 animate-pulse" />
                  </div>
                  <p className="text-[9px] text-neutral-500 font-mono tracking-tight">ACTIVE OPERATOR</p>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between gap-1">
                <span className="text-[8px] font-mono text-neutral-600">AUDIO IN</span>
                <div className="flex-1 h-1 bg-neutral-950 rounded overflow-hidden flex">
                  <div 
                    className="bg-white h-full transition-all duration-75"
                    style={{ width: `${Math.min(100, micVolume * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-[10px] text-[#444] font-mono flex items-center justify-between">
              <span>CORE v1.8.4</span>
              <span className="flex items-center gap-1">
                <span className={`h-1.5 w-1.5 rounded-full ${pipelineActive ? 'bg-white animate-pulse' : 'bg-neutral-800'}`} />
                {pipelineActive ? 'CONNECTED' : 'OFFLINE'}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main panel container */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#000000]">
        
        <header className="h-16 border-b border-[#111111] bg-[#000000] px-6 md:px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden text-neutral-400 hover:text-white"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden sm:block">
              <p className="text-[10px] text-neutral-500 font-mono tracking-widest">WORKSPACE // STARK_MONOCHROME_SYSTEM</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-r border-[#151515] pr-4 mr-2 hidden sm:flex">
              <button
                onClick={() => setGrainActive(!grainActive)}
                className={`p-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${grainActive ? 'text-white bg-[#0a0a0a] border border-[#222]' : 'text-neutral-500 hover:text-neutral-300'}`}
                title="Toggle film grain overlay"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>GRAIN {grainActive ? 'ON' : 'OFF'}</span>
              </button>
            </div>

            <div className="flex items-center gap-1 bg-[#050505] border border-[#151515] rounded-lg p-1">
              <button 
                onClick={() => {
                  setAudioSource('simulation');
                  if (pipelineActive) {
                    stopAudioEngine();
                    startSimulationSynth();
                  }
                }}
                className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-all ${audioSource === 'simulation' ? 'bg-[#151515] text-white border border-[#222]' : 'text-neutral-500 hover:text-white'}`}
              >
                SIMULATE
              </button>
              <button 
                onClick={() => {
                  setAudioSource('microphone');
                  if (pipelineActive) {
                    stopAudioEngine();
                    startMicrophoneInput();
                  }
                }}
                className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded transition-all ${audioSource === 'microphone' ? 'bg-[#151515] text-white border border-[#222]' : 'text-neutral-500 hover:text-white'}`}
              >
                MIC (LIVE)
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#000000] p-6 md:p-8 custom-scrollbar">
          
          {activeTab === 'Analytics' && (
            <div className="space-y-6 max-w-[1400px] mx-auto">
              
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-2">
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-white font-mono uppercase">Alic3x Pro</h1>
                  <p className="text-xs text-neutral-400 font-mono mt-1 uppercase tracking-wider">Music Intelligence Dashboard</p>
                </div>
                
                <button 
                  onClick={togglePipeline}
                  className={`relative flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-xs font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] border ${
                    pipelineActive 
                      ? 'bg-white border-transparent text-black hover:bg-neutral-200' 
                      : 'bg-black border-[#222] text-white hover:border-[#444] active:scale-95'
                  }`}
                >
                  <Activity className={`h-4 w-4 ${pipelineActive ? 'animate-spin' : ''}`} />
                  <span>{pipelineActive ? 'STOP PIPELINE' : 'RUN AUDIO PIPELINE'}</span>
                </button>
              </div>

              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                
                <div className="rounded-xl border border-[#151515] bg-[#070707] p-5 hover:border-[#222] transition-colors relative group overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between text-neutral-500 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider">Tempo</span>
                    <Radio className="h-4 w-4 text-neutral-800 group-hover:text-neutral-400 transition-colors" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold tracking-tight text-white font-mono">
                      {pipelineActive ? bpm : '138'}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">BPM</span>
                  </div>
                </div>

                <div className="rounded-xl border border-[#151515] bg-[#070707] p-5 hover:border-[#222] transition-colors relative group overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between text-neutral-500 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider">Harmonic Root</span>
                    <Music className="h-4 w-4 text-neutral-800 group-hover:text-neutral-400 transition-colors" />
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-white font-mono">
                    {pipelineActive ? harmonicRoot : 'E minor'}
                  </div>
                </div>

                <div className="rounded-xl border border-[#151515] bg-[#070707] p-5 hover:border-[#222] transition-colors relative group overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between text-neutral-500 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider">Spectral Centroid</span>
                    <Sliders className="h-4 w-4 text-neutral-800 group-hover:text-neutral-400 transition-colors" />
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-white font-mono">
                    {pipelineActive ? `${spectralCentroid} Hz` : '2450 Hz'}
                  </div>
                </div>

                <div className="rounded-xl border border-[#151515] bg-[#070707] p-5 hover:border-[#222] transition-colors relative group overflow-hidden">
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center justify-between text-neutral-500 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider">Energy Coefficients</span>
                    <Activity className="h-4 w-4 text-neutral-800 group-hover:text-neutral-400 transition-colors" />
                  </div>
                  <div className="text-2xl font-bold tracking-tight text-white font-mono">
                    {pipelineActive ? `${energy}%` : '84%'}
                  </div>
                </div>

              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                
                <div className="lg:col-span-2 rounded-xl border border-[#151515] bg-[#000000] p-5 flex flex-col h-[460px] shadow-2xl relative">
                  
                  <div className="flex items-center justify-between border-b border-[#111111] pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-white" />
                      <h2 className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider">FASTAPI STREAM LAYER MATRIX</h2>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${pipelineActive ? 'bg-white' : 'bg-neutral-800'}`} />
                        {pipelineActive ? 'LIVE PIPELINE STREAM' : 'PIPELINE IDLE'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white tracking-tight font-mono uppercase">Spectrogram</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-neutral-400 bg-[#070707] px-2 py-1 rounded border border-[#151515]">512 bins</span>
                    </div>
                  </div>

                  <div className="flex-1 min-h-0 relative rounded-lg overflow-hidden border border-[#111111]">
                    <canvas 
                      ref={canvasRef} 
                      className="w-full h-full block cursor-crosshair"
                    />
                    
                    {!pipelineActive && (
                      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 transition-all duration-300">
                        <div className="h-12 w-12 rounded-full bg-[#050505] border border-[#151515] flex items-center justify-center mb-3">
                          <FileAudio className="h-6 w-6 text-neutral-500" />
                        </div>
                        <h4 className="text-sm font-semibold text-white font-mono uppercase">Audio Pipeline Offline</h4>
                        <p className="text-xs text-neutral-500 max-w-sm mt-1">Activate the pipeline engine above to stream frequency extractions.</p>
                      </div>
                    )}
                  </div>

                </div>

                <div className="space-y-6 flex flex-col justify-between">
                  
                  <div className="rounded-xl border border-[#151515] bg-[#070707] p-5 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4 border-b border-[#111111] pb-3">
                      <h3 className="text-xs font-mono font-bold text-white tracking-wider uppercase">Waveform Structural Decomposition</h3>
                      <Sliders className="h-4 w-4 text-neutral-600" />
                    </div>

                    <div className="space-y-2 flex-1 overflow-y-auto">
                      <div className="grid grid-cols-12 text-[10px] font-mono text-neutral-500 uppercase px-2 mb-1">
                        <div className="col-span-6">Track Segment</div>
                        <div className="col-span-3 text-right">Duration</div>
                        <div className="col-span-3 text-right">Intensity</div>
                      </div>

                      {TRACK_SEGMENTS_PRESETS.map((segment) => {
                        const isCurrent = activeSegment === segment.id && pipelineActive;
                        return (
                          <button
                            key={segment.id}
                            onClick={() => {
                              if (pipelineActive) {
                                setActiveSegment(segment.id);
                                setCurrentPlayTime(segment.rawSeconds);
                                addTelemetryLog(`Skipped to loop section: ${segment.name}`);
                              }
                            }}
                            className={`w-full grid grid-cols-12 items-center text-left p-3 rounded border text-xs font-mono transition-all ${
                              isCurrent 
                                ? 'bg-[#2b0808]/30 border-red-900/40 text-white' 
                                : 'bg-[#000000] border-[#151515] text-neutral-400 hover:border-neutral-700 hover:text-white'
                            }`}
                          >
                            <div className="col-span-6 flex items-center gap-2.5">
                              <span className={`h-1.5 w-1.5 rounded-full ${isCurrent ? 'bg-red-500 animate-pulse' : 'bg-neutral-800'}`} />
                              <span className="font-semibold">{segment.name}</span>
                            </div>
                            <div className="col-span-3 text-right font-mono text-neutral-400">
                              {segment.durationLabel}
                            </div>
                            <div className="col-span-3 text-right">
                              <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                segment.intensity === 'High' 
                                  ? 'bg-[#400e0e] text-red-400 border border-red-900/60' 
                                  : 'bg-[#3b2a0e] text-amber-400 border border-amber-900/60'
                              }`}>
                                {segment.intensity}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#151515] bg-[#070707] p-5 h-[230px] flex flex-col relative overflow-hidden group">
                    <div className="flex items-center justify-between border-b border-[#111111] pb-3 mb-3">
                      <div>
                        <h3 className="text-xs font-mono font-bold text-white tracking-wider uppercase">Lyric Intelligence Parser</h3>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">Cold Case - Protocol Zero</p>
                      </div>
                      <Sparkles className="h-4 w-4 text-neutral-600 group-hover:rotate-12 transition-transform" />
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                      {lyrics.map((lyric, idx) => {
                        const isHighlighted = pipelineActive && (
                          (activeSegment === 'intro' && idx < 3) ||
                          (activeSegment === 'verse1' && idx >= 3 && idx < 6) ||
                          (activeSegment === 'hook' && idx >= 6 && idx < 8) ||
                          (activeSegment === 'outro' && idx >= 8)
                        );

                        return (
                          <div 
                            key={idx} 
                            className={`flex gap-3 text-xs font-mono transition-all duration-300 p-1.5 rounded ${
                              isHighlighted 
                                ? 'text-white bg-neutral-900 border-l-2 border-white pl-2' 
                                : 'text-neutral-500'
                            }`}
                          >
                            <span className="text-neutral-600 select-none">{lyric.time}</span>
                            <p className="flex-1 leading-relaxed">{lyric.text}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="absolute right-3 bottom-3 opacity-15 pointer-events-none">
                      <Sparkles className="h-16 w-16 text-white animate-pulse" />
                    </div>

                  </div>

                </div>

              </div>

              {/* Console log outputs */}
              <div className="bg-stone-950/80 border border-white/5 rounded-2xl p-6 shadow-2xl">
                <h3 className="font-mono text-xs uppercase text-stone-500 tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                  Live Telemetry Log
                </h3>
                <div className="font-mono text-xs text-stone-400 space-y-1.5 h-36 overflow-y-auto select-none pr-2">
                  {telemetryLog.map((log, index) => (
                    <div key={index} className="flex gap-2 items-start border-l border-white/20 pl-2">
                      <span className="text-stone-600 font-light">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'Overview' && (
            <div className="space-y-8 max-w-4xl mx-auto py-10">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-neutral-950 border border-[#151515] flex items-center justify-center mx-auto shadow-2xl">
                  <LayoutDashboard className="h-8 w-8 text-neutral-300" />
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white font-mono uppercase">Control Deck Overview</h2>
                <p className="text-sm text-neutral-400 max-w-md mx-auto font-mono">
                  Access raw structural metrics, local audio models, and high-contrast system modules.
                </p>
              </div>

              <div className="p-6 bg-[#030303] border border-[#151515] rounded-xl grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="inline-block px-2.5 py-1 rounded bg-white text-black text-[9px] font-mono uppercase tracking-widest font-black">
                    Aesthetic Portrait Profile
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white uppercase">Chiaroscuro Calibration</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                    Inspired by classic high-contrast chiaroscuro portraiture. The deep shadow zones provide zero distraction, while the stark high-value lit areas expose structural details and frequency peaks.
                  </p>
                  
                  <div className="space-y-2 pt-2">
                    <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Portrait Contrast: {chiaroscuroContrast}%</label>
                    <input 
                      type="range" 
                      min="50" 
                      max="200" 
                      value={chiaroscuroContrast} 
                      onChange={(e) => setChiaroscuroContrast(Number(e.target.value))}
                      className="w-full accent-white bg-neutral-900 h-1 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-[#000000] border border-[#151515] rounded-lg aspect-square p-8 flex items-center justify-center">
                  <div className="h-48 w-48 rounded overflow-hidden bg-black border border-neutral-800 shadow-2xl">
                    <svg viewBox="0 0 100 100" className="w-full h-full object-cover" style={{ filter: `contrast(${chiaroscuroContrast}%)` }}>
                      <rect width="100" height="100" fill="#000" />
                      <path d="M15,10 C40,5 50,20 48,50 C46,75 35,90 20,95 L15,95 Z" fill="#ffffff" />
                      <path d="M48,0 C50,20 48,50 46,100 L0,100 L0,0 Z" fill="url(#bigChiaroscuroGrad)" opacity="0.95"/>
                      
                      <ellipse cx="32" cy="40" rx="4" ry="2" fill="#000" />
                      <circle cx="32" cy="40" r="1" fill="#fff" />
                      <path d="M26,35 Q32,33 38,36" stroke="#000" strokeWidth="1.5" fill="none" />
                      <path d="M46,45 L43,58 L47,59" stroke="#000" strokeWidth="2.5" fill="none" />
                      <path d="M30,72 Q36,69 42,72" stroke="#000" strokeWidth="1.5" fill="none" />
                      <path d="M32,73 Q36,75 40,73" stroke="#000" strokeWidth="1" fill="none" />
                      
                      <defs>
                        <linearGradient id="bigChiaroscuroGrad" x1="1" y1="0" x2="0" y2="0">
                          <stop offset="0%" stopColor="#000000" />
                          <stop offset="35%" stopColor="#000000" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Projects' && (
            <div className="space-y-6 max-w-4xl mx-auto py-10">
              <h2 className="text-2xl font-black tracking-tight text-white font-mono uppercase mb-4">Saved Audio Files & Analytics</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { name: "Cold Case - Protocol Zero", bpm: 138, key: "E minor", date: "Jul 17, 2026" },
                  { name: "Neon District", bpm: 120, key: "A major", date: "Jun 24, 2026" },
                  { name: "Cyber Synth Wave", bpm: 142, key: "C# minor", date: "May 12, 2026" },
                  { name: "Analog Shadows - Chiaroscuro", bpm: 110, key: "D minor", date: "Apr 05, 2026" }
                ].map((track, idx) => (
                  <div key={idx} className="p-5 rounded border border-[#151515] bg-[#070707] flex flex-col justify-between hover:border-neutral-700 transition-all">
                    <div>
                      <h3 className="font-bold text-white font-mono text-sm uppercase">{track.name}</h3>
                      <p className="text-[10px] text-neutral-500 font-mono mt-1">Processed: {track.date}</p>
                    </div>
                    <div className="flex items-center justify-between mt-6 text-xs font-mono text-neutral-400">
                      <span>{track.bpm} BPM</span>
                      <span className="px-2 py-0.5 rounded bg-[#111] border border-[#222] text-white text-[10px]">{track.key}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Settings' && (
            <div className="space-y-6 max-w-2xl mx-auto py-10">
              <h2 className="text-2xl font-black tracking-tight text-white font-mono uppercase border-b border-[#151515] pb-3">Platform Configurations</h2>
              
              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">Spectrogram Resolution (FFT Size)</label>
                  <select className="w-full bg-[#070707] border border-[#151515] text-white p-3 rounded text-sm font-mono focus:outline-none focus:border-neutral-500">
                    <option>256 Bins</option>
                    <option defaultValue="512">512 Bins</option>
                    <option>1024 Bins</option>
                    <option>2048 Bins</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400">Default Input Pipeline</label>
                  <select className="w-full bg-[#070707] border border-[#151515] text-white p-3 rounded text-sm font-mono focus:outline-none focus:border-neutral-500">
                    <option>FastAPI Local Network Socket (ws://localhost:8000)</option>
                    <option>Web Audio Browser Simulation API</option>
                  </select>
                </div>

                <div className="p-4 bg-[#050505] border border-[#151515] rounded-lg space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-widest">Interface Skin Parameters</h4>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400">Film Grain Shader Noise</span>
                    <button 
                      onClick={() => setGrainActive(!grainActive)}
                      className="px-3 py-1 border border-neutral-700 bg-black text-white rounded text-[10px] uppercase font-bold hover:bg-neutral-900"
                    >
                      {grainActive ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
export default SongAnalysis;
